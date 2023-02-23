import Head from "next/head";
import DateHeader from "@/components/DateHeader";
import BlockItems from "@/components/BlockItems";
import { useState } from "react";
import moment from "moment";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(moment());

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
        <BlockItems currentDate={currentDate} />
      </div>
    </>
  );
}
