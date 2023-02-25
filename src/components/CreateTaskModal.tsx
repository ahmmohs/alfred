import { UserAuth } from "@/context/AuthContext";
import styles from "@/styles/Modal.module.css";
import { Block } from "@/utils/data";
import { firestore } from "../../firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import Modal from "./Modal";
import moment from "moment";

type Props = {
  show: boolean;
  blockId?: string;
  setBlock: (block: Block | null) => void;
  onShow: (open: boolean) => void;
};

const CreateTaskModal = ({
  show,
  blockId,
  onShow,
  setBlock,
}: Props) => {
  const [name, setName] = useState<string>("");
  const [repeat, setRepeat] = useState<boolean>(true);
  const [optional, setOptional] = useState<boolean>(false);
  const [specificDate, setSpecificDate] =
    useState<string>("");

  const { user } = UserAuth();

  const generatePayload = () => {
    const task = {
      blockId,
      completions: [],
      name,
      optional,
      repeat,
    };
    return specificDate === ""
      ? task
      : {
          ...task,
          specificDate: moment(specificDate).unix(),
        };
  };

  const handleCreate = async () => {
    if (user && blockId) {
      const collectionRef = collection(firestore, "tasks");
      const payload = generatePayload();
      await addDoc(collectionRef, payload);
    }
    setBlock(null);
    onShow(false);
  };

  return (
    <Modal show={show}>
      <div className={styles.modal__content}>
        <div>
          <div className={styles.modal__name}>
            Create new task
            <div
              onClick={() => {
                onShow(false);
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
            Repeat
          </div>
          <input
            type="checkbox"
            checked={repeat}
            onChange={() => setRepeat(!repeat)}
          />
          <div className={styles.modal__input__title}>
            Optional
          </div>
          <input
            type="checkbox"
            checked={optional}
            onChange={() => setOptional(!optional)}
          />
          <div className={styles.modal__input__title}>
            Specific Date
          </div>
          <input
            value={specificDate}
            onChange={(e) =>
              setSpecificDate(e.target.value)
            }
          />
        </div>
        <div
          className={styles.modal__confirm__large}
          onClick={handleCreate}
        >
          Create block
        </div>
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
