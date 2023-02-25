import { UserAuth } from "@/context/AuthContext";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const BlocksIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 7.5H15V6H21V7.5ZM2.25 3C1.00781 3 0 4.00781 0 5.25V8.25C0 9.49219 1.00781 10.5 2.25 10.5H21.75C22.9922 10.5 24 9.49219 24 8.25V5.25C24 4.00781 22.9922 3 21.75 3H2.25ZM21 16.5V18H9V16.5H21ZM2.25 13.5C1.00781 13.5 0 14.5078 0 15.75V18.75C0 19.9922 1.00781 21 2.25 21H21.75C22.9922 21 24 19.9922 24 18.75V15.75C24 14.5078 22.9922 13.5 21.75 13.5H2.25Z"
      fill="#B0B3BE"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_102_4)">
      <path
        d="M12 12C13.8186 12 15.5628 11.3679 16.8487 10.2426C18.1347 9.11742 18.8571 7.5913 18.8571 6C18.8571 4.4087 18.1347 2.88258 16.8487 1.75736C15.5628 0.632141 13.8186 0 12 0C10.1814 0 8.43723 0.632141 7.15127 1.75736C5.8653 2.88258 5.14286 4.4087 5.14286 6C5.14286 7.5913 5.8653 9.11742 7.15127 10.2426C8.43723 11.3679 10.1814 12 12 12ZM9.55179 14.25C4.275 14.25 0 17.9906 0 22.6078C0 23.3766 0.7125 24 1.59107 24H22.4089C23.2875 24 24 23.3766 24 22.6078C24 17.9906 19.725 14.25 14.4482 14.25H9.55179Z"
        fill="#B0B3BE"
      />
    </g>
    <defs>
      <clipPath id="clip0_102_4">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const MoneyIcon = () => (
  <svg
    width="30"
    height="24"
    viewBox="0 0 30 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 4.5V15C4.5 16.6547 5.84531 18 7.5 18H27C28.6547 18 30 16.6547 30 15V4.5C30 2.84531 28.6547 1.5 27 1.5H7.5C5.84531 1.5 4.5 2.84531 4.5 4.5ZM7.5 12C9.15469 12 10.5 13.3453 10.5 15H7.5V12ZM10.5 4.5C10.5 6.15469 9.15469 7.5 7.5 7.5V4.5H10.5ZM27 12V15H24C24 13.3453 25.3453 12 27 12ZM24 4.5H27V7.5C25.3453 7.5 24 6.15469 24 4.5ZM13.5 9.75C13.5 8.75544 13.8951 7.80161 14.5983 7.09835C15.3016 6.39509 16.2554 6 17.25 6C18.2446 6 19.1984 6.39509 19.9017 7.09835C20.6049 7.80161 21 8.75544 21 9.75C21 10.7446 20.6049 11.6984 19.9017 12.4017C19.1984 13.1049 18.2446 13.5 17.25 13.5C16.2554 13.5 15.3016 13.1049 14.5983 12.4017C13.8951 11.6984 13.5 10.7446 13.5 9.75ZM2.25 5.625C2.25 5.00156 1.74844 4.5 1.125 4.5C0.501562 4.5 0 5.00156 0 5.625V16.875C0 19.9828 2.51719 22.5 5.625 22.5H24.375C24.9984 22.5 25.5 21.9984 25.5 21.375C25.5 20.7516 24.9984 20.25 24.375 20.25H5.625C3.75938 20.25 2.25 18.7406 2.25 16.875V5.625Z"
      fill="#B0B3BE"
    />
  </svg>
);

const WaterIcon = () => (
  <svg
    width="18"
    height="24"
    viewBox="0 0 18 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_104_10)">
      <path
        d="M1.50001 0C1.08282 0 0.684387 0.173437 0.403137 0.478125C0.121887 0.782812 -0.0281133 1.19062 0.0046992 1.60781L1.3547 20.5172C1.49532 22.4813 3.12657 24 5.09532 24H12.9047C14.8734 24 16.5047 22.4813 16.6453 20.5172L17.9953 1.60781C18.0234 1.19062 17.8828 0.782812 17.5969 0.478125C17.3109 0.173437 16.9172 0 16.5 0H1.50001ZM3.42189 7.33594L3.11251 3H14.8875L14.5781 7.33594L13.4438 7.90313C12.5344 8.35781 11.4656 8.35781 10.5563 7.90313C9.57657 7.41563 8.42345 7.41563 7.44376 7.90313C6.53439 8.35781 5.46564 8.35781 4.55626 7.90313L3.42189 7.33594Z"
        fill="#B0B3BE"
      />
    </g>
    <defs>
      <clipPath id="clip0_104_10">
        <rect width="18" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PlusIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5385 1.78846C11.5385 0.9375 10.851 0.25 10 0.25C9.14904 0.25 8.46154 0.9375 8.46154 1.78846V8.71154H1.53846C0.6875 8.71154 0 9.39904 0 10.25C0 11.101 0.6875 11.7885 1.53846 11.7885H8.46154V18.7115C8.46154 19.5625 9.14904 20.25 10 20.25C10.851 20.25 11.5385 19.5625 11.5385 18.7115V11.7885H18.4615C19.3125 11.7885 20 11.101 20 10.25C20 9.39904 19.3125 8.71154 18.4615 8.71154H11.5385V1.78846Z"
      fill="white"
    />
  </svg>
);

type Props = {
  addBlock: (open: boolean) => void;
};

const Footer = ({ addBlock }: Props) => {
  const { user } = UserAuth();
  const router = useRouter();

  return (
    <div className={styles.footer__wrapper}>
      <Link
        href="/"
        className={
          router.pathname === "/"
            ? `${styles.footer__item} ${styles.footer__item__selected}`
            : styles.footer__item
        }
      >
        <BlocksIcon />
        <div className={styles.footer__item__name}>
          Blocks
        </div>
      </Link>
      <div className={styles.footer__item}>
        <MoneyIcon />
        <div className={styles.footer__item__name}>
          Rewards
        </div>
      </div>
      {user && (
        <div className={styles.footer__item__main}>
          <div
            className={styles.footer__button}
            onClick={() => addBlock(true)}
          >
            <PlusIcon />
          </div>
        </div>
      )}
      <div className={styles.footer__item}>
        <WaterIcon />
        <div className={styles.footer__item__name}>
          Habits
        </div>
      </div>
      <Link href="/account" className={styles.footer__item}>
        <UserIcon />
        <div className={styles.footer__item__name}>
          Account
        </div>
      </Link>
    </div>
  );
};

export default Footer;
