---
title: "What working at Pipe has been like"
date: "2021-01-16"
---

In September last year (2020), I started working remotely at
[Pipe](https://pipe.com), a Fintech startup that's helping companies with
recurring revenues grow without debt or dilution. During the holidays I spent
some time reflecting on how my first 3 months have been and decided to do a
writeup on how/why I ended up at Pipe, how it's been, and what I've learned.
Notable is that I’ve been working remotely from Finland while the rest of the
team is spread around the US and Germany (with all of engineering in the US).
In this post, I’ll focus on the remote part and write about a couple of areas
that I feel have been important for my success at Pipe and where I think we’ve
done a good job - asynchronous communication, meetings, infrastructure and the
team.

## Background
In the spring of 2020 I graduated from Aalto University in Helsinki and was
faced with the decision that most people have to face at some point - what do I
_actually_ want to do with my life. Having just spent the last ~6 months
writing high-performance research C++ for my Master's thesis I was at least
pretty sure that I wanted to work on something where the product was more
nuanced than just _is our algorithm more accurate than ARKit?_ - but other than
that I hadn't really decided on anything.

### Back at a Startup
I started my career at a 4 person startup in Helsinki and since then each
consecutive company I've worked at has been larger than the last (ending up
with a stint at [BCG](https://www.bcg.com/) with 21k employees). Still, at some
point I realized that I kind of miss the fast pace of a startup, the
responsibility you get (or have) to take and the impact you can have. So after
some contemplation, I was pretty sure that joining a startup was what I wanted
to do. I was also looking at Fintech companies as ever since learning about (and
interning at) [Stripe](https://stripe.com) a couple of years ago I'd been
excited about the field.

With all that said you can see how it felt like a perfect
match when [@Peter](https://twitter.com/peterldowns) reached out to me about
Pipe. However, there was a catch - the Pipe team was spread around the US (one
non-engineer in Germany) while I was 7 time zones away in [Helsinki](https://www.google.com/maps/place/Helsinki/) (and was planning to
stay here for the near future at least).

I felt pretty confident that remote work itself wouldn't be a problem - my
mentor at Stripe was fully remote as were many of the best engineers I worked
with there. During the spring (of 2020) it had also become clear that even
companies less set up for remote could make it work. At BCG our team wondered whether
the client we worked for at the time (large, slow, industrial company)  would be able to
get anything done at all during the lockdown - but even they managed to be somewhat
effective. The big question for me was the timezone - can I perform at my best
even if the overlap between me and my teammates is just a couple of hours?

## Working at Pipe

Turns out that my worrying was unwarranted - working at Pipe has been the
highlight of my career thus far. In the right environment and doing the right
type of work (in my case, writing code) time zones aren't as important as I
initially thought. Next up I'll discuss a couple of things I've felt have been
important in making it work.

### Asynchronous communication

In most contexts, remote work means asynchronous communication. You can still have meetings and
talk with people synchronously on slack, just like you would working from an
office, but for the most part, remote works best when embracing
asynchronous communication. This can feel like a big change for some, but I think
that for most people, especially engineers, it is quite natural. For me, working
from a different timezone than the rest of the team, asynchronous communication
is not an option - it's a must. Turns out there are a lot of advantages of communicating this way, here are some.

Asynchronous communication means fewer interruptions. It's easier to schedule
blocks of deep work where you know you won't be distracted (this is especially
easy for me as no-one else is awake during the day when I'm doing my best
work). Asynchronous communication also creates documentation almost "for free".
If someone makes a proposal asynchronously (instead of during a meeting) they
need to write it down, and if people comment on it they have to write down
their comments. All of this is then accessible later when you're wondering why
something was done a certain way.

Because participants have more time to think through their responses,
asynchronous communication can also lead to more thoughtful communication.
Instead of saying the first thing that comes to mind during a meeting in order
to get heard you can prepare a better response. It can also be easier to take
into account everyone's opinion.

One final advantage of how we communicate at Pipe is that it's often more
predictable. This is something I feel applies especially to me as I'm in a
different timezone. If I've written a design doc, PR, or something else I'm
waiting for a response to, I can be pretty certain of when I'll have a response
to react to. As long as I finish
something before I stop working in the evening, I'll have a
response to it waiting for me the next morning. This makes
it easier to plan my days as I can eliminate all the dead time spent waiting for
responses.

### Meetings / Calls

We generally try to minimize the amount of "formal" meetings that we have -
there doesn't need to be a meeting for something that can be decided on
asynchronously. We also try to be thoughtful about who needs to participate. If
there's a meeting where I know I won't be having much input, I don't feel the
need to be present - as long as what's been decided on is documented I feel
confident I’ll be in the loop.

Being conscious about how you spend your time is a competitive advantage, not just
for remote engineering teams - for teams in general. In general, my experience has been
that engineering teams are pretty good at this (might be
because engineers generally dislike meetings). My experience at BCG was that
there wasn't necessarily a clear goal with every meeting - large parts of many
meetings could have been replaced by emails.

Having a small number of meetings is especially important to me. If we have a
meeting where someone on the west coast is participating it's going to be
at 7 pm or later for me - which means that having 1 or 2 meetings/calls a day
works perfectly fine - my day is shifted a couple of hours forward so I don't
need to work after dinner. I've also already got all the important "deep" work done for
the day so it's a good way to wrap up.

Because of the small number of meetings, most of the time I spend on Zoom/Discord is
talking to other team members one-on-one. Some of this is technical or product
discussions but most of it is informal - catching up on things outside
of work, trying to pitch the Nordics ([we're the happiest in the
world after all](https://en.wikipedia.org/wiki/World_Happiness_Report#2020_report)), or
just discussing what we'll do once traveling is allowed again. Because our
team is still relatively small it's possible for me to have these calls with
everyone (on the engineering team at least) - something that I find important as it makes
me feel like part of the team, even though I'm on the other side of the
Atlantic. I often take these calls while going for a walk outside or for a
bike-ride in [Zwift](https://www.zwift.com/).

<WithCaption caption="Informal calls are a good opportunity to go for a walk or
exercise. Shown here: fall/winter weather in Helsinki and a virtual redwood forest in
Zwift">
  <Image src="/images/drumso.jpg" width="250px" height="300px" />
  <Image src="/images/zwift.jpg" width="250px" height="300px" />
</WithCaption>

### Good Infra

Working at a startup (at least one where there's PMF) means
there's a lot to do - building new features, fixing/changing old features,
scalability, bugs, and so on. Requirements also often change mid-flight. What
all this means is that it pays to be able to react quickly - feature velocity is
important.

During my first three months at Pipe there's been a lot of _moving fast_ but
surprisingly little [_breaking things_](https://boz.com/articles/move-fast-explained).
At this point I can confidently say that it's no coincidence - the quality of engineering at Pipe is just really good.
We've got quality logging, monitoring, deployments, test coverage, code, etc. - things you'd
expect at a more established company, not at a startup (of course we're not
perfect, but improving every day).
As a remote employee in a different timezone - this is super important.

When deploying at Pipe I don't stress about unrelated parts of the code
breaking. If something breaks it's probably something I've done,
and more importantly: _I'll be able to detect it and fix it quickly_. If I
wouldn't be able to confidently deploy when I'm the only one awake during the
day my productivity would suffer. Because everything _just works_ I don't find
myself having to deploy everything all together at the end of the day when the
rest of the team gets online.

There's no silver bullet to this, e.g. just choosing the right stack won't solve all
of your problems here (although it can make it easier). In my opinion, the most
important thing that makes it work at Pipe is us caring - when something is broken we fix it, when some
process is inefficient we improve it, and so on. Everyone in our team takes
ownership of our product, codebase, and processes.

### Team

Remote work requires discipline from the entire team. In order for everyone to feel
included it is important that decisions are made in the open and that everyone
is able to participate and contribute. This is especially important when
the team is spread over multiple time zones. For example, let's say you're
scheduling a meeting where some important planning is supposed to take place
and you're struggling to find a time that works for everyone. In this
situation, it can be easy to just pick the time that works for everyone but the
one employee that's not in the same timezone as everyone else. This might be
okay if it happens just once, maybe even twice, but it can become a bad habit.
Which may make it harder for the lone employee to speak up - no-one wants to
feel like they're being a nuisance. Avoiding these types of situations requires
an explicit commitment from the team to accommodate everyone.

At Pipe this has worked well for me thus far; I
haven't felt like I've been left out just because I'm in Helsinki. Sometimes
I've even felt like I've had to remind the team that some meetings in the
evenings are okay (due to covid I haven't been going out much so my evenings
are free for the most part).

I also feel like all of this is easier to achieve with a smaller team.
If you know everyone you're working with at a personal level it's easier to
feel empathy for them and their situation - and thus also accommodate for their
needs.

### Challenges

Remote work is not necessarily for everyone. There's less social interaction
and there's no-one watching over you making sure you're doing what you're
supposed to. From my experience, both of these things get amplified when you're also
working from a different timezone. If I want to talk to someone about the
weekend over lunch I can't do it with my colleagues (luckily there are lots of
people in Helsinki I can go out for lunch with) and if I'm not sure what I
should be doing at 11 am my time there's no-one else awake to tell me.

Due to covid-19 most people (knowledge workers at least) have been forced to do
some remote work during 2020. Based on this you can probably get some sense of
whether or not remote work is something for you. Did you miss the office or did
you dread/are you dreading the day you'll be called back? Personally, I like
the freedom of being able to choose when and how I work, being able to focus
without the distractions of a busy office, and being able to e.g. go for a
bike ride or go swimming in the middle of the day. It feels liberating to an extent.

## Conclusion

During my first 3 months at Pipe, we've constantly been thinking about and
improving our ways of working.  If you're currently working on a remote team,
even if it's just temporary due to covid, I'd encourage you to do the same. The
topics I've talked about in this post can work as a starting point:

- Asynchronous communication as the default.
- Avoiding excessive meetings.
- Good infrastructure.
- Supportive and aligned team.

My suggestion might not be applicable in all situations (especially for
non-engineering teams) but the best way to figure that out is by trying. A lot
of best practices for remote teams can actually be useful for co-located teams
working from an office as well - so even if you're planning to be back in the
office soon it pays off to optimize how your team collaborates remotely now.

And for those of you who are thinking about joining a remote team, like I was a
couple of months ago: there are both upsides and downsides to remote work, but
for me, the upsides have easily outweighed the downsides. So if you have the
opportunity to work with a good team on a good product - go for it!

Oh, and check out [Pipe](https://www.pipe.com/) while you’re at it - we’re hiring!
