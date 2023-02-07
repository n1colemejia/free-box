import PostItemForm from '@/components/PostItemForm';
import SearchBar from '@/components/SearchBar';
import SideMenu from '@/components/SideMenu';
import { Navbar, Text, Button } from '@nextui-org/react';
import Link from 'next/link';

import { useContext } from 'react';

import { UserContext } from '@/lib/context';

export default function NavBar({ handleLogInWithGoogle, handleLogOut, openPopup, handlePopup, postItemCallback, uploadImageCallback, handleFileChange }) {
  // context 
  const { user, username } = useContext(UserContext);

  return user ? ( 
    <Navbar shouldHideOnScroll variant='sticky'>
      <Navbar.Brand>
        <Text h1>
          <Link href='/'>FREE BOX</Link>
        </Text>
      </Navbar.Brand>
      
      <Navbar.Content>

        <Navbar.Item>
          <PostItemForm 
            openPopup={openPopup}
            handlePopup={handlePopup}
            postItemCallback={postItemCallback}
            uploadImageCallback={uploadImageCallback}
            handleFileChange={handleFileChange}
            />
        </Navbar.Item>

          <Navbar.Item>
            <SearchBar />
          </Navbar.Item>

        <Navbar.Item>
          <SideMenu 
            username={username}
            handleLogOut={handleLogOut} />
        </Navbar.Item>

      </Navbar.Content>
    </Navbar>
  ) : (
    <Navbar shouldHideOnScroll variant='sticky'>

      <Navbar.Brand>
        <Text h1>
          <Link href='/login'>FREE BOX</Link>
        </Text>
      </Navbar.Brand>

      <Navbar.Content>

        <Navbar.Item>
          <Button onPress={handleLogInWithGoogle}>Log In</Button>
        </Navbar.Item>

      </Navbar.Content>

    </Navbar>
  );
}