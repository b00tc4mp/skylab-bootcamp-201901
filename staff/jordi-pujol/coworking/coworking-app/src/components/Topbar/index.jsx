import React from 'react'
import { NavLink } from 'react-router-dom'

import logic from '../../logic'

function Topbar({ onGoToHome, onGoToProfile, onGoToNotifications, onGoToServices, onLogOut, onCreatingNewLink }) {

    return <section className="topbar">
        <img className="topbar__button--icon" onClick={onGoToHome} />
        {/* <li><NavLink to="/home/myservices/">Close Events</NavLink></li> */}
        <button className="topbar__button" onClick={onGoToProfile}>Profile</button>
        <button className="topbar__button" onClick={onGoToNotifications}>Notifications</button>
        <button className="topbar__button" onClick={onGoToServices}>Create Service</button>
        <button className="topbar__button">My Services</button>
        <a href='#/home/myownservices'>My own services</a>
        <a href='#/home/myservices/closed'>Still to close</a>
        <a href='#/home/myservices/submited'>Submited services</a>
        {(logic.isUserAdmin && <button className="topbar__button" onClick={onCreatingNewLink}>Generate new user link</button>)}
        <button className="topbar__button--logout" onClick={onLogOut}>Log Out</button>
    </section>
}

export default Topbar