import styles from '@/styles/Landing.module.css';
import 'reactjs-popup/dist/index.css';

import lemons from '../public/images/lemons.jpeg';
import record from '../public/images/record.jpeg';
import glasses from '../public/images/glasses.jpeg';
import books from '../public/images/books.jpeg';
import boots from '../public/images/boots.jpeg';

import SignUpForm from './components/SignUpForm';
import Link from 'next/link';
import Image from 'next/image';
import { Draggable } from 'drag-react';
import Popup from 'reactjs-popup';

import { database } from 'firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

// initialize database collection
const dbInstance = collection(database, 'users');

const Landing = () => {
    // state
    const [open, setOpen] = useState(false);

    // reset pop up to close
    const closeModal = () => setOpen(false);

    // add new user to db; pass down to sign up form
    const addNewUser = (newUserData: object) => {
        console.log(newUserData)
        addDoc(dbInstance, newUserData);
    };
    
    return (
        <div className={styles.landing}>

            <h1 className={styles.landing__h1}>Free Box</h1>

        <div className={styles.landing__loginControlsDiv}>

            <div className={styles.landing__loginDiv}>
                    <div className={styles.landing__lineDiv}></div>
                    <Link className={styles.landing__loginLink} href='/'>Log in</Link>
            </div>

            <div className={styles.landing__signupDiv}>
                <div className={styles.landing__lineDiv}></div>
                <p className={styles.landing__signupLink} onClick={() => setOpen(o => !o)}>Sign Up</p>
                <Popup open={open} closeOnDocumentClick onClose={closeModal} contentStyle={{background: "rgb(28, 29, 59, .5)"}}>
                    <div className='popup-overlay popup-arrow'>
                        <a className="close" onClick={closeModal}>&times;</a>
                        <SignUpForm addNewUserCallback={addNewUser}/>
                    </div>
                </Popup>
            </div>
            
        </div>
    
            <div className={styles.landing__imgDiv}>
                <h2>Upcycle with friends!</h2>
                <Draggable style={{position: 'absolute', left: '5rem', top: '6rem', zIndex: 1}}><Image className={styles.lemons} src={lemons} alt='lemons'/></Draggable>
                <Draggable style={{position: 'absolute', left: '20rem', top: '24rem', zIndex: 1}}><Image className={styles.record} src={record} alt='record'/></Draggable>
                <Draggable style={{position: 'absolute', left: '44rem', top: '15rem', zIndex: 1}}><Image className={styles.glasses} src={glasses} alt='glasses'/></Draggable>
                <Draggable style={{position: 'absolute', left: '30rem', top: '5rem', zIndex: 1}}><Image className={styles.books} src={books} alt='books'/></Draggable>
                <Draggable style={{position: 'absolute', left: '60rem', top: '4rem', zIndex: 1}}><Image className={styles.boots} src={boots} alt='boots'/></Draggable>
            </div>

            <div className={styles.landing__aboutDiv}>
                <div className={styles.landing__lineDiv}></div>
                <Link className={styles.landing__aboutLink} href='/about'>What is this?</Link>
            </div>

        </div>
    );
};

export default Landing;