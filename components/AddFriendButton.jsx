import styles from '../styles/AddFriendButton.module.css';

import { auth, firestore } from '@/lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function AddFriendButton({ friend , addFriendCallback, removeFriendCallback }) {
  // listen to dibs document for currently logged in user
  const userRef = firestore.collection('users').doc(auth.currentUser.uid); // me
  const friendRef = userRef.collection('friends').doc(friend); // not me , user.uid
  const [friendDoc] = useDocument(friendRef);

  return friendDoc?.exists() ? (
    <button className={styles.button} onClick={() => removeFriendCallback(friendRef)}>Remove Friend</button>
    ) : (
    <button className={styles.button} onClick={() => addFriendCallback(friendRef)}>Add Friend</button>
    );
}