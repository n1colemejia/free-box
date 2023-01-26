import styles from '@/styles/Landing.module.css';
import lemons from '../public/images/lemons.jpeg';

import Link from 'next/link';
import Image from 'next/image';
import { Draggable } from 'drag-react';

const Landing = () => {
    // add images object list, map through and make each draggable & add attributes
    // figure out how to fix each images positions in center of page

    return (
        <div className={styles.landing}>

            <h1 className={styles.landing__h1}>Free Box</h1>

            <div className={styles.landing__loginDiv}>
                <div className={styles.landing__lineDiv}></div>
                <Link className={styles.landing__loginLink} href='/'>Log in</Link>
            </div>

            <div className={styles.landing__imgDiv}>
            {/* five images */}
                <Draggable className={styles.draggable}><Image draggable='true' src={lemons} width='190' height='290' alt='lemons' /></Draggable>
            </div>

            <div className={styles.landing__aboutDiv}>
                <div className={styles.landing__lineDiv}></div>
                <Link className={styles.landing__aboutLink} href='/about'>What is this?</Link>
            </div>

        </div>
    );
};

export default Landing;