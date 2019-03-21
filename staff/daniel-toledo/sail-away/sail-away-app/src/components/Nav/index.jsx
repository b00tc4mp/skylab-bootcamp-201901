'use strict'

import React, { useState, useEffect } from 'react'
import { withRouter} from 'react-router-dom'

import logo from './logo2.png'

import './index.sass'

function Nav(props) {

    const { toggleMenu, isLanding, isLogged, isOpen } = props

    const [menuDisplayer, setMenuDisplayer] = useState(`nav__icon ${isOpen}`)

    useEffect(()=>{
        setMenuDisplayer(`nav__icon ${isOpen}`)

    },[isOpen])

    function handleOnClick() {
        if (menuDisplayer === 'nav__icon close') {
            setMenuDisplayer('nav__icon open')
            toggleMenu(true)
        }
        else {
            setMenuDisplayer('nav__icon close')
            toggleMenu(false)
        }
    }

    let navClass = isLanding ? 'navbar nav nav-landing' : 'navbar nav'
    
    return (
        <nav className={navClass}>
            <div onClick={()=>props.history.push('/')}>
                <img src={logo} alt="logo-sail-away" className='nav__logo' />
            </div>
            {isLogged &&
                <div className={menuDisplayer} onClick={() => handleOnClick()}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            }
            {!isLogged &&
                <div className='nav__sign'>
                    <button onClick={()=> props.history.push('/login')} className='nav__sign-login'>Login</button>
                    <button onClick={()=>props.history.push('/register')}>Register</button>
                </div>
            }
            
        </nav>)
}

export default withRouter(Nav)