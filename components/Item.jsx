import styles from '../styles/Item.module.css';

import AuthCheck from './AuthCheck';
import AdminButtons from './AdminButtons';
import DibsButton from './DibsButton';
import { Text } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className={styles.item}>
      <h3 className={styles.title}>{item.title}</h3>
      <Link className={styles.usernameLink} href={`/${item.username}`}>
        <h4 className={styles.username}>@{item.username}</h4>
      </Link>
      <div className={styles.imageDiv}>
        <Image 
          className={styles.image}
          src={item.image}
          alt={`${item.title}`}
          width={300}
          height={300}
          />
      </div>
        <h4 className={styles.caption}>{item.caption}</h4>
        <AuthCheck>
          <div className={styles.buttons}>
            <AdminButtons 
              openEditItem={openEditItem}
              handleOpenEditItem={handleOpenEditItem}
              editItemCallback={editItemCallback}
              itemTitle={item.title}
              deleteItemCallback={deleteItemCallback}
              />
              {/* <DibsButton
                user={item.username}
                itemTitle={item.title}
                addDibsCallback={addDibsCallback}
                removeDibsCallback={removeDibsCallback}
              /> */}
          </div>
        </AuthCheck>
    </div>
  );
}