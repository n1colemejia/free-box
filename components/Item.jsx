import styles from '../styles/Item.module.css';

import AuthCheck from './AuthCheck';
import AdminButtons from './AdminButtons';
import Image from 'next/image';
import Link from 'next/link';

export default function Item({ 
  item, 
  openEditItem, 
  handleOpenEditItem, 
}) {

  return (
    <div className={styles.item}>
      <div className={styles.imageDiv}>
        <Image 
          className={styles.image}
          src={item.image}
          alt={`${item.title}`}
          width={300}
          height={300}
          />
      </div>
      <div className={styles.infoDiv}>
      <h3 className={styles.title}>{item.title}</h3>
        {item.caption ? <h4 className={styles.caption}>{item.caption}</h4> : <h4 className={styles.noCap}>nothing to see here nothing to see here.</h4>}
      <Link className={styles.usernameLink} href={`/${item.username}`}>
        <h4 className={styles.username}>@{item.username}</h4>
      </Link>
      </div>
          <div className={styles.buttons}>
            <AdminButtons 
              openEditItem={openEditItem}
              handleOpenEditItem={handleOpenEditItem}
              item={item}
            />
          </div>
    </div>
  );
}