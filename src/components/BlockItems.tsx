import moment from "moment";
import React, { useEffect, useState } from "react";

// import { blocks } from "../utils/data";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import BlockItem from "./BlockItem";

import styles from "@/styles/Home.module.css";
import { firestore } from "../../firebase/clientApp";
import { Block } from "@/utils/data";
import { UserAuth } from "@/context/AuthContext";

type Props = {
  currentDate: moment.Moment;
};

const BlockItems = ({ currentDate }: Props) => {
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

    const unsubscribe = onSnapshot(
      collection(firestore, "blocks"),
      (snapshot) => {
        setBlocks(
          snapshot.docs
            .map((doc) => doc.data())
            .filter(
              (block) => block.user === user.email
            ) as Array<Block>
        );
        setTimeout(() => setLoading(false));
      }
    );

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
            name={block.name}
            currentDate={currentDate}
            startTime={block.blockStart}
            endTime={block.blockEnd}
            tasks={block.tasks}
            key={block.name}
          />
        ))}
    </div>
  );
};

export default BlockItems;
