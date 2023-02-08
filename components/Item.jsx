import AdminButtons from './AdminButtons';
import { Card, Text } from '@nextui-org/react';
import Image from 'next/image';

export default function Item({ item, openEditItem, handleOpenEditItem, editItemCallback, deleteItemCallback }) {
  // if admin, show admin buttons

  return 
    <Card>
      <Text h2>{item.user.displayName}</Text>
      <Text h2>@{item.user.username}</Text>
      <Text h3>{item.title}</Text>
      <Image 
        src={item.image}
        alt={`${item.title}`}
        width={300}
        height={300}
        />
        <Text>{item.caption}</Text>
        <AdminButtons 
          openEditItem={openEditItem}
          handleOpenEditItem={handleOpenEditItem}
          editItemCallback={editItemCallback}
          itemTitle={item.title}
          deleteItemCallback={deleteItemCallback}
          />
    </Card>
}