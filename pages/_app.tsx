import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "../layout/Layout";

//function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
