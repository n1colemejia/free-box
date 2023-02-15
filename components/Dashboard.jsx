import styles from '../styles/Dashboard.module.css';

import Link from 'next/link';

export default function Dashboard() {
  const updateOne = "Brianna, Natalie and 3 others added new item to their free box";
  const updateTwo = "2 friends claimed dibs on items in your free box";
  const updateThree = "Sahana added you as a friend";
  
  const notifications = (
    <div className={styles.updates}>
      <h2 className={styles.updateOne}>
        <Link className={styles.link} href='/captainofvintage'>Uche</Link>, <Link className={styles.link} href='/jackharlows_gf'>Aisha</Link> and <Link className={styles.link} href='/'>3 others</Link> added new item to their free box.
      </h2>     
      <h2 className={styles.updateTwo}>
        2 friends claimed dibs on items in <Link className={styles.link} href='/nicolemejia'>your free box</Link>.
      </h2>    
      <h2 className={styles.updateThree}>
        <Link className={styles.link} href='/nashwa'>Nashwa</Link> added you as a friend.
      </h2>   
    </div>
  );

  return (
    <section className={styles.dash}>
            <h1 className={styles.greeting}>Good Afternoon, Nicole 🖤</h1>
            {notifications}
    </section>
  );
}