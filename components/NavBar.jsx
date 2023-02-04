import PostItemButton from '@/components/PostItemButton';
import SearchBar from '@/components/SearchBar';
import SideMenu from '@/components/SideMenu';
import { Navbar, Text } from '@nextui-org/react';

export default function NavBar({ postItemCallback, uploadImageCallback, handleFileChange }) {
  return (
    <Navbar shouldHideOnScroll variant='sticky'>
      
      <Navbar.Brand>
        <Text h1>FREE BOX</Text>
      </Navbar.Brand>
      
      <Navbar.Content>

        <Navbar.Item>
          <PostItemButton 
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