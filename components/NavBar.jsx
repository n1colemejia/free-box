import styles from '../styles/NavBar.module.css';

import logo from '../public/images/logo.png';

import PostItemForm from '@/components/PostItemForm';
import SearchBar from '@/components/SearchBar';
// import SideMenu from '@/components/SideMenu';
import Link from 'next/link';
import Image from 'next/image';

import { useContext } from 'react';
import { UserContext } from '@/lib/context';

export default function NavBar({ 
  handleLogInWithGoogle,
  handleLogOut, 
  openPostItem, 
  handlePostItem,
  postItemCallback,
  uploadImageCallback,
  handleFileChange }) {

  // context 
  const { user, username } = useContext(UserContext);

  return user ? ( 
    <nav className={styles.nav}>
        <div className={styles.title}>
          <Link href='/' className={styles.logo}>
            <Image src={logo} width={100} height={100} alt='cube' />
          </Link>
          <h1>free box</h1>
        </div>
        <SearchBar className={styles.search} />
        <div className={styles.div}>
          <PostItemForm
            className={styles.post}
            openPostItem={openPostItem}
            handlePostItem={handlePostItem}
            postItemCallback={postItemCallback}
            uploadImageCallback={uploadImageCallback}
            handleFileChange={handleFileChange}
          />
          {/* <SideMenu 
            className={styles.menu}
            username={username}
            handleLogOut={handleLogOut} 
          /> */}
          <button className={styles.button}>
            <Link className={styles.link} href={`/${username}`}>Go to profile</Link>
          </button>
          <button className={styles.button} onClick={handleLogOut}>Log out</button>
        </div>
    </nav>
  ) : (
    <nav className={styles.loginNav}>
        <div className={styles.title}>
          <Link href='/login' className={styles.logo}>
            <Image src={logo} width={100} height={100} alt='cube' />
          </Link>
          <h1>free box</h1>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button}>Sign Up</button>
          <button className={styles.button} onClick={handleLogInWithGoogle}>Log In</button>
        </div>
    </nav>
  );
}