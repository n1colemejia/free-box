import React from "react";
import styles from 'styles/SearchBar.module.css';

const SearchBar = () => {
    // when searched button is clicked, search value for all users in database containing searched letters
    // return list of user ids
    // pass user ids into User Card component that will show user photo, name etc
    // display the list of users in drop down from input? look into how that will work

    return (
        <section>
            <div className={styles.search}>
                    <input type="text" placeholder="Search" />
                    <button className={styles.search__button}>Search</button>
                    {/* replace search text with icon */}
            </div>
        </section>
    )
}

export default SearchBar;