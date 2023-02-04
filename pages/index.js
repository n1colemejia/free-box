import styles from '@/styles/HomePage.module.css';

import NavBar from '@/components/NavBar';
import Dashboard from '@/components/Dashboard';
import ItemFeed from '@/components/ItemFeed';

import { useState, useRouter, useEffect } from 'react';

import { firestore, itemToJSON, fromMillis } from '@/lib/firebase';
import { storage } from '../lib/firebase'; 
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';

// global variable for max item to query
const LIMIT = 1;

// get request for all users' items with SSR
export async function getServerSideProps(context) {
  const allItemsQuery = firestore
    .collectionGroup('items')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);
  const allItems = (await allItemsQuery.get()).docs.map(itemToJSON);
  
  return {
    props: { allItems }, // passed to HomePage as props
  };
}

export default function HomePage({ allItems }) {
  // state 
  const [items, setItems] = useState(allItems);
  const [loading, setLoading] = useState(false);
  const [itemsEnd, setItemsEnd] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageURL, setImageURL] = useState('');

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

  // post new item 
  const postItem = async (itemData) => {
    // e.preventDefault();
    const uid = auth.currentUser.uid;
    const itemRef = firestore
      .collection('users')
      .doc(uid)
      .collection('items')
      .doc(title);

      const newItemData = {
        title: itemData.title,
        image: imageURL, 
        caption: itemData.caption,
        published: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await itemRef.set(newItemData);
  }

  // open post item pop up event handler
  const handlePopup = () => {
    setOpenPopup(!openPopup);
  }

  // input file change event handler
  const handleFileChange = (imageFile) => {
    setImageToUpload(imageFile);
  }

  // upload image callback passed to PostItemButton
  const uploadImage = () => {
    if (imageToUpload == null) return;
    const imageRef = ref(storage, `images/${imageToUpload.name + v4()}`)
    uploadBytes(imageRef, imageToUpload)
    .then((snapshot) => {
      alert('Image Uploaded');
      getDownloadURL(snapshot.ref).then((url) => {
        setImageURL(url);
        setImageList((prev) => [...prev, url]);
      })
    })
  };

  const imageListRef = ref(storage, 'images/');

  useEffect(() => {
    listAll(imageListRef)
    .then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item)
        .then((url) => {
          setImageList((prev) => [...prev, url])
        })
      })
    })
  }, []);

  return (
    <main>
      <NavBar 
        openPopup={openPopup}
        handlePopup={handlePopup}
        postItemCallback={postItem}
        uploadImageCallback={uploadImage}
        handleFileChange={handleFileChange}
        />
      <Dashboard />
      <ItemFeed items={items} loading={loading} itemsEnd={itemsEnd} getMoreItemsCallback={getMoreItems} />
    </main>
  );
}
