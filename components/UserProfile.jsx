import styles from '../styles/UserProfile.module.css';

import Image from 'next/image';
import AddFriendButton from './AddFriendButton';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';

export default function UserProfile({ user, addFriendCallback, removeFriendCallback}) {
  const { username } = useContext(UserContext);
  let admin = false
  if (user.username === username) {
    admin = true;
  }

  return (
      <section className={styles.section}>
        <div className={styles.profile}>
          <div className={styles.imageDiv}>
            <Image
              className={styles.image}
              src={user.profilePic}
              alt={`photo of ${user.name}`}
              width={200}
              height={250}
            />
          </div>
          <div className={styles.nameAndButton}>
            <h1 className={styles.name}>{user.name}</h1>
          </div>
            {admin ? <></> : <AddFriendButton
              className={styles.button}
              friend={user.username}
              addFriendCallback={addFriendCallback}
              removeFriendCallback={removeFriendCallback}
            />}
          <h2 className={styles.username}>@{user.username}</h2>
          <h3 className={styles.bio}>{user.bio}</h3>
        </div>
    </section>
  );
}