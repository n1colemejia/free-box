import UserProfile from '@/components/UserProfile';
import ItemFeed from '@/components/ItemFeed';

import { auth, firestore, getUserWithUsername, itemToJSON } from '@/lib/firebase';

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
  .limit(1);

  userItems = (await itemsQuery.get()).docs.map(itemToJSON);

  return {
    props: { user, userItems }, // pass to page
  };
}

export default function ProfilePage({ user, userItems }) {
  // add friend to user
  const addFriend = async (friendRef) => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();
    batch.set(friendRef, { uid });
    await batch.commit();
  };

  // remove friend to user
  const removeFriend = async (friendRef) => {
    const batch = firestore.batch();
    batch.delete(friendRef);
    await batch.commit();
  };

  return (
    <main>
      <UserProfile 
        user={user}
        addFriendCallback={addFriend}
        removeFriendCallback={removeFriend}
      />
      <ItemFeed items={userItems} />
    </main>
  );
}