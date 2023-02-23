import moment from "moment";
import React from "react";

import { blocks } from "../utils/data";
import BlockItem from "./BlockItem";

import styles from "@/styles/Home.module.css";

type Props = {
  currentDate: moment.Moment;
};

const BlockItems = ({ currentDate }: Props) => {
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
