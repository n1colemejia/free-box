import { auth, firestore } from '@/lib/firebase';
import { Button } from '@nextui-org/react';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function DibsButton({ itemTitle, addDibsCallback, removeDibsCallback }) {
  // listen to dibs document for currently logged in user
  const uid = auth.currentUser.uid;
  const itemRef = firestore.collection('users').doc(uid).collection('items').doc(itemTitle);
  const dibsRef = itemRef.collection('dibs').doc(auth.currentUser.uid);
  const [dibsDoc] = useDocument(dibsRef);

  return dibsDoc?.exists() ? (
    <Button size='sm' onPress={() => removeDibsCallback(itemTitle, dibsRef)}>Nvm.</Button>
    ) : (
    <Button size='sm' onPress={() => addDibsCallback(itemTitle, dibsRef)}>I want dibs!</Button>
    );
}