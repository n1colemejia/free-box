import React from "react";
import Link from "next/link";
import styles from 'styles/Dashboard.module.css';

const Dashboard = () => {
    // display notifications & updates 

    // need access to friends posts and date posted
    // friend names
    // total number of friends who added new items, called dibs on user's items, and new friend requests

    // links go to friends profiles, list of items with dibs, and new friend request page/friend profile
    // for friend request, visibility toggle for reject/accept friend request form

    const friends = ['Natalie', 'Luke', 'Taylor', 'Sahana', 'Nicole'];
    
    return (
        <section>
            <ul>
                <li>
                    <Link href='/'>{friends[0]}</Link> and <Link href='/'>{friends[1]}</Link> added new items to their free box.
                </li>
                <li>
                    <Link href='/'>{friends[2]}</Link> called dibs on <Link href='/'>2 items</Link> in your free box.
                </li>
                <li>
                    You have <Link href='/'>one new friend request</Link>.
                </li>
            </ul>
        </section>
    );
}

export default Dashboard;