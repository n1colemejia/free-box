import Item from '@/components/Item';
import { Container, Button} from "@nextui-org/react";

export default function ItemFeed({ items, loading, itemsEnd, getMoreItemsCallback, home, admin }) {
  
  const itemsFeed = items ? items.map(
    (item) => <Item item={item} key={item.title} admin={admin} />
    ) : null;
  
  return (
    <Container>
      {itemsFeed}
      {home && !loading && !itemsEnd && <Button onPress={getMoreItemsCallback}>Load More Stuff</Button>}
    </Container>
  );
}