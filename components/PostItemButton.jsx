import { Button, Input } from '@nextui-org/react';
import Popup from 'reactjs-popup';

export default function PostItemButton({ PostItemCallback, uploadImageCallback, handleFileChange }) {

  return (
    <Popup trigger={<button>Post Item</button>} position='center center'>
      <div>
        <form>
          <Input underlined labelPlaceholder="Title" />
          <Input
            type='file'
            onChange={(event) => handleFileChange(event.target.files[0])}
          />
          <Button onPress={uploadImageCallback}>Upload Image</Button>
          <Input underlined clearable labelPlaceholder="Caption" />
        </form>
      </div>
    </Popup>
    );
  }
  