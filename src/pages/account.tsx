import { UserAuth } from "@/context/AuthContext";

import styles from "@/styles/Home.module.css";

export default function Account() {
  const { user, logOut } = UserAuth();

  return (
    <div className={styles.root}>
      Handle user stuff here
    </div>
  );
}
