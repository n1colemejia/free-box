import styles from '../styles/AdminButtons.module.css';

import AuthCheck from './AuthCheck';
import EditItemForm from './EditItemForm';
import { deleteItem } from '@/lib/item';
import DibsButton from './DibsButton';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';

export default function AdminButtons({ item, openEditItem, handleOpenEditItem }) {
  const { username } = useContext(UserContext);
  let admin = false;
  if (username === item.username) {
    admin = true;
  };

  return admin ? (
    <div className={styles.main} >
          <EditItemForm itemTitle={item.title} openEditItem={openEditItem} handleOpenEditItem={handleOpenEditItem} />
          <button className={styles.button} onClick={() => deleteItem(item.title)}>Delete</button>
    </div>
  ) : (
    <div>
      <DibsButton />
    </div>
  );
};