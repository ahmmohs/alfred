import moment from "moment";
import { UserAuth } from "@/context/AuthContext";
import * as React from "react";
import styles from "@/styles/Home.module.css";

type Props = {
  currentDate: moment.Moment;
  setCurrentDate: (newTime: moment.Moment) => void;
};

const DateHeader = ({
  currentDate,
  setCurrentDate,
}: Props) => {
  const { logOut } = UserAuth();
  return (
    <div className={styles.date__header__wrapper}>
      <div className={styles.header__dates}>
        <div
          className={styles.header__small__date}
          onClick={() =>
            setCurrentDate(
              moment(currentDate).subtract(1, "d")
            )
          }
        >
          {moment(currentDate)
            .subtract(1, "d")
            .format("Do")}
        </div>
        <div className={styles.header__todays__date}>
          {currentDate.format("Do")}
        </div>
        <div
          className={styles.header__small__date}
          onClick={() =>
            setCurrentDate(moment(currentDate).add(1, "d"))
          }
        >
          {moment(currentDate).add(1, "d").format("Do")}
        </div>
      </div>
      <div onClick={logOut}>Log out</div>
    </div>
  );
};

export default DateHeader;
