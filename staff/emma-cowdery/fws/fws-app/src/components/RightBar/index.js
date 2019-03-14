import React, { Fragment, useEffect, useState } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'

export default withRouter(function RightBar (props) {
    const [user, setUser] = useState()

    useEffect(() => {
        logic.retrieveUser()
            .then(user => setUser(user.user))
    }, [])

    const handleLogout = () => {
        logic.logout()
        if (!logic.isUserLoggedIn) props.history.push('/landing')
    }

    console.log(user)

    return (
        <Fragment>
            {user && <div className='right-bar'>
                <div className='right-bar__empty' onClick={e => {e.preventDefault(); props.setShowRightBar(false)}}></div>
                <div className='right-bar__options'>
                    <div className='right-bar__profile'>
                        <i className="fas fa-user right-bar__img"></i>
                        <div>
                            <p className='right-bar__username'>{user.username}</p>
                            <p className='right-bar__email'>{user.email}</p>
                        </div>
                    </div>
                    {props.history.location.pathname === '/user/:id' ? <button className='right-bar__button-highlited'><i class="far fa-user right-bar__button-icon"></i> Profile</button> : <button className='right-bar__button'><i class="far fa-user right-bar__button-icon"></i> Profile</button>}
                    <span className='right-bar__line'></span>
                    {props.history.location.pathname === '/chats' ? <button className='right-bar__button-highlited'><i class="far fa-comments right-bar__button-icon"></i> Chats</button> : <button className='right-bar__button'><i class="far fa-comments right-bar__button-icon"></i> Chats</button>}
                    <span className='right-bar__line'></span>
                    {props.history.location.pathname === '/my-events' ? <button className='right-bar__button-highlited'><i class="far fa-calendar right-bar__button-icon"></i> Events</button> : <button className='right-bar__button'><i class="far fa-calendar right-bar__button-icon"></i> Events</button>}
                    <span className='right-bar__line'></span>
                    <button onClick={e => {e.preventDefault(); handleLogout(); props.setShowRightBar(false)}} className='right-bar__button-logout'><i class="fas fa-sign-out-alt right-bar__button-icon"></i> Logout</button>
                </div>
            </div>}
        </Fragment>
    )
})