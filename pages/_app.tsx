import "../styles/global.css";
import "highlight.js/styles/stackoverflow-light.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { pageview } from "../lib/gtag";

import Head from "next/head";
import { AppProps } from "next/app";

export const siteTitle = "Johan Jern";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content={siteTitle} />
        <meta name="application-name" content={siteTitle} />
        <meta name="msapplication-TileColor" content="#212529" />
        <meta name="theme-color" content="#212529" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
