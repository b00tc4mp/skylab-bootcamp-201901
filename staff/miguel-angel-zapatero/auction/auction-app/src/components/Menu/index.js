import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Logout'
import './index.sass'

function Menu({user, onLogout}) {
    const [active, setActive] = useState('Home')

    return <>
    <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
            <li className={active === 'Home' ? 'uk-active' : ''} onClick={()=>setActive('Home')}><Link to="/">Home</Link></li>
            <li className={active === 'My Bids' ? "uk-active" : ''} onClick={()=>setActive('My Bids')}><Link to="/user/mybids">My Bids</Link></li>
            <li className={active === 'Profile' ? "uk-active" : ''} onClick={()=>setActive('Profile')}><Link to="/user">Profile</Link></li>
            <li className="uk-navbar-item avatar">
                <img className="avatar__img" src={user.avatar} alt="User avatar"/>
                <div className="uk-navbar-dropdown avatar__menu">
                    <ul className="uk-nav uk-dropdown-nav uk-align-center">
                        <p className="uk-text-center">Hello {user.name}!</p>
                        <li><Logout onLogout={onLogout}/></li>
                    </ul>
                </div>
            </li>        
        </ul>
    </div>
    </>
}

export default Menu