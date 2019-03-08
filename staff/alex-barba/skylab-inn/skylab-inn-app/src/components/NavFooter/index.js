'use strict'

import React, { useContext } from 'react'
import { AppContext } from '../AppContext'

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
        <nav>
            <a onClick={handleToWelcome}>Home</a>
            {userData.role === 'User' && <a onClick={handleToProfile}>Profile</a>}
            <a onClick={handleToSignOut}>Sign Out</a>
        </nav>
    )
}