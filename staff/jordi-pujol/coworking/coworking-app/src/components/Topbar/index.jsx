import React from 'react'
import { NavLink } from 'react-router-dom'

import logic from '../../logic'

function Topbar({ onGoToHome, onGoToProfile, onGoToServices, onLogOut, onCreatingNewLink, onViewingTime }) {

    return <section className="bar">
        <section className="topbar">
        <i className="fas fa-users fa-3x" onClick={onGoToHome}></i>
            <div className="topbar__item">
                <i class="fas fa-user-alt"></i>
                <button className="topbar__button" onClick={onGoToProfile}>Profile</button>
            </div>
            <div className="topbar__item">
                <i class="fas fa-plus-square"></i>
                <button className="topbar__button" onClick={onGoToServices}>Create Service</button>
            </div>
            <div className="dropdown">
                <i class="fas fa-bars"></i>
                {/* <button className="dropbtn_more">More</button> */}
                <div className="dropdown-content other">
                    <a href='#/home/inbox'>Home</a>
                    <a href='#/home/profile'>Profile</a>
                    <a href='#/home/notifications'>Notifications</a>
                    <a href='#/home/service'>Create Service</a>
                    {logic.isUserAdmin && <a onClick={onCreatingNewLink}>Generate new user link</a>}
                </div>
            </div>
            <div className="dropdown">
                <i class="fas fa-caret-square-down"></i>
                <button className="dropbtn">My Services</button>
                <div className="dropdown-content">
                    <a href='#/home/myownservices'>My own services</a>
                    <a href='#/home/myservices/closed'>Still to close</a>
                    <a href='#/home/myservices/submited'>Submited services</a>
                </div>
            </div>
            {(logic.isUserAdmin && <div className="topbar__item"><i class="fas fa-link"></i><button className="topbar__button" onClick={onCreatingNewLink}>Generate new user link</button></div>)}
            <div className="topbar__item logout">
                <i class="fas fa-sign-out-alt"></i>
                {/* <button className="topbar__button--logout" onClick={onLogOut}>Log Out</button> */}
                <NavLink onClick={onLogOut} to="/login">Log Out</NavLink>
            </div>
            <div className="topbar__item">
                <i className="fas fa-stopwatch fa-3x" onClick={onViewingTime}></i>
            </div>
        </section>
    </section>
}

export default Topbar