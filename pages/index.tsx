import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import Button from "@mui/material/Button";
import ThanksCardList from "./components/thanks_card/list";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Thanks Card</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {status === "authenticated" && (
            <>
              Signed in as {session?.user?.name} <br />
              <Button onClick={() => signOut()} variant="contained">
                Sign out
              </Button>
            </>
          )}
          {status !== "authenticated" && (
            <>
              <Button onClick={() => signIn()} variant="contained">
                Sign in
              </Button>
            </>
          )}
        </div>

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
