import { auth, firestore } from '@/lib/firebase';
import { Button } from '@nextui-org/react';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function AddFriendButton({ addFriendCallback, removeFriendCallback }) {
  // listen to dibs document for currently logged in user
  const uid = auth.currentUser.uid;
  const userRef = firestore.collection('users').doc(uid);
  const friendRef = userRef.collection('friends').doc(auth.currentUser.uid);
  const [friendDoc] = useDocument(friendRef);

  return friendDoc?.exists() ? (
    <Button size='sm' onPress={() => removeFriendCallback(friendRef)}>Remove Friend</Button>
    ) : (
    <Button size='sm' onPress={() => addFriendCallback(friendRef)}>Add Friend</Button>
    );
}