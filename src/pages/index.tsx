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
import { Block } from "@/utils/data";
import CreateTaskModal from "@/components/CreateTaskModal";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [loading, setLoading] = useState(true);
  const [createBlockModalOpen, setCreateBlockModalOpen] =
    useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] =
    useState(false);
  const [currentBlock, setCurrentBlock] =
    useState<Block | null>(null);
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
            !createBlockModalOpen && !createTaskModalOpen
              ? styles.content__wrapper
              : `${styles.content__wrapper} ${styles.blurred}`
          }
        >
          <DateHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
          {user ? (
            <BlockItems
              currentDate={currentDate}
              setCurrentBlock={setCurrentBlock}
              setCreateBlockModalOpen={
                setCreateBlockModalOpen
              }
              setCreateTaskModalOpen={
                setCreateTaskModalOpen
              }
            />
          ) : (
            <AuthBlock />
          )}
          <Footer addBlock={setCreateBlockModalOpen} />
        </div>
      )}
      {createBlockModalOpen && (
        <CreateBlockModal
          shown={createBlockModalOpen}
          setShown={setCreateBlockModalOpen}
          block={currentBlock}
          setCurrentBlock={setCurrentBlock}
        />
      )}
      {createTaskModalOpen && (
        <CreateTaskModal
          show={createTaskModalOpen}
          blockId={currentBlock?.id}
          setBlock={setCurrentBlock}
          onShow={setCreateTaskModalOpen}
        />
      )}
    </div>
  );
}
