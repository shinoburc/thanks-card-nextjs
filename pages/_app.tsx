import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../layout/Layout";

//function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  );
}

export default MyApp;
