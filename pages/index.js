import styles from '@/styles/HomePage.module.css';

import NavBar from '@/components/NavBar';
import Dashboard from '@/components/Dashboard';
import ItemFeed from '@/components/ItemFeed';

import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import { auth, firestore, itemToJSON, fromMillis, serverTimestamp } from '@/lib/firebase';
import { storage } from '../lib/firebase'; 
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { UserContext } from '@/lib/context';

import { v4 } from 'uuid';
import { increment } from 'firebase/firestore';

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
  const [openPostItem, setOpenPostItem] = useState(false);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [openEditItem, setOpenEditItem] = useState(false);

  // context 
  const { user, username } = useContext(UserContext);

  // router 
  const router = useRouter();

  // handle user log out 
  const handleLogOut = () => {
    auth.signOut();
    router.push('/login');
  };

  // get item reference helper 
  const getItemRef = (itemTitle) => {
    const uid = auth.currentUser.uid;
    const itemRef = firestore
      .collection('users')
      .doc(uid)
      .collection('items')
      .doc(itemTitle);
    return itemRef;
  };
  
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
    const itemRef = getItemRef(itemData.title);
    const newItemData = {
      user: {
        name: user.displayName,
        username: username,
      },
      title: itemData.title,
      image: imageURL, 
      caption: itemData.caption,
      published: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await itemRef.set(newItemData);
    router.reload();
  }

  // open post item pop up event handler
  const handlePostItem = () => {
    setOpenPostItem(!openPostItem);
  }

  // input file change event handler
  const handleFileChange = (imageFile) => {
    setImageToUpload(imageFile)
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
        console.log(`imageURL: ${imageURL}`);
        setImageList((prev) => [...prev, url]);
      })
    })
  };

  // const imageListRef = ref(storage, 'images/');

  // useEffect(() => {
  //   listAll(imageListRef)
  //   .then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item)
  //       .then((url) => {
  //         setImageList((prev) => [...prev, url])
  //       })
  //     })
  //   })
  // }, []);

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
  const addDibs = async (itemTitle, dibsRef) => {
    const batch = firestore.batch();
    const uid = auth.currentUser.uid;
    const itemRef = getItemRef(itemTitle);
    batch.update(itemRef, { dibsCount: increment(1) });
    batch.set(dibsRef, { uid });
    await batch.commit();
  };

  // remove dibs from item
  const removeDibs = async (itemTitle, dibsRef) => {
    const batch = firestore.batch();
    const itemRef = getItemRef(itemTitle);
    batch.update(itemRef, { dibsCount: increment(-1) });
    batch.delete(dibsRef);
    await batch.commit();
  };

  return (
    <main>
      <NavBar 
        handleLogOut={handleLogOut}
        openPostItem={openPostItem}
        handlePostItem={handlePostItem}
        postItemCallback={postItem}
        uploadImageCallback={uploadImage}
        handleFileChange={handleFileChange}
        />
      <Dashboard />
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
        addDibsCallback={addDibs}
        removeDibsCallback={removeDibs}
        />
    </main>
  );
}
