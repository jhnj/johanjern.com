import Layout from "../../components/layout";
import { IPost, getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import DisplayDate from "../../components/DisplayDate";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import ExternalLink from "../../components/ExternalLink";
import WithCaption from "../../components/WithCaption";
import Image from "next/image";
import rehypePrism from "@mapbox/rehype-prism";

const components = { Image, WithCaption, a: ExternalLink, Todo };

export default function Post({
  source,
  data,
}: {
  source: string;
  data: IPost;
}) {
  const content = hydrate(source, { components });
  return (
    <Layout>
      <PostHead data={data} />
      <article>
        <h1>
          {data.title}
          {data.draft && <b> -- DRAFT!</b>}
        </h1>
        <div className={`${utilStyles.lightText} ${utilStyles.margin1rem}`}>
          <DisplayDate dateString={data.date} />
        </div>
        {content}
        <div style={{ borderTop: "1px solid", paddingTop: "10px" }} />
        Thanks for reading! If you have questions or comments feel free to reach
        out to me on{" "}
        <ExternalLink href="https://twitter.com/JernJohan">
          Twitter
        </ExternalLink>{" "}
        or via{" "}
        <ExternalLink href="mailto:contact@johanjern.com">Email</ExternalLink>.
        If you find any mistakes in the text you can submit a PR to fix them on{" "}
        <ExternalLink
          href={`https://github.com/jhnj/johanjern.com/blob/main/posts/${data.id}.md`}
        >
          Github
        </ExternalLink>
        .
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllPostIds();
  console.log(ids);

  return {
    paths: ids.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const postID = params.id as string;
  const data = await getPostData(postID);

  const mdxSource = await renderToString(data.source, {
    components,
    mdxOptions: { rehypePlugins: [rehypePrism] },
  });
  return { props: { data, source: mdxSource } };
}

function PostHead({ data }: { data: IPost }) {
  return (
    <Head>
      <title>{data.title}</title>
      <meta property="og:title" content={data.title} />

      <meta property="og:type" content="article" />

      <meta name="author" content="Johan Jern -- contact@johanjern.com" />
      <meta property="og:article:author" content="Johan Jern" />
      <meta property="twitter:site" content="@JernJohan" />
      <meta property="twitter:creator" content="@JernJohan" />

      <meta
        property="og:article:published_time"
        content={`${new Date(data.date).toISOString()}`}
      />

      <meta
        property="og:url"
        content={`https://johanjern.com/posts/${data.id}`}
      />
      <meta
        property="twitter:url"
        content={`https://johanjern.com/posts/${data.id}`}
      />

      {data.description && (
        <>
          <meta name="description" content={data.description} />
          <meta property="og:description" content={data.description} />
        </>
      )}
      {/* TODO: post thumbnails */}
      <meta
        property="og:image"
        content={"https://johanjern.com/images/johan.jpg"}
      />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
}

function Todo() {
  return <b style={{ color: "red" }}>TODO: </b>;
}
