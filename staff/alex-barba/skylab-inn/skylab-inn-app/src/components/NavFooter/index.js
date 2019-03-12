'use strict'

import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import './index.sass'

export default function NavFooter({ onToWelcome, onToProfile, onToSignOut }) {
    const { userData } = useContext(AppContext)

    const handleToWelcome = () => {
        onToWelcome()
    }

    const handleToProfile = () => {
        onToProfile()
    }

    const handleToSignOut = () => {
        onToSignOut()
    }

    return (
        <nav className='nav-footer'>
            <i className='fas fa-home icon' onClick={handleToWelcome}/>
            {userData.role === 'User' &&  <i className='far fa-user-circle icon' onClick={handleToProfile}/>}
            <i className='fas fa-sign-out-alt icon' onClick={handleToSignOut}/>
        </nav>
    )
}