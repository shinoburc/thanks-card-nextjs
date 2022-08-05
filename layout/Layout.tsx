import { ReactElement } from "react";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";

import { useSession, signIn, signOut } from "next-auth/react";

import AccountInfo from "../layout/AccountInfo";
import Menu from "../layout/Menu";
import PersonIcon from "@mui/icons-material/Person";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Thanks Card - UserList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.siteTitle}>
          <Link href="/">ThanksCard Header</Link>
        </h1>
      </header>

      <div>
        <AccountInfo />
        <Menu />
        <main className={styles.main}>{children}</main>
      </div>

      <div className={styles.footer}>
        <div className={styles.copyright}>
          <p>
            <small>ThanksCard</small>
          </p>
        </div>
      </div>
    </div>
  );
};
