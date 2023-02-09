import AuthCheck from './AuthCheck';
import AdminButtons from './AdminButtons';
import DibsButton from './DibsButton';
import { Card, Text } from '@nextui-org/react';
import Image from 'next/image';

export default function Item({ 
  item, 
  openEditItem, 
  handleOpenEditItem, 
  editItemCallback, 
  deleteItemCallback,
  addDibsCallback,
  removeDibsCallback
}) {

  return (
    <Card>
      <Text h2>{item.user.name}</Text>
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
          <AuthCheck>
            <DibsButton 
              itemTitle={item.title}
              addDibsCallback={addDibsCallback}
              removeDibsCallback={removeDibsCallback}
            />
          </AuthCheck>
    </Card>
  );
}