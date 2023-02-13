import styles from '@/styles/HomePage.module.css';

import Dashboard from '@/components/Dashboard';
import ItemFeed from '@/components/ItemFeed';

import { useState } from 'react';
import { firestore, itemToJSON, fromMillis, serverTimestamp } from '@/lib/firebase';
import { increment } from 'firebase/firestore';

// global variable for max item to query
const LIMIT = 5;

// get request for all users' items with SSR
export async function getServerSideProps(context) {
  
  const allItemsQuery = firestore
  .collectionGroup('items')
  .where('published', '==', true)
  .orderBy('createdAt', 'desc')
  .limit(LIMIT);
  
  const allItems = (await allItemsQuery.get()).docs.map(itemToJSON);

  // const uid = auth.currentUser.uid;
  // const allFriendsQuery = firestore
  //   .collection('users')
  //   .doc(uid)
  //   .collection('friends');

  // const allFriends = (await allFriendsQuery.get()).doc.map((doc) => {
  //   doc.data();
  // });

  return {
    props: { allItems, } // passed to HomePage as props
  };
}

export default function HomePage({ allItems }) {
  // state 
  const [items, setItems] = useState(allItems);
  const [loading, setLoading] = useState(false);
  const [itemsEnd, setItemsEnd] = useState(false);
  const [openEditItem, setOpenEditItem] = useState(false);

  // context 
  // const { user, username } = useContext(UserContext);

  // router 
  // const router = useRouter();

  // get more items callback 
  const getMoreItems = async () => {
    setLoading(true);
    const last = items[items.length - 1];
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
    const query = firestore
      .collectionGroup('items')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);
    const newItems = (await query.get()).docs.map((doc) => doc.data());

    setItems(items.concat(newItems));
    setLoading(false);

    if (newItems.length < LIMIT) {
      setItemsEnd(true);
    }
  };

  // edit item 
  const editItem = async (itemData) => {
    const itemRef = getItemRef(itemData.title);
    const updatedItemData = {
      caption: itemData.caption,
      updatedAt: serverTimestamp(),
    };
      await itemRef.update(updatedItemData);
      router.reload();
  };

  // open post item pop up event handler
  const handleOpenEditItem = () => {
    setOpenEditItem(!openEditItem);
  }
  
  // delete item
  const deleteItem = async (itemTitle) => {
    const itemRef = getItemRef(itemTitle);
    const confirmDelete = confirm('are you sure about this?');
    if (confirmDelete) {
      await itemRef.delete();
      router.reload();
    };
  };

  // add dibs to item
  // const addDibs = async (itemTitle, dibsRef) => {
  //   const batch = firestore.batch();
  //   const uid = auth.currentUser.uid;
  //   const itemRef = getItemRef(itemTitle);
  //   batch.update(itemRef, { dibsCount: increment(1) });
  //   batch.set(dibsRef, { uid });
  //   await batch.commit();
  // };

  // remove dibs from item
  // const removeDibs = async (itemTitle, dibsRef) => {
  //   const batch = firestore.batch();
  //   const itemRef = getItemRef(itemTitle);
  //   batch.update(itemRef, { dibsCount: increment(-1) });
  //   batch.delete(dibsRef);
  //   await batch.commit();
  // };

  return (
    <main className={styles.main}>
      <Dashboard />
      {/* <FriendList friends={friends} /> */}
      <ItemFeed 
        items={items}
        loading={loading}
        itemsEnd={itemsEnd}
        getMoreItemsCallback={getMoreItems}
        home
        openEditItem={openEditItem}
        handleOpenEditItem={handleOpenEditItem}
        editItemCallback={editItem}
        deleteItemCallback={deleteItem}
        />
    </main>
  );
}

// addDibsCallback={addDibs}
// removeDibsCallback={removeDibs}