import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SideMenu from './components/SideMenu';
import Dashboard from './components/Dashboard';
import ItemList from './components/ItemList';

import { database } from 'firebaseConfig';
import { collection } from 'firebase/firestore';

// initialize database collection
const dbInstance = collection(database, 'users');

const Home = () => {
  // state

  return (
    <>
      <Head>
        <title>Free Box</title>
        <meta name="description" content="Upcycle with friends!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <SearchBar />
        <SideMenu />
        <Dashboard />
        <ItemList />
      </main>
    </>
  );
}

export default Home;