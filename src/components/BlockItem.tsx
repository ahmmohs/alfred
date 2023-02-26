import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Block, TaskType } from "../utils/data";
import TaskItem from "./TaskItem";
import styles from "@/styles/Home.module.css";
import { UserAuth } from "@/context/AuthContext";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

const PlusIcon = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.07692 1.32692C8.07692 0.73125 7.59567 0.25 7 0.25C6.40433 0.25 5.92308 0.73125 5.92308 1.32692V6.17308H1.07692C0.48125 6.17308 0 6.65433 0 7.25C0 7.84567 0.48125 8.32692 1.07692 8.32692H5.92308V13.1731C5.92308 13.7688 6.40433 14.25 7 14.25C7.59567 14.25 8.07692 13.7688 8.07692 13.1731V8.32692H12.9231C13.5188 8.32692 14 7.84567 14 7.25C14 6.65433 13.5188 6.17308 12.9231 6.17308H8.07692V1.32692Z"
      fill="#4C44D8"
    />
  </svg>
);

const PencilIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_105_14)">
      <path
        d="M11.2191 6.3164L11.5281 6.00742L10.6012 5.08046L8.90313 3.38242L7.97617 2.45546L7.66719 2.76445L7.04922 3.38242L1.60235 8.82929C1.31797 9.11367 1.11016 9.4664 0.995315 9.85195L0.0273465 13.1441C-0.0410129 13.3738 0.0218777 13.6226 0.194143 13.7922C0.366409 13.9617 0.612503 14.0246 0.84219 13.959L4.13164 12.991C4.51719 12.8762 4.86992 12.6684 5.1543 12.384L10.6012 6.9371L11.2191 6.3164ZM4.375 10.9211L4.12617 11.5418C4.0168 11.6266 3.89375 11.6894 3.7625 11.7305L1.62422 12.3594L2.25313 10.2238C2.29141 10.0898 2.35703 9.96679 2.4418 9.86015L3.0625 9.61132V10.4863C3.0625 10.7269 3.25938 10.9238 3.5 10.9238H4.375V10.9211ZM9.91758 0.511322L9.52383 0.907806L8.90586 1.52578L8.59414 1.83476L9.5211 2.76171L11.2191 4.45976L12.1461 5.38671L12.4551 5.07773L13.073 4.45976L13.4695 4.06328C14.1531 3.37968 14.1531 2.27226 13.4695 1.58867L12.3949 0.511322C11.7113 -0.172272 10.6039 -0.172272 9.92031 0.511322H9.91758ZM8.62149 5.10507L4.68399 9.04257C4.51446 9.2121 4.23555 9.2121 4.06602 9.04257C3.89649 8.87304 3.89649 8.59413 4.06602 8.4246L8.00352 4.4871C8.17305 4.31757 8.45196 4.31757 8.62149 4.4871C8.79102 4.65663 8.79102 4.93554 8.62149 5.10507Z"
        fill="#B0B3BE"
      />
    </g>
    <defs>
      <clipPath id="clip0_105_14">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

type Props = {
  block: Block;
  currentDate: moment.Moment;
  setCurrentBlock: (block: Block | null) => void;
  setCreateBlockModalOpen: (open: boolean) => void;
  setCreateTaskModalOpen: (open: boolean) => void;
};

const BlockItem = ({
  block,
  currentDate,
  setCurrentBlock,
  setCreateBlockModalOpen,
  setCreateTaskModalOpen,
}: Props) => {
  const {
    name,
    blockStart: startTime,
    blockEnd: endTime,
  } = block;
  const targetRef = useRef<HTMLDivElement>(null);
  const [momentStart, setMomentStart] = useState<
    undefined | moment.Moment
  >();
  const [momentEnd, setMomentEnd] = useState<
    undefined | moment.Moment
  >();
  const [disabled, setDisabled] = useState(false);
  const [tasks, setTasks] = useState<Array<TaskType>>([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (targetRef.current) {
      const mStart = moment(currentDate)
        .startOf("d")
        .add(startTime, "h");
      const mEnd = moment(currentDate)
        .startOf("d")
        .add(endTime, "h");
      setMomentStart(mStart);
      setMomentEnd(mEnd);
    }
  }, [currentDate, startTime, endTime]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const collectionRef = collection(firestore, "tasks");
    const q = query(
      collectionRef,
      where("blockId", "==", block.id)
    );

    const onlyTodaysTask = (task: TaskType) => {
      if (task.specificDate) {
        if (
          !moment
            .unix(task.specificDate)
            .isSame(currentDate, "day")
        ) {
          return false;
        }
      }
      return true;
    };

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(
        snapshot.docs
          .map((doc) => ({
            ...(doc.data() as TaskType),
            id: doc.id,
          }))
          .filter(onlyTodaysTask)
      );
    });

    return unsubscribe;
  }, [user, block.id, currentDate]);

  const checkReward = () => {};

  return (
    <div
      className={
        !disabled
          ? styles.block__item__wrapper
          : `${styles.block__item__wrapper} ${styles.disabled__block}`
      }
      ref={targetRef}
      aria-disabled={disabled}
    >
      <div className={styles.block__header}>
        <div>
          <div className={styles.block__time}>
            {momentStart?.format("h:mma")} -{" "}
            {momentEnd?.format("h:mma")}
          </div>
          <div className={styles.block__name}>{name}</div>
        </div>
        <div className={styles.block__actions}>
          <div
            className={styles.block__action}
            onClick={() => {
              setCurrentBlock(block);
              setCreateBlockModalOpen(true);
            }}
          >
            <PencilIcon />
          </div>
          <div
            className={styles.block__action__main}
            onClick={() => {
              setCurrentBlock(block);
              setCreateTaskModalOpen(true);
            }}
          >
            <PlusIcon />
          </div>
        </div>
      </div>
      {tasks.length > 0 && (
        <>
          <div className={styles.block__subtitle}>
            Tasks
          </div>
          {tasks.map((task, index) => {
            const lastItem = index === tasks.length - 1;
            return (
              <TaskItem
                task={task}
                lastItem={lastItem}
                key={task.name}
                currentDate={currentDate}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default BlockItem;
