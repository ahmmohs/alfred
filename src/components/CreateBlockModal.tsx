import styles from "@/styles/Modal.module.css";
import { firestore } from "../../firebase/clientApp";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import Modal from "./Modal";
import { UserAuth } from "@/context/AuthContext";

type Props = {
  shown: boolean;
  setShown: (open: boolean) => void;
};

const CreateBlockModal = ({ shown, setShown }: Props) => {
  const [days, setDays] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [blockStart, setBlockStart] = useState<string>("0");
  const [blockEnd, setBlockEnd] = useState<string>("0");
  const [reward, setReward] = useState<string>("0");
  const { user } = UserAuth();

  const updateDays = (day: string): void => {
    const newDays = [...days];
    if (!newDays.includes(day)) {
      newDays.push(day);
      setDays(newDays);
    } else {
      setDays(newDays.filter((d) => d !== day));
    }
  };

  const handleCreate = async () => {
    if (user) {
      const collectionRef = collection(firestore, "blocks");
      const payload = {
        name,
        days,
        blockStart: parseFloat(blockStart),
        blockEnd: parseFloat(blockEnd),
        reward: parseInt(reward),
        tasks: [],
        user: user.email,
      };
      await addDoc(collectionRef, payload);
    }
    setShown(false);
  };

  return (
    <Modal show={shown}>
      <div className={styles.modal__content}>
        <div>
          <div className={styles.modal__name}>
            Create new block
            <div onClick={() => setShown(false)}>x</div>
          </div>
          <div className={styles.modal__input__title}>
            Name
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.modal__input__title}>
            Days
          </div>
          <div className={styles.day__selector}>
            <div
              className={
                !days.includes("mo")
                  ? styles.day__item
                  : `${styles.day__item} ${styles.day__item__selected}`
              }
              onClick={() => updateDays("mo")}
            >
              Mo
            </div>
            <div
              className={
                !days.includes("tu")
                  ? styles.day__item
                  : `${styles.day__item} ${styles.day__item__selected}`
              }
              onClick={() => updateDays("tu")}
            >
              Tu
            </div>
            <div
              className={
                !days.includes("we")
                  ? styles.day__item
                  : `${styles.day__item} ${styles.day__item__selected}`
              }
              onClick={() => updateDays("we")}
            >
              We
            </div>
            <div
              className={
                !days.includes("th")
                  ? styles.day__item
                  : `${styles.day__item} ${styles.day__item__selected}`
              }
              onClick={() => updateDays("th")}
            >
              Th
            </div>
            <div
              className={
                !days.includes("fr")
                  ? styles.day__item
                  : `${styles.day__item} ${styles.day__item__selected}`
              }
              onClick={() => updateDays("fr")}
            >
              Fr
            </div>
            <div
              className={
                !days.includes("sa")
                  ? styles.day__item
                  : `${styles.day__item} ${styles.day__item__selected}`
              }
              onClick={() => updateDays("sa")}
            >
              Sa
            </div>
            <div
              className={
                !days.includes("su")
                  ? styles.day__item
                  : `${styles.day__item} ${styles.day__item__selected}`
              }
              onClick={() => updateDays("su")}
            >
              Su
            </div>
          </div>
          <div className={styles.modal__input__title}>
            Reward
          </div>
          <input
            value={reward}
            onChange={(e) =>
              e.target.value != "" &&
              setReward(e.target.value)
            }
          />
          <div className={styles.modal__input__title}>
            Start
          </div>
          <input
            value={blockStart}
            onChange={(e) =>
              e.target.value != "" &&
              setBlockStart(e.target.value)
            }
          />
          <div className={styles.modal__input__title}>
            End
          </div>
          <input
            value={blockEnd}
            onChange={(e) =>
              e.target.value != "" &&
              setBlockEnd(e.target.value)
            }
          />
        </div>
        <div
          className={styles.modal__confirm}
          onClick={handleCreate}
        >
          Create block
        </div>
      </div>
    </Modal>
  );
};

export default CreateBlockModal;
