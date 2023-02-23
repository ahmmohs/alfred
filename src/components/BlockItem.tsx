import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { TaskType } from "../utils/data";
import TaskItem from "./TaskItem";
import styles from "@/styles/Home.module.css";

type Props = {
  name: string;
  currentDate: moment.Moment;
  startTime: number;
  endTime: number;
  tasks: Array<TaskType>;
};

const BlockItem = ({
  name,
  currentDate,
  startTime,
  endTime,
  tasks,
}: Props) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [momentStart, setMomentStart] = useState<
    undefined | moment.Moment
  >();
  const [momentEnd, setMomentEnd] = useState<
    undefined | moment.Moment
  >();
  const [disabled, setDisabled] = useState(false);

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
      setDisabled(moment().isAfter(mEnd));
    }
  }, [currentDate]);

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
      <div className={styles.block__time}>
        {momentStart?.format("h:mma")} -{" "}
        {momentEnd?.format("h:mma")}
      </div>
      <div className={styles.block__name}>{name}</div>
      {tasks.length > 0 && (
        <>
          <div className={styles.block__subtitle}>
            Tasks
          </div>
          {tasks.map((task, index) => {
            const lastItem = index === tasks.length - 1;
            return (
              <TaskItem task={task} lastItem={lastItem} />
            );
          })}
        </>
      )}
    </div>
  );
};

export default BlockItem;
