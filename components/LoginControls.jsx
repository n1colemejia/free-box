import { Button } from '@nextui-org/react';

export default function LoginControls({ isLoggedIn }) {
  return isLoggedIn ? (
    <Button>Log in</Button>
  ) : (
    <Button>Log out</Button>
  );
}