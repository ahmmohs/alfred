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

const Footer = () => {
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
      <div className={styles.footer__item}></div>
      <div className={styles.footer__item__main}></div>
      <div className={styles.footer__item}></div>
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
