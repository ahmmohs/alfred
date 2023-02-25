import Head from "next/head";
import DateHeader from "@/components/DateHeader";
import BlockItems from "@/components/BlockItems";
import { useEffect, useState } from "react";
import moment from "moment";
import styles from "@/styles/Home.module.css";
import { UserAuth } from "@/context/AuthContext";
import AuthBlock from "@/components/AuthBlock";
import CreateBlockModal from "@/components/CreateBlockModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [loading, setLoading] = useState(true);
  const [createBlockModalOpen, setCreateBlockModalOpen] =
    useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className={styles.root}>
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
      {!loading && (
        <div
          className={
            !createBlockModalOpen
              ? styles.content__wrapper
              : `${styles.content__wrapper} ${styles.blurred}`
          }
        >
          <DateHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            setCreateBlockModalOpen={
              setCreateBlockModalOpen
            }
          />
          {user ? (
            <BlockItems currentDate={currentDate} />
          ) : (
            <AuthBlock />
          )}
          {createBlockModalOpen && (
            <CreateBlockModal
              shown={createBlockModalOpen}
              setShown={setCreateBlockModalOpen}
            />
          )}
          <Footer />
        </div>
      )}
    </div>
  );
}
