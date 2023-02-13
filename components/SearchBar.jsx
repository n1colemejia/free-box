import styles from '../styles/SearchBar.module.css';
import { Input, Button } from '@nextui-org/react';

export default function SearchBar() {
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type='search'
        name='search'
        placeholder='Search'
      />
      <button className={styles.button}>Search</button>
    </div>
  );
}