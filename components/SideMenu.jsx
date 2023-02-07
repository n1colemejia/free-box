import Link from "next/link";
import { Button, Dropdown } from '@nextui-org/react';

export default function SideMenu({ username, handleLogOut }) {
  return (
    <Dropdown>
      <Dropdown.Button flat>Menu</Dropdown.Button>
      <Dropdown.Menu aria-label="Static Actions">
          
          <Dropdown.Item key='profile'>
            <Link href={`/${username}`}>Go to profile</Link>
          </Dropdown.Item>
          
          <Dropdown.Item key="home">
              <Link href='/'>Take me home</Link>
          </Dropdown.Item>
          
          <Dropdown.Item key="logOut" withDivider color="default">
              <Button onPress={handleLogOut}>Log out</Button>
          </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );
}