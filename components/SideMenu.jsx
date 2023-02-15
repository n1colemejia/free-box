import styles from '../styles/SideMenu.module.css';
import Link from "next/link";

export default function SideMenu({ username, handleLogOut }) {
  return (
        <div className={styles.div}>
            <button className={styles.button}>
              <Link className={styles.link} href={`/${username}`}>Go to profile</Link>
            </button>
            <button className={styles.button} onClick={handleLogOut}>Log out</button>
        </div>
  );
}