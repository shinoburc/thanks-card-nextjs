import "../styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { signIn, useSession } from "next-auth/react";
import Layout from "../layout/Layout";

//function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RedirectLogin />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

const RedirectLogin: NextPage = () => {
  const { status } = useSession();
  if (status === "unauthenticated") {
    signIn();
  }
  return <></>;
};

export default MyApp;
