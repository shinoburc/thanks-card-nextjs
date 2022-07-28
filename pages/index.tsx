import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import ThanksCardList from "./components/thanks_card/list";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Thanks Card</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {session && (
          <>
            Signed in as {session?.user?.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
        {!session && (
          <>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}> Welcome to ThanksCard </h1>
        <div>
          <ThanksCardList />
        </div>

        <div className={styles.grid}>
          <p>Footer</p>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>This is footer</p>
      </footer>
    </div>
  );
};

export default Home;
