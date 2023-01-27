import styles from 'styles/SignUpForm.module.css';

import React, { useState } from "react";
import Link from 'next/link';

const SignUpForm = ({ addNewUserCallback }: any) => {
    // state
    const [newUserData, setNewUserData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        city: '',
        state: '',
        // avatar: '',
        items: [],
        friends: []
    });

    // submit new user data to db using callback
    const submitNewUserData = (e: any) => {
        e.preventDefault();

        addNewUserCallback(newUserData)
        setNewUserData({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        city: '',
        state: '',
        // avatar: '',
        items: [],
        friends: []
        });
        console.log(e)
    };

    // handle input changes & set new user data state 
    const handleChange = (e: any) => {
        setNewUserData({...newUserData, [e.target.name]: e.target.value});
    };

    return (
        <div className={styles.signUp__div}>
            <h2>Sign Up for Free Box</h2>
            <form onSubmit={submitNewUserData}>
                <div className={styles.signUp__fields}>
                    
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        name="firstName"
                        id="firstName"
                        value={newUserData.firstName}
                        onChange={handleChange}
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        name="lastName"
                        id="lastName"
                        value={newUserData.lastName}
                        onChange={handleChange}
                    />

                    <label htmlFor="username">Username</label>
                    <input 
                        name="username"
                        id="username"
                        value={newUserData.username}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        name="password"
                        id="password"
                        value={newUserData.password}
                        type="password"
                        onChange={handleChange}
                    />

                    <label htmlFor="city">City</label>
                    <input 
                        name="city"
                        id="city"
                        value={newUserData.city}
                        onChange={handleChange}
                    />

                    <label htmlFor="state">State</label>
                    <input 
                        name="state"
                        id="state"
                        value={newUserData.state}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="avatar">Add a profile picture</label>
                    <input 
                        name="avatar"
                        id="avatar"
                        value={newUserData.avatar}
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleChange}
                    /> */}

                    <Link href="/"><button className={styles.signUp__submit} type="submit">Sign Up</button></Link>
                </div>

            </form>
        </div>
    );
};

export default SignUpForm;