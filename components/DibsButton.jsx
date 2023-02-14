import { UserContext } from '@/lib/context';
import { firestore, getUserWithUsername } from '@/lib/firebase';
import { addDibs, removeDibs } from '@/lib/item';
import { useContext } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';

// const getItemRef = async (username) => {
//   const userDoc = await getUserWithUsername(username);
//   const itemRef = userDoc.collection('items').doc(title);
//   return itemRef;
// };

export default function DibsButton({ item }) {
  // const { username } = useContext(UserContext);
  // const admin = getUserWithUsername(username);
  // const uid = admin.uid;
  // get item ref
  // const dibsRef = getUserWithUsername(item.username)
  //   .then((userDoc) => {
  //     return userDoc.collection('items').doc(item.title)
  //   }).then((itemRef) => {
  //     return itemRef.collection('dibs').doc(admin)
  //   });

  // const userDoc = getUserWithUsername(item.username);
  // const itemsRef = collection(firestore, "items");
  // const itemRef = query(itemsRef, where("title", "==", item.title));

  // const dibsRef = collection(firestore, "dibs");
  // const dibRef = query(dibsRef, where("uid", "==", uid));
  // const [dibsDoc] = useDocument(dibRef);

//   const handleRemove = () => removeDibs(uid, item.title, dibsRef);
//   const handleAdd = () => addDibs(uid, item.title, dibsRef);

//   return dibsDoc?.exists() ? (
//     <button onClick={handleRemove}>Nvm.</button>
//     ) : (
//     <button onClick={handleAdd}>I want dibs!</button>
//     );
  return <button>I want dibs!</button>
};