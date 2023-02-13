import styles from '../styles/NavBar.module.css';

import PostItemForm from '@/components/PostItemForm';
import SearchBar from '@/components/SearchBar';
import SideMenu from '@/components/SideMenu';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

import { useContext } from 'react';

import { UserContext } from '@/lib/context';

export default function NavBar({ handleLogInWithGoogle, handleLogOut, openPostItem, handlePostItem, postItemCallback, uploadImageCallback, handleFileChange }) {
  // context 
  const { user, username } = useContext(UserContext);

  return user ? ( 
    <nav className={styles.nav}>
      <div className={styles.navDiv}>
        <Link href='/' className={styles.title}>
          <h1>FREE BOX</h1>
        </Link>
        <div className={styles.centerDiv}>
          <PostItemForm 
            openPostItem={openPostItem}
            handlePostItem={handlePostItem}
            postItemCallback={postItemCallback}
            uploadImageCallback={uploadImageCallback}
            handleFileChange={handleFileChange}
          />
          <SearchBar />
        </div>
        <SideMenu 
          username={username}
          handleLogOut={handleLogOut} />
      </div>
    </nav>
  ) : (
    <nav>
        <h1>
          <Link href='/login'>FREE BOX</Link>
        </h1>
          <Button onPress={handleLogInWithGoogle}>Log In</Button>
    </nav>
  );
}