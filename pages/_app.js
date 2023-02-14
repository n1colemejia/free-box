import styles from '@/styles/globals.css'

import NavBar from '@/components/NavBar';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';
import { NextUIProvider } from '@nextui-org/react';
import { auth, firestore, storage, googleAuthProvider, serverTimestamp } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';

export default function App({ Component, pageProps }) {
  // state 
  const [openPostItem, setOpenPostItem] = useState(false);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageURL, setImageURL] = useState('');

  // router 
  const router = useRouter();

  // auth context
  const userData = useUserData();

  // username
  const username = userData.username;

  // NAV BAR LOGIC //
  // handle log in 
  const handleLogInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
    .then(() => {
      !username ? setOpenPopup(true) : setOpenPopup(false);
    })
    .then(() => {
      router.push('/');
    });
  };

  // handle log out 
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
  };

  // handle open post item pop up 
  const handlePostItem = () => {
    setOpenPostItem(!openPostItem);
  };

  // handle input file change
  const handleFileChange = (imageFile) => {
    setImageToUpload(imageFile)
  };

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

  return (
      <UserContext.Provider value={userData} >
        <NextUIProvider>
          <NavBar 
            handleLogInWithGoogle={handleLogInWithGoogle}
            handleLogOut={handleLogOut}
            openPostItem={openPostItem}
            handlePostItem={handlePostItem}
            postItemCallback={postItem}
            uploadImageCallback={uploadImage}
            handleFileChange={handleFileChange}
          />
          <Component {...pageProps} />
        </NextUIProvider>
      </UserContext.Provider>
  );
}
