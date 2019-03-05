'use strict'

import React, { useState, useEffect } from 'react'

import './index.sass'

function Nav(props) {

    let [menuDisplayer, setMenuDisplayer] = useState('nav__icon')

    function handleOnClick(){
        if (menuDisplayer==='nav__icon') setMenuDisplayer('nav__icon open')
        else setMenuDisplayer('nav__icon')
    }

    return (
        <nav className="navbar nav">
            <div className={menuDisplayer} onClick={()=>handleOnClick()}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>)
}

export default Nav