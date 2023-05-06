import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { IPost, getPostData, getAllPostIds } from "../lib/posts";
import Link from "next/link";
import DisplayDate from "../components/DisplayDate";
import { GetStaticProps } from "next";
import fs from "fs";
import { promisify } from "util";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import ExternalLink from "../components/ExternalLink";
import Head from "next/head";
import { siteTitle } from "./_app";

const components = { a: ExternalLink };

export default function Home({
  posts,
  intro,
}: {
  posts: IPost[];
  intro: MDXRemoteSerializeResult;
}) {
  return (
    <>
      <PageHead />
      <Layout home>
        <Image
          loading="eager"
          priority={true}
          quality={70}
          src="/images/johan.jpg"
          width="480"
          height="428"
          alt="me"
          style={{ objectFit: "contain" }}
        />

        <MDXRemote {...intro} components={components} />

        {posts.length > 0 && (
          <section className={utilStyles.padding1px}>
            <h2>Writing</h2>
            <ul className={utilStyles.list}>
              {posts.map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>{title}</Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <DisplayDate dateString={date} />
                  </small>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await Promise.all((await getAllPostIds()).map(getPostData));
  const posts = allPosts.filter(
    (p) => !(process.env.NODE_ENV === "production" && !!p.draft)
  );
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rawIntro = await promisify(fs.readFile)("./pages/intro.mdx");
  const intro = await serialize(rawIntro.toString());

  return {
    props: {
      posts: posts.filter(
        (p) => !(process.env.NODE_ENV === "production" && !!p.draft)
      ),
      intro,
    },
  };
};

function PageHead() {
  return (
    <Head>
      <meta
        name="description"
        content="Hi I'm Johan. I like working with smart people and solving hard problems."
      />
      <meta
        property="og:image"
        content={"https://johanjern.com/images/johan.jpg"}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
}
