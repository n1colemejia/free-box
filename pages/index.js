import styles from '@/styles/HomePage.module.css';

import arrow from '../public/images/arrow.png';

import Dashboard from '@/components/Dashboard';
import ItemFeed from '@/components/ItemFeed';
import Image from 'next/image';

import { useState } from 'react';
import { firestore, itemToJSON, fromMillis } from '@/lib/firebase';

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

  return {
    props: { allItems, } // passed to HomePage as props
  };
};

export default function HomePage({ allItems }) {
  // state 
  const [items, setItems] = useState(allItems);
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

  return (
    <main className={styles.main}>
      <Dashboard />
      <div className={styles.feedHeading}>
        <h3 className={styles.heading}>Dig through your friends stuff!</h3>
        <Image className={styles.arrow} src={arrow} width={200} alt='arrow' />
      </div>
      <ItemFeed 
        items={items}
        loading={loading}
        itemsEnd={itemsEnd}
        getMoreItemsCallback={getMoreItems}
        home
        openEditItem={openEditItem}
        handleOpenEditItem={handleOpenEditItem}
        />
    </main>
  );
};