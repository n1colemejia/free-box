import React from "react";
import styles from 'styles/SideMenu.module.css';

const SideMenu = () => {
    // two versions
    // show and hide toggle
    // when div is click, show side menu
    // when not clicked, show div with three lines in top right corner

    return (
        <nav>
            <ul>
                <li>Your Profile</li>
                <li>Friends</li>
                <li>Post New Item</li>
                <li>Log out</li>
            </ul>
        </nav>
    );
};

export default SideMenu;