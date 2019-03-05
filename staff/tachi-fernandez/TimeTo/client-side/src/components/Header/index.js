import React from 'react'
import { Link } from 'react-router-dom' 
import './index.css'


function Header() {
    return <section className="header">
    <div className="header__register">
        <Link to="/register" >Register</Link>
    </div>
    <div  className="header__login">
        <Link to="/login">Login</Link>
    </div>
    <div>
    <Link to="create-event" className="header__link-create-event">Create event</Link>
    </div>
    </section>
}

export default Header