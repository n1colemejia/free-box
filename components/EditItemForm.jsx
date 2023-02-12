import styles from '../styles/EditItemForm.module.css';
import 'reactjs-popup/dist/index.css';

// import Image from 'next/image';
import { Button, Input } from '@nextui-org/react';
import Popup from 'reactjs-popup';

import { useState } from 'react';

export default function EditItemForm({ openEditItem, handleOpenEditItem, editItemCallback, itemTitle }) {
  const [itemData, setItemData] = useState({
    title: itemTitle,
    caption: '', 
  });

  const submitItem = (event) => {
    event.preventDefault();
    editItemCallback(itemData);
    setItemData({
        title: itemTitle,
        caption: '', 
      });
  }

  const handleChange = (event) => {
    setItemData({...itemData, [event.target.name]: event.target.value});
  };

  return (
    <div className={styles.main}>
      <button className={styles.button} onClick={handleOpenEditItem}>Edit</button>
      <Popup 
        open={openEditItem}
        closeOnDocumentClick onClose={() => handleOpenEditItem()}
        >
        <form onSubmit={submitItem}>
            {/* <Input 
              underlined 
              labelPlaceholder="Title"
              name='title'
              value={itemData.title}
              onChange={handleChange}
              /> */}
            {/* <Image 
              src={item.image}
              alt={`${item.title}`}
              width={300}
              height={300}
            /> */}
            <Input 
              underlined 
              clearable 
              labelPlaceholder="Caption"
              name='caption'
              value={itemData.caption}
              onChange={handleChange} 
              />
            <Button type='submit'>Save Changes</Button>
        </form>
      </Popup>
    </div>
  );
}