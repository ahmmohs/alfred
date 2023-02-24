import styles from "@/styles/Modal.module.css";

type Props = {
  show: boolean;
  children: React.ReactElement;
};

const Modal = ({ show = true, children }: Props) => {
  return (
    <div
      className={
        !show
          ? styles.modal__wrapper
          : `${styles.modal__wrapper} ${styles.show__modal}`
      }
    >
      {children}
    </div>
  );
};

export default Modal;
