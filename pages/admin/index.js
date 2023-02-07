import AuthCheck from '@/components/AuthCheck';
import AdminProfile from '@/components/AdminProfile';
import ItemFeed from '@/components/ItemFeed';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firestore, getUserWithUsername, itemToJSON } from '@/lib/firebase';


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

export default function AdminPage({ user, userItems }) {

  // item for admin feed
  // reference current user doc & their items sub collection
  const itemsRef = firestore.collection('users').doc(auth.currentUser.uid).collection('items');
  const query = itemsRef.orderBy('createdAt');

  // read collection in realtime
  const [querySnapshot] = useCollection(query);

  const adminItems = querySnapshot?.docs.map((doc) => doc.data());

  
  return (
    <main>
      <AuthCheck>
        <AdminProfile user={user} />
        <ItemFeed items={adminItems} admin />
      </AuthCheck>
    </main>
  );
}