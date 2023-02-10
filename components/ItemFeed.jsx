import Item from '@/components/Item';
import { Container, Button, Text } from "@nextui-org/react";

export default function ItemFeed({ 
  items, 
  loading, 
  itemsEnd, 
  getMoreItemsCallback, 
  home, 
  openEditItem, 
  handleOpenEditItem, 
  editItemCallback, 
  deleteItemCallback,
  addDibsCallback,
  removeDibsCallback
}) {

  const itemsFeed = items ? items.map(
    (item) => 
    <Item 
      item={item}
      key={item.title} 
      openEditItem={openEditItem}
      handleOpenEditItem={handleOpenEditItem}
      editItemCallback={editItemCallback}
      deleteItemCallback={deleteItemCallback}
      addDibsCallback={addDibsCallback}
      removeDibsCallback={removeDibsCallback}
      />
    ) : null;
  
  return (
    <Container>
      {itemsFeed}
      {home && !loading && !itemsEnd && <Button onPress={getMoreItemsCallback}>Load More Stuff</Button>}
      {itemsEnd && <Text>I regret to inform you...there is no more stuff to load.</Text>}
    </Container>
  )
}
