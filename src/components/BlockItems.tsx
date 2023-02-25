import moment from "moment";
import React, { useEffect, useState } from "react";

// import { blocks } from "../utils/data";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import BlockItem from "./BlockItem";

import styles from "@/styles/Home.module.css";
import { firestore } from "../../firebase/clientApp";
import { Block } from "@/utils/data";
import { UserAuth } from "@/context/AuthContext";

type Props = {
  currentDate: moment.Moment;
  setCurrentBlock: (block: null | Block) => void;
  setCreateBlockModalOpen: (open: boolean) => void;
  setCreateTaskModalOpen: (open: boolean) => void;
};

const BlockItems = ({
  currentDate,
  setCreateBlockModalOpen,
  setCreateTaskModalOpen,
  setCurrentBlock,
}: Props) => {
  const { user } = UserAuth();
  const [blocks, setBlocks] = useState<Array<Block>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      console.log("we got into the non user loading");
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return;
    }

    const collectionRef = collection(firestore, "blocks");
    const q = query(
      collectionRef,
      where("user", "==", user.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlocks(
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Block),
          id: doc.id,
        }))
      );
      setTimeout(() => setLoading(false), 500);
    });

    return unsubscribe;
  }, [user]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.block__items__wrapper}>
      {blocks
        .sort(
          (block1, block2) =>
            block1.blockStart - block2.blockStart
        )
        .filter((block) =>
          block.days.includes(
            currentDate.format("dd").toLowerCase()
          )
        )
        .map((block) => (
          <BlockItem
            key={block.id}
            block={block}
            currentDate={currentDate}
            setCurrentBlock={setCurrentBlock}
            setCreateBlockModalOpen={
              setCreateBlockModalOpen
            }
            setCreateTaskModalOpen={setCreateTaskModalOpen}
          />
        ))}
    </div>
  );
};

export default BlockItems;
