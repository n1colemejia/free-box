import 'reactjs-popup/dist/index.css';
import { Button, Input } from '@nextui-org/react';
import Popup from 'reactjs-popup';

import { useState } from 'react';

export default function PostItemForm({ openPopup, handlePopup, postItemCallback, uploadImageCallback, handleFileChange }) {
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
      <Button onPress={handlePopup}>Post Item</Button>
      <Popup 
        open={openPopup}
        closeOnDocumentClick onClose={() => handlePopup()}
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
            <Button onPress={uploadImageCallback}>Upload Image</Button>
            <Input 
              underlined 
              clearable 
              labelPlaceholder="Caption"
              name='caption'
              value={itemData.caption}
              onChange={handleChange} 
              />
            <Button type='submit'>Post New Item</Button>
        </form>
      </Popup>
    </div>
    );
  }
  