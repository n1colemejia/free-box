import { auth, firestore, serverTimestamp } from '@/lib/firebase';
import { increment } from 'firebase/firestore';

const getItemRef = (uid, itemTitle) => {
  // const uid = auth.currentUser.uid;
  const itemRef = firestore
    .collection('users')
    .doc(uid)
    .collection('items')
    .doc(itemTitle);
  return itemRef;
};

// edit item 
export async function editItem(itemData) {
  const itemRef = getItemRef(itemData.title);
  console.log(itemRef)
  const updatedItemData = {
    caption: itemData.caption,
    updatedAt: serverTimestamp(),
  };
  await itemRef.update(updatedItemData);
  // router.reload();
};

// delete item
export async function deleteItem(itemTitle) {
  console.log('delete')
  const itemRef = getItemRef(itemTitle);
  const confirmDelete = confirm('are you sure about this?');
  if (confirmDelete) {
    await itemRef.delete();
    // router.reload();
  };
};

  // add dibs to item
  export async function addDibs(uid, itemTitle, dibsRef) {
    const batch = firestore.batch();
    const itemRef = getItemRef(uid, itemTitle);
    batch.update(itemRef, { dibsCount: increment(1) });
    batch.set(dibsRef, { uid });
    await batch.commit();
  };

  // remove dibs from item
  export async function removeDibs(uid, itemTitle, dibsRef) {
    const batch = firestore.batch();
    const itemRef = getItemRef(uid, itemTitle);
    batch.update(itemRef, { dibsCount: increment(-1) });
    batch.delete(dibsRef);
    await batch.commit();
  };