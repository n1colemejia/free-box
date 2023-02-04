import Item from '@/components/Item';
import { Container, Text, Button} from "@nextui-org/react";

export default function ItemFeed({ items, loading, itemsEnd, getMoreItemsCallback }) {
  const itemsFeed = items ? items.map(
    (item) => <Item item={item} key={item.title}/>
    ) : null;
  
  return (
    <Container>
      {itemsFeed}
      {!loading && !itemsEnd && <Button onPress={getMoreItemsCallback}>Load More Stuff</Button>}
    </Container>
  );
}