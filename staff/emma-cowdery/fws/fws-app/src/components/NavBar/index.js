import React, { useState, useEffect } from 'react'
import Search from '../Search'
import './index.sass'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import RightBar from '../RightBar'

export default withRouter(function Navbar(props) {
    const [search, setSearch] = useState('no-search')
    const [searchButton, setSearchButton] = useState('search-button')
    const [logo, setLogo] = useState('logo')
    const [userButton, setUserButton] = useState('user-button')
    const [eventsButton, setEventsButton] = useState('events-button')
    const [showUserButton, setShowUserButton] = useState(true)
    // const [showRightBar, setShowRightBar] = useState(false)

    useEffect(() => {
        if (window.screen.width > 1200) {
            setShowUserButton(false)
        }
    }, [])

    return (
        <header className="nav-bar">
            <p className={`nav-bar__${logo}`}>LOGO</p>
            <div className='nav-bar__right'>
                {!showUserButton && <div className='nav-bar__right-desksearch'><Search/></div>}
                {props.history.location.pathname !== '/restaurant-results' ? <button onClick={e => {e.preventDefault(); props.history.push('/restaurant-results')}} className={`nav-bar__${eventsButton}`}>+ new event</button> : <button onClick={e => {e.preventDefault(); props.history.push('/event-categories')}} className={`nav-bar__${eventsButton}`}>events</button>}
                {showUserButton && <i className={`fas fa-search nav-bar__${searchButton}`} onClick={e => {e.preventDefault(); setSearch('search'); setSearchButton('no-search-button'); setLogo('no-logo'); setUserButton('no-user-button'); setEventsButton('no-events-button')}}></i>}
                {showUserButton ? <i className={`fas fa-user nav-bar__${userButton}`} onClick={e => {e.preventDefault(); props.setShowRightBar(true)}}></i> : <div className='fas fa-user nav-bar__user-button' onClick={e => {e.preventDefault(); props.setShowDropdown(true)}}><i class="fas fa-chevron-down nav-bar__down"></i></div>}
            </div>
            <div className={`nav-bar__${search}`}>{<Search setQuery={props.setQuery} setSearch={setSearch} setSearchButton={setSearchButton} setLogo={setLogo} setUserButton={setUserButton} setEventsButton={setEventsButton}></Search>}</div>
            {/* {showRightBar && <div className='nav-bar__right-bar'><RightBar/></div>} */}
        </header>
    )
})