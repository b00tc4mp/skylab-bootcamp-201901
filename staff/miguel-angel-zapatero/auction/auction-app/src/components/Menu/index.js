import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {

    return <>
        <section>
            <Link to="/">Home</Link>
            <Link to="/user/mybids">My Bids</Link>
            <Link to="/user">Profile</Link>
            <img href="" />
        </section>
    </>
}

export default Menu