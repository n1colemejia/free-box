import styles from '@/styles/Landing.module.css';

import lemons from '../public/images/lemons.jpeg';
import record from '../public/images/record.jpeg';
import glasses from '../public/images/glasses.jpeg';
import books from '../public/images/books.jpeg';
import boots from '../public/images/boots.jpeg';

import Link from 'next/link';
import Image from 'next/image';
import { Draggable } from 'drag-react';


const Landing = () => {
    

    return (
        <div className={styles.landing}>

            <h1 className={styles.landing__h1}>Free Box</h1>

            <div className={styles.landing__loginDiv}>
                <div className={styles.landing__lineDiv}></div>
                <Link className={styles.landing__loginLink} href='/'>Log in</Link>
            </div>

            <div className={styles.landing__imgDiv}>
                <h2>Upcycle with friends!</h2>
                <Draggable style={{position: 'absolute', left: '5rem', top: '6rem'}}><Image className={styles.lemons} src={lemons} alt='lemons'/></Draggable>
                <Draggable style={{position: 'absolute', left: '20rem', top: '25rem'}}><Image className={styles.record} src={record} alt='record'/></Draggable>
                <Draggable style={{position: 'absolute', left: '44rem', top: '15rem'}}><Image className={styles.glasses} src={glasses} alt='glasses'/></Draggable>
                <Draggable style={{position: 'absolute', left: '30rem', top: '5rem'}}><Image className={styles.books} src={books} alt='books'/></Draggable>
                <Draggable style={{position: 'absolute', left: '60rem', top: '8rem'}}><Image className={styles.boots} src={boots} alt='boots'/></Draggable>
            </div>

            <div className={styles.landing__aboutDiv}>
                <div className={styles.landing__lineDiv}></div>
                <Link className={styles.landing__aboutLink} href='/about'>What is this?</Link>
            </div>

        </div>
    );
};

export default Landing;