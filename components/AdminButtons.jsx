import AuthCheck from './AuthCheck';
import EditItemForm from './EditItemForm';
import { Button } from '@nextui-org/react';

export default function AdminButtons({ openEditItem, handleOpenEditItem, editItemCallback, itemTitle, deleteItemCallback }) {


  
  return (
    <div>
      <AuthCheck>
          <EditItemForm 
            openEditItem={openEditItem}
            handleOpenEditItem={handleOpenEditItem}
            editItemCallback={editItemCallback}
            itemTitle={itemTitle}
          />
        <Button onPress={() => deleteItemCallback(itemTitle)}>Delete</Button>
      </AuthCheck>
    </div>
  );
}