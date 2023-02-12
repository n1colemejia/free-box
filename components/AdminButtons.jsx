import styles from '../styles/AdminButtons.module.css';

import AuthCheck from './AuthCheck';
import EditItemForm from './EditItemForm';
// import { Button } from '@nextui-org/react';

export default function AdminButtons({ openEditItem, handleOpenEditItem, editItemCallback, itemTitle, deleteItemCallback }) {


  
  return (
    <div className={styles.main} >
      <AuthCheck>
          <EditItemForm 
            openEditItem={openEditItem}
            handleOpenEditItem={handleOpenEditItem}
            editItemCallback={editItemCallback}
            itemTitle={itemTitle}
          />
        <button className={styles.button} onClick={() => deleteItemCallback(itemTitle)}>Delete</button>
      </AuthCheck>
    </div>
  );
}