import styles from '../styles/ItemFeed.module.css';
import Item from '@/components/Item';

export default function ItemFeed({ 
  items, 
  loading, 
  itemsEnd, 
  getMoreItemsCallback, 
  home, 
  openEditItem, 
  handleOpenEditItem, 
}) {

  const itemsFeed = items ? items.map(
    (item) => 
    <Item 
      item={item}
      key={item.title} 
      openEditItem={openEditItem}
      handleOpenEditItem={handleOpenEditItem}
      />
    ) : null;
  
  return (
    <section className={styles.section}>
      <div className={styles.feed}>
        {itemsFeed}
      </div>
      {!loading && !itemsEnd && <button className={styles.button} onClick={getMoreItemsCallback}>Load More Stuff</button>}
      {itemsEnd && <p className={styles.message}>I regret to inform you...there is no more stuff to load.</p>}
    </section>
  );
};