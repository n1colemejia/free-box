import React from "react";
import Item from "./Item";
import styles from 'styles/ItemList.module.css';

const ItemList = () => {
    // map through friends items, pass props to each item
    
    // const getAllItemsJSX = (items) => {
        // const itemsToDisplay = items.map((item) => {});
        
    return (
        <section>
            <h2>Dig through your friendz stuff!</h2>
            <div>
                <Item />
                <Item />
                <Item />
            </div>
        </section>
    )
};

export default ItemList;