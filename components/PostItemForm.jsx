import styles from '../styles/PostItemForm.module.css';
import 'reactjs-popup/dist/index.css';

import { Input } from '@nextui-org/react';
import Popup from 'reactjs-popup';

import { useState } from 'react';

export default function PostItemForm({ openPostItem, handlePostItem, postItemCallback, uploadImageCallback, handleFileChange }) {
  const [itemData, setNewItemData] = useState({
    title: '',
    caption: '', 
  });

  const submitNewItem = (event) => {
    event.preventDefault()
    postItemCallback(itemData);
    setNewItemData({
        title: '',
        caption: '', 
      });
  }

  const handleChange = (event) => {
    setNewItemData({...itemData, [event.target.name]: event.target.value});

  };

  return (
    <div>
      <button className={styles.button} onClick={handlePostItem}>Post Item</button>
      <Popup 
        open={openPostItem}
        closeOnDocumentClick onClose={() => handlePostItem()}
        >
        <form onSubmit={submitNewItem}>
            <Input 
              underlined 
              labelPlaceholder="Title"
              name='title'
              value={itemData.title}
              onChange={handleChange}
              />
            <Input
              type='file'
              onChange={(event) => handleFileChange(event.target.files[0])}
            />
            <button className={styles.button} onClick={uploadImageCallback}>Upload Image</button>
            <Input 
              underlined 
              clearable 
              labelPlaceholder="Caption"
              name='caption'
              value={itemData.caption}
              onChange={handleChange} 
              />
            <button className={styles.button} type='submit'>Post New Item</button>
        </form>
      </Popup>
    </div>
    );
  }
  