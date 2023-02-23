import Head from "next/head";
import DateHeader from "@/components/DateHeader";
import BlockItems from "@/components/BlockItems";
import { useState } from "react";
import moment from "moment";
import styles from "@/styles/Home.module.css";
import { UserAuth } from "@/context/AuthContext";
import AuthBlock from "@/components/AuthBlock";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(moment());
  const { user } = UserAuth();

  return (
    <>
      <Head>
        <title>Alfred</title>
        <meta
          name="description"
          content="Your personal butler"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.root}>
        <DateHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        {user ? (
          <BlockItems currentDate={currentDate} />
        ) : (
          <AuthBlock />
        )}
      </div>
    </>
  );
}
