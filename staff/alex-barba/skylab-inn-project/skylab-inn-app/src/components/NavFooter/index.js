import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import './index.sass'

export default function NavFooter({ onToWelcome, onToProfile, onToSignOut }) {
    const { userData, setFeedback } = useContext(AppContext)

    const handleToWelcome = () => {
        setFeedback(null)
        onToWelcome()
    }

    const handleToProfile = () => {
        setFeedback(null)
        onToProfile()
    }

    const handleToSignOut = () => {
        setFeedback(null)
        onToSignOut()
    }

    return (
        <nav className='nav-footer'>
            <div className='nav-footer__home' onClick={handleToWelcome}>
                <i className='fas fa-home icon'></i>
                <div className='nav-footer__home-logo'></div>
            </div>
            <div className='nav-footer__profile'>
                {userData.role === 'User' &&  <i className='far fa-user-circle icon' onClick={handleToProfile}/>}
            </div>
            <div className='nav-footer__logout'>
                <i className='fas fa-sign-out-alt icon' onClick={handleToSignOut}/>
            </div>
            <div className='nav-footer__hamburger'>
                <div className="nav-footer__hamburger-content">
                    {userData.role === 'User' &&  <i className='far fa-user-circle icon' onClick={handleToProfile}/>}
                    <i className='fas fa-sign-out-alt icon' onClick={handleToSignOut}/>
                </div>
                <i className='fas fa-bars icon nav-footer__hamburger-menu'></i>
            </div>
        </nav>
    )
}