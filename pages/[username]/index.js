import NavBar from '@/components/NavBar';
import UserProfile from '@/components/UserProfile';
import ItemFeed from '@/components/ItemFeed';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { auth, firestore, getUserWithUsername, itemToJSON, fromMillis, serverTimestamp, increment, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';

// global variable for max item to query
const LIMIT = 1;

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
  .limit(1);

  userItems = (await itemsQuery.get()).docs.map(itemToJSON);

  // let axllUsers = null;

  // const uid = auth.currentUser.uid;
  // const allFriendsQuery = firestore
  //   .collection('users')
  //   .doc(uid)
  //   .collection('friends');

  // const allFriends = (await allFriendsQuery.get()).doc.map((doc) => {
  //   doc.data();
  // });

  return {
    props: { user, userItems }, // pass to page
  };
}

export default function ProfilePage({ user, userItems }) {
  // state 
  const [items, setItems] = useState(userItems);
  const [loading, setLoading] = useState(false);
  const [itemsEnd, setItemsEnd] = useState(false);
  const [openPostItem, setOpenPostItem] = useState(false);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [openEditItem, setOpenEditItem] = useState(false);
  // const [friends, setFriends] = useState(allFriends);

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
      username,
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
    <main>
      <UserProfile 
        user={user}
        addFriendCallback={addFriend}
        removeFriendCallback={removeFriend}
      />
      <ItemFeed 
        items={userItems} 
        itemsEnd={itemsEnd}
        getMoreItemsCallback={getMoreItems}
        openEditItem={openEditItem}
        handleOpenEditItem={handleOpenEditItem}
        editItemCallback={editItem}
        deleteItemCallback={deleteItem}
        // addDibsCallback={addDibs}
        // removeDibsCallback={removeDibs}
      />
    </main>
  );
}