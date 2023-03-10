import React, { useEffect, useState } from "react";
import { TaskType } from "../utils/data";
import styles from "@/styles/Home.module.css";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import moment from "moment";

type Props = {
  task: TaskType;
  lastItem?: boolean;
  currentDate: moment.Moment;
};

const RepeatSymbole = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_101_2)">
        <path
          d="M0 6.125C0 6.60899 0.391016 7 0.875 7C1.35898 7 1.75 6.60899 1.75 6.125C1.75 4.67578 2.92578 3.5 4.375 3.5H8.75V4.375C8.75 4.72774 8.96328 5.04766 9.29141 5.18438C9.61953 5.3211 9.99414 5.24453 10.2457 4.99571L11.9957 3.24571C12.3375 2.90391 12.3375 2.34883 11.9957 2.00703L10.2457 0.257034C9.99414 0.00547145 9.61953 -0.0683567 9.29141 0.0683621C8.96328 0.205081 8.75 0.522268 8.75 0.875003V1.75H4.375C1.95781 1.75 0 3.70782 0 6.125ZM14 7.875C14 7.39102 13.609 7 13.125 7C12.641 7 12.25 7.39102 12.25 7.875C12.25 9.32422 11.0742 10.5 9.625 10.5H5.25V9.625C5.25 9.27227 5.03672 8.95235 4.70859 8.81563C4.38047 8.67891 4.00586 8.75547 3.7543 9.0043L2.0043 10.7543C1.6625 11.0961 1.6625 11.6512 2.0043 11.993L3.7543 13.743C4.00586 13.9945 4.38047 14.0684 4.70859 13.9316C5.03672 13.7949 5.25 13.4777 5.25 13.1223V12.25H9.625C12.0422 12.25 14 10.2922 14 7.875Z"
          fill="#404244"
        />
      </g>
      <defs>
        <clipPath id="clip0_101_2">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const IncompleteSymbole = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-label="Todo"
    >
      <rect
        x="1"
        y="1"
        width="12"
        height="12"
        rx="6"
        stroke="#e2e2e2"
        stroke-width="2"
        fill="none"
      ></rect>
      <path
        fill="#e2e2e2"
        stroke="none"
        d="M 3.5,3.5 L3.5,0 A3.5,3.5 0 0,1 3.5, 0 z"
        transform="translate(3.5,3.5)"
      ></path>
    </svg>
  );
};

const CompleteSymbole = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-label="Done"
      fill="#7a72ff"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0ZM11.101 5.10104C11.433 4.76909 11.433 4.23091 11.101 3.89896C10.7691 3.56701 10.2309 3.56701 9.89896 3.89896L5.5 8.29792L4.10104 6.89896C3.7691 6.56701 3.2309 6.56701 2.89896 6.89896C2.56701 7.2309 2.56701 7.7691 2.89896 8.10104L4.89896 10.101C5.2309 10.433 5.7691 10.433 6.10104 10.101L11.101 5.10104Z"
      ></path>
    </svg>
  );
};

const TrashIcon = () => (
  <svg
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_108_2)">
      <path
        d="M3.69687 0.483984L3.5 0.875H0.875C0.391016 0.875 0 1.26602 0 1.75C0 2.23398 0.391016 2.625 0.875 2.625H11.375C11.859 2.625 12.25 2.23398 12.25 1.75C12.25 1.26602 11.859 0.875 11.375 0.875H8.75L8.55312 0.483984C8.40547 0.185938 8.10195 0 7.77109 0H4.47891C4.14805 0 3.84453 0.185938 3.69687 0.483984ZM11.375 3.5H0.875L1.45469 12.7695C1.49844 13.4613 2.07266 14 2.76445 14H9.48555C10.1773 14 10.7516 13.4613 10.7953 12.7695L11.375 3.5Z"
        fill="#B0B3BE"
      />
    </g>
    <defs>
      <clipPath id="clip0_108_2">
        <rect width="12.25" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const TaskItem = ({
  task,
  lastItem = false,
  currentDate,
}: Props) => {
  const [completed, setCompleted] = useState(
    task.completions[currentDate.startOf("d").unix()] ??
      false
  );

  const updateDoc = async (task: TaskType) => {
    const docRef = doc(firestore, "tasks", task.id);
    const completions = {
      ...task.completions,
      [moment(currentDate.startOf("d")).unix()]: !completed,
    };
    await setDoc(docRef, { ...task, completions });
    setCompleted(!completed);
  };

  const deleteTask = async (taskId: string) => {
    const docRef = doc(firestore, "tasks", taskId);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    setCompleted(
      task.completions[currentDate.startOf("d").unix()] ??
        false
    );
  }, [currentDate, task.completions]);

  return (
    <div
      className={
        lastItem
          ? `${styles.task__item__wrapper} ${styles.task__last}`
          : styles.task__item__wrapper
      }
    >
      <div
        className={styles.task__left}
        onClick={() => {
          updateDoc(task);
        }}
      >
        <div className={styles.task__completion__wrapper}>
          {!completed ? (
            <IncompleteSymbole />
          ) : (
            <CompleteSymbole />
          )}
        </div>
        <div
          className={
            !completed
              ? styles.task__name
              : styles.task__name__completed
          }
        >
          {task.name}
          {task.optional && (
            <span className={styles.optional__tag}>
              optional
            </span>
          )}
        </div>
      </div>
      <div className={styles.task__right}>
        <div
          style={{ marginRight: "8px", cursor: "pointer" }}
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon />
        </div>
        {task.repeat && <RepeatSymbole />}
      </div>
    </div>
  );
};

export default TaskItem;
