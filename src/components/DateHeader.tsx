import moment from "moment";
import { UserAuth } from "@/context/AuthContext";
import * as React from "react";
import styles from "@/styles/Home.module.css";

type Props = {
  currentDate: moment.Moment;
  setCurrentDate: (newTime: moment.Moment) => void;
  setCreateBlockModalOpen: (shown: boolean) => void;
};

const DateHeader = ({
  currentDate,
  setCurrentDate,
  setCreateBlockModalOpen,
}: Props) => {
  const { user, logOut } = UserAuth();
  return (
    <div className={styles.date__header__wrapper}>
      <div className={styles.header__dates}>
        <div className={styles.header__side}>
          {user && (
            <div
              onClick={() => setCreateBlockModalOpen(true)}
            >
              Add block
            </div>
          )}
        </div>
        <div className={styles.header__middle}>
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
              setCurrentDate(
                moment(currentDate).add(1, "d")
              )
            }
          >
            {moment(currentDate).add(1, "d").format("Do")}
          </div>
        </div>
        <div className={styles.header__side}>
          {user && (
            <div
              className={styles.log__out__button}
              onClick={logOut}
            >
              Log out
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateHeader;
