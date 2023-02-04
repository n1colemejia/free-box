import PostItemForm from '@/components/PostItemForm';
import SearchBar from '@/components/SearchBar';
import SideMenu from '@/components/SideMenu';
import { Navbar, Text } from '@nextui-org/react';

export default function NavBar({ openPopup, handlePopup, postItemCallback, uploadImageCallback, handleFileChange }) {
  return (
    <Navbar shouldHideOnScroll variant='sticky'>
      
      <Navbar.Brand>
        <Text h1>FREE BOX</Text>
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
          <SideMenu />
        </Navbar.Item>

      </Navbar.Content>

    </Navbar>
  );
}