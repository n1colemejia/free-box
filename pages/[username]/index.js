import styles from '../../styles/ProfilePage.module.css';
import UserProfile from '@/components/UserProfile';
import ItemFeed from '@/components/ItemFeed';

import { useState } from 'react';
import { auth, firestore, getUserWithUsername, itemToJSON, fromMillis, increment } from '@/lib/firebase';

// global variable for max item to query
const LIMIT = 10;

// get request for all users' items with SSR
export async function getServerSideProps({ query }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  };

  let user = null;
  let userItems = null;

  user = userDoc.data();

  // query items in users/uid/items collection
  const itemsQuery = userDoc.ref
  .collection('items')
  .where('published', '==', true)
  .orderBy('createdAt', 'desc')
  .limit(LIMIT);

  userItems = (await itemsQuery.get()).docs.map(itemToJSON);

  return {
    props: { user, userItems }, // pass to page
  };
}

export default function ProfilePage({ user, userItems }) {
  // state 
  const [items, setItems] = useState(userItems);
  const [loading, setLoading] = useState(false);
  const [itemsEnd, setItemsEnd] = useState(false);
  const [openEditItem, setOpenEditItem] = useState(false);
  
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

  // open post item pop up event handler
  const handleOpenEditItem = () => {
    setOpenEditItem(!openEditItem);
  };

  // add friend to user
  const addFriend = async (friendRef) => {
    const uid = auth.currentUser.uid;
    const userRef = firestore.collection('users').doc(uid);
    const batch = firestore.batch();
    batch.update(userRef, { friendCount: increment(1) });
    batch.set(friendRef, { name: user.name, profilePic: user.profilePic });
    await batch.commit();
  };

  // remove friend to user
  const removeFriend = async (friendRef) => {
    const uid = auth.currentUser.uid;
    const userRef = firestore.collection('users').doc(uid);
    const batch = firestore.batch();
    batch.update(userRef, { friendCount: increment(-1) });
    batch.delete(friendRef);
    await batch.commit();
  };

  return (
    <main className={styles.main} >
      <UserProfile 
        user={user}
        addFriendCallback={addFriend}
        removeFriendCallback={removeFriend}
      />
      <ItemFeed 
        items={userItems} 
        loading={loading}
        itemsEnd={itemsEnd}
        getMoreItemsCallback={getMoreItems}
        openEditItem={openEditItem}
        handleOpenEditItem={handleOpenEditItem}
      />
    </main>
  );
}