import styles from '../styles/SearchBar.module.css';
import Image from 'next/image';
import search from '../public/images/search.png';
export default function SearchBar() {
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type='search'
        name='search'
        placeholder=' Search'
      />
      <Image className={styles.icon} src={search} width={25} alt='search button' />
    </div>
  );
}

