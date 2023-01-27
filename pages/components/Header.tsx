import React from "react";
import '/styles/Header.module.css'

const Header = () => {
    return (
        <h1>
            <span id="greeting">Hello </span>
            <span id="user-name">User</span>
        </h1>
    )
};

export default Header;