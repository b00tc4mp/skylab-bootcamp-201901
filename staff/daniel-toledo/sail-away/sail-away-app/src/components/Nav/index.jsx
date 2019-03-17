'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import logic from '../../logic'

import './index.sass'

function Nav(props) {

    const { toggleMenu, isLanding } = props

    let [menuDisplayer, setMenuDisplayer] = useState('nav__icon')

    function handleOnClick() {
        if (menuDisplayer === 'nav__icon') {
            setMenuDisplayer('nav__icon open')
            toggleMenu(true)
        }
        else {
            setMenuDisplayer('nav__icon')
            toggleMenu(false)
        }
    }

    function handleLogin() {
        props.history.push('/login')
    }

    function handleRegister() {
        props.history.push('/register')
    }

    let navClass = isLanding ? 'navbar nav nav-landing' : 'navbar nav'
    return (
        <nav className={navClass}>
            {logic.isUserLoggedIn &&
                <div className={menuDisplayer} onClick={() => handleOnClick()}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            }
            {!logic.isUserLoggedIn &&
                <div className='nav__sign'>
                    <button onClick={handleLogin} className='nav__sign-login'>Login</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            }
        </nav>)
}

export default withRouter(Nav)