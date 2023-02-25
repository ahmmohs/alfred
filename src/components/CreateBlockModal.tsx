import styles from "@/styles/Modal.module.css";
import { firestore } from "../../firebase/clientApp";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import Modal from "./Modal";
import { UserAuth } from "@/context/AuthContext";
import { Block } from "@/utils/data";

type Props = {
  block?: Block | null;
  setCurrentBlock: (block: Block | null) => void;
  shown: boolean;
  setShown: (open: boolean) => void;
};

const CreateBlockModal = ({
  block = null,
  setCurrentBlock,
  shown,
  setShown,
}: Props) => {
  const [days, setDays] = useState<string[]>(
    block?.days ?? []
  );
  const [name, setName] = useState<string>(
    block?.name ?? ""
  );
  const [blockStart, setBlockStart] = useState<string>(
    block?.blockStart.toString() ?? "0"
  );
  const [blockEnd, setBlockEnd] = useState<string>(
    block?.blockEnd.toString() ?? "0"
  );
  const [reward, setReward] = useState<string>(
    block?.reward.toString() ?? "0"
  );
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

  const generatePayload = () => {
    return {
      name,
      days,
      blockStart: blockStart ? parseFloat(blockStart) : 0,
      blockEnd: blockEnd ? parseFloat(blockEnd) : 0,
      reward: reward ? parseInt(reward) : 0,
      tasks: [],
      user: user?.email ?? "na",
    };
  };

  const handleCreate = async () => {
    setShown(false);
    if (user) {
      const collectionRef = collection(firestore, "blocks");
      const payload = generatePayload();
      await addDoc(collectionRef, payload);
    }
  };

  const handleEdit = async () => {
    if (user && block) {
      const docRef = doc(firestore, "blocks", block.id);
      const payload = generatePayload();
      await setDoc(docRef, payload);
    }
    setCurrentBlock(null);
    setShown(false);
  };

  const handleDelete = async () => {
    if (user && block) {
      const docRef = doc(firestore, "blocks", block.id);
      await deleteDoc(docRef);
    }
    setCurrentBlock(null);
    setShown(false);
  };

  return (
    <Modal show={shown}>
      <div className={styles.modal__content}>
        <div>
          <div className={styles.modal__name}>
            Create new block
            <div
              onClick={() => {
                setCurrentBlock(null);
                setShown(false);
              }}
            >
              x
            </div>
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
            onChange={(e) => setReward(e.target.value)}
          />
          <div className={styles.modal__input__title}>
            Start
          </div>
          <input
            value={blockStart}
            onChange={(e) => setBlockStart(e.target.value)}
          />
          <div className={styles.modal__input__title}>
            End
          </div>
          <input
            value={blockEnd}
            onChange={(e) => setBlockEnd(e.target.value)}
          />
        </div>
        {block ? (
          <div className={styles.modal__confirm__wrapper}>
            <div
              className={`${styles.modal__confirm__small} ${styles.modal__confirm__secondary}`}
              onClick={handleDelete}
            >
              Delete
            </div>
            <div
              className={styles.modal__confirm__small}
              onClick={handleEdit}
            >
              Save
            </div>
          </div>
        ) : (
          <div
            className={styles.modal__confirm__large}
            onClick={handleCreate}
          >
            Create block
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateBlockModal;
