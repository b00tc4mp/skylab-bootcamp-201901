import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import stringContainsAny from '../NavBar/string-contains-any'

export default withRouter(function DropDown (props) {
    const [user, setUser] = useState()

    const { history: { location: { pathname } } } = props

    useEffect(() => {
        logic.retrieveUser()
            .then(user => setUser(user.user))
    }, [])

    const handleLogout = () => {
        logic.logout()
        if (!logic.isUserLoggedIn) props.history.push('/landing')
    }
    return (
        <Fragment>
            <div className='drop-down' onClick={e => {e.preventDefault(); props.setShowDropdown(false)}}>
                <div className='drop-down__content'>
                    <div className='drop-down__content-icondiv' onClick={e => {e.preventDefault(); props.setShowDropdown(false)}}>
                        <i className='fas fa-user drop-down__content-user'></i>
                        <i className="fas fa-chevron-up drop-down__content-arrow"></i>
                    </div>
                    <div className='drop-down__content-linksdiv'>
                        {stringContainsAny(pathname, '/user/') ? <button className='drop-down__content-button drop-down__content-button-highlited'><i class="far fa-user drop-down__content-button-icon"></i> Profile</button> : <button onClick={e => {e.preventDefault(); props.history.push(`/user/${user.id}`)}} className='drop-down__content-button'><i class="far fa-user drop-down__content-button-icon"></i> Profile</button>}
                        <span className='drop-down__content-line'></span>
                        {stringContainsAny(pathname, '/chats') ? <button className='drop-down__content-button drop-down__content-button-highlited'><i class="far fa-comments drop-down__content-button-icon"></i> Chats</button> : <button onClick={e => {e.preventDefault(); props.history.push('/chats')}} className='drop-down__content-button'><i class="far fa-comments drop-down__content-button-icon"></i> Chats</button>}
                        <span className='drop-down__content-line'></span>
                        {stringContainsAny(pathname, '/my-events') ? <button className='drop-down__content-button drop-down__content-button-highlited'><i class="far fa-calendar drop-down__content-button-icon"></i> Events</button> : <button onClick={e => {e.preventDefault(); props.history.push('/my-events')}} className='drop-down__content-button'><i class="far fa-calendar drop-down__content-button-icon"></i> Events</button>}
                        <span className='drop-down__content-line'></span>
                        <button onClick={e => {e.preventDefault(); handleLogout(); props.setShowDropdown(false)}} className='drop-down__content-button'><i class="fas fa-sign-out-alt drop-down__content-button-icon"></i> Logout</button>
                    </div>
                 </div> 
            </div>
        </Fragment>
    )
})