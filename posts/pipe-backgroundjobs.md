---
title: "How Pipe manages asynchronous tasks using PostgreSQL"
date: "2023-01-23"
---

**Note:** this was originally posted on Pipe's [engineering blog](https://pipe.com/deploy/how-pipe-manages-asynchronous-tasks-using-postgresql).

<div style={{ borderTop: "1px solid", paddingTop: "10px", paddingBottom: "5px" }} />

At Pipe, we’re building the world’s first trading platform for revenue. Asynchronous background processes are critical to this, enabling us to download data from various integrations, like billing, banking, accounting; process trades; automatically rate companies; and much more. Almost two years ago we built a no-frills task queueing system to simply and reliably manage these processes. This system is still serving us well, handling up to 700,000 jobs a day. In this blog post, I’ll cover the thought process behind it and its technical implementation.

Pipe’s backend is built using Go, so for the initial version of the system we implemented the obvious solution—we would launch a new goroutine, Go’s lightweight concurrency primitive, for each job that needed to run asynchronously. The job would then run in the goroutine until completion. For example, we would launch a new goroutine each time we received a webhook from one of the many integrations (such as Stripe, Chargebee, or Plaid) that provide us with secure access to data about the businesses using Pipe’s trading platform. The original process that received the webhook would complete successfully and, in the background, the newly launched goroutine would do the work of parsing the webhook’s payload and updating our database state.

Unfortunately, this approach had significant drawbacks:

- There was no easy way to keep track of the work running inside goroutines—while they could emit logs, it was hard to tell if a task would get stuck or blocked, and to distinguish these from other failures.
- There was no way to restart a task if it failed or was interrupted.
- We shut down and replace our backend (running in a container) frequently as we deploy new code. Each deploy shuts down all existing instances of our backend, which would interrupt all goroutines running at those times.

We quickly realized that this approach was not appropriate. When we receive a webhook containing information about our customers’ business, we have to process that data reliably and consistently for Pipe to work. All of the problems listed above are usually solved by using a task queueing system. There are many existing systems available off the shelf, each with its own set of advantages and drawbacks. We evaluated them against the following criteria:

Short time to implement—this was an urgent problem that needed solving.

- Matches our scale—while we’re a quickly growing company, some task queues are designed for solving the problem at a greater scale than we need, and come with large costs and complexities as a result. Our focus is adding value to the business, not adopting complex infrastructure designed to solve problems that we don’t have.
- Fits well with our existing stack—we wanted to adopt a solution that would make reliable asynchronous tasks an easy and familiar primitive across our whole Go codebase.
- Easy to observe—we would like to be able to use our existing skills and tools to monitor and debug the state of the system.

We didn’t find any existing solution that fit all our criteria so we decided to explore implementing a barebones task queue ourselves. If we weren’t able to create something that met our requirements in a day or two, we would reconsider the off-the-shelf systems. We ended up with an implementation that has successfully scaled with us as we’ve grown, that’s easily observable using our existing tools, and that’s easy to use from our existing codebase.

## Enter package backgroundjobs

Our DIY solution is centered around a `backgroundjobs` table in our PostgreSQL database. If you want to run a job, you simply insert a row, and the job will be processed automatically. If you want to know, for example, the status of a job or how big the queue is, you can also query the table. The core part of the schema looks something like:

```sql
CREATE TABLE backgroundjobs (
    ...
    job_type TEXT NOT NULL,
    arguments JSONB NOT NULL,
    status TEXT NOT NULL, -- (pending|running|completed|failed)
    shard_key TEXT NOT NULL
    ...
)
```

The columns are mostly self-explanatory—there are multiple job types, each job gets supplied arguments as JSON, and each job has a status. Perhaps the least obvious column is the `shard_key`. We use this to control which jobs are allowed to run at the same time. Two jobs with the same `shard_key`, say two trades executed by the same company, are not allowed to run concurrently. More on this later.

Each job type (`sync_stripe`, `sync_accounting`, `execute_trade` etc.) has a job controller that runs in a separate goroutine and is responsible for (1) keeping track of currently running jobs, (2) polling for pending jobs and starting them when there is free capacity, and (3) marking completed jobs.

The logic for doing all of this ends up being rather intuitive—the controller spawns new jobs as goroutines and provides each job a channel through which the job communicates when it’s complete.

```go
type controller struct {
    db          *sql.DB
    runningJobs map[string]struct {
        job    *models.BackgroundJob
        comm   chan (jobOutput)
    }
    ...
}
```

This is then tied together into a main polling loop where we, in turn, spawn new jobs when we have spare capacity, and check to see if any of the currently running jobs have completed. Polling for new jobs is accomplished using a simple SQL query:

```sql
SELECT DISTINCT ON (shard_key) *
FROM background_jobs
WHERE name = $1
  AND status IN ('running', 'pending')
  AND shard_key NOT IN (
      SELECT UNNEST(${running_shard_keys}::TEXT[]))
ORDER BY created_at ASC;
```

We query for both `pending` and `running` jobs here in order to restart `running` jobs that may have been interrupted due to the controller getting stopped during a deploy. By also filtering out any `shard_key` of a currently running job (`controller.runningJobs`) we ensure that there’s at most one instance of each job running at a time.

The second part of the main loop, checking the status of the currently running jobs, works as follows:

```go
for _, jobCtx := range c.runningJobs {
    select {
        case output := <-jobCtx.comm:
            delete(c.runningJobs, shardKey)
            err := c.processCompletedJob(ctx, c.db, output)
            // handle error
        default:
    }
}
```

Here, we check if any of the jobs have signaled through their channels that they’ve finished. Note the `default` case—we don’t want to block here.

The main loop ends up looking something like below. After adding error handling, logging, metrics, logic for updating job statuses, basic dependencies between jobs, and dynamic settings, the complexity of the code grows slightly, but the system is still easy to understand and internalize.

```go
for {
    err = c.spawnNewJobs(c.numWorkers - len(c.runningJobs))
    // handle error
    err = c.checkRunningJobs()
    // handle error
    time.After(sleepTime)
}
```

To add a controller for a new job type, we implement a function with a standardized signature (`func Job(Input) Output`) and register that function along with the name of the job. A nice side-effect of this design is that the code for creating jobs (and marshaling the arguments as JSON) can live next to the code for running the job (and unmarshaling the same arguments).

When we want to run jobs on a schedule, we utilize Kubernetes cron jobs. The cron jobs themselves can be lightweight; each one only lives long enough to insert the desired tasks as new rows with `status = 'pending'` into the `backgroundjobs` table.

## How does it scale?

The design presented above assumes that only a single process is polling for jobs of each type. This means that each job type can only ever run on a single server, which might sound like a major blocker—that's not webscale!—but the system has held up well for us. This is largely because our workloads are generally not CPU- or memory-bound but rather, are limited by the database or an external API. It’s also possible, to a limited extent, to scale this system horizontally by manually sharding job types between different servers. We haven't had to do this yet, but it wouldn't be hard.

Keeping the polling logic single-threaded simplifies the implementation a lot. Implementing a distributed task queue using PostgreSQL is rather tricky (see, for example, [this blog post](https://www.2ndquadrant.com/en/blog/what-is-select-skip-locked-for-in-postgresql-9-5/) on the pitfalls that exist, as well as how to do it correctly) so it’s generally better to pick an existing solution.

## Simple and solid goes a long way

In the last two years, the `backgroundjobs` package has processed all of our asynchronous tasks without any major issues or downtime and without us spending significant resources on maintenance or upgrades. We've done some obvious things like improving logging, adding the ability to automatically retry certain jobs with a specific backoff schedule, and even schedule jobs to run only after certain dates. I’m sure we’ll eventually have to upgrade to a more complex off-the-shelf system (like [temporal.io](https://temporal.io)) when we reach a scale that our current system can’t handle. But until that day we’re confident that `backgroundjobs` will keep serving us well.

Software engineering is often about tradeoffs—writing your own simple system, adapted to your needs, can be worth the investment, especially if you approach the problem with the attitude that you can adopt a more complex system later on if need be.