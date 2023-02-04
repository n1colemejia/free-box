import { Input, Button } from '@nextui-org/react';

export default function SearchBar() {
  return (
    <>
      <Input
        clearable
        type='search'
        name='search'
        placeholder='Search'
      />
      <Button>Search</Button>
    </>
  );
}