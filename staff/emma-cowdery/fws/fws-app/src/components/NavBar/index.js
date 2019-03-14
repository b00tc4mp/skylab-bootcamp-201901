import React, { useState } from 'react'
import Search from '../Search'
import './index.sass'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'

export default withRouter(function Navbar(props) {
    const [search, setSearch] = useState('no-search')
    const [searchButton, setSearchButton] = useState('search-button')
    const [logo, setLogo] = useState('logo')
    const [userButton, setUserButton] = useState('user-button')
    const [eventsButton, setEventsButton] = useState('events-button')

    const handleLogout = () => {
        logic.logout()
        if (!logic.isUserLoggedIn) props.history.push('/landing')
    }

    return (
        <header className="nav-bar">
            <p className={`nav-bar__${logo}`}>LOGO</p>  
            <div>
                <i className={`fas fa-search nav-bar__${searchButton}`} onClick={e => {e.preventDefault(); setSearch('search'); setSearchButton('no-search-button'); setLogo('no-logo'); setUserButton('no-user-button'); setEventsButton('no-events-button')}}></i>
                {props.history.location.pathname !== '/restaurant-results' ? <button onClick={e => {e.preventDefault(); props.history.push('/restaurant-results')}} className={`nav-bar__${eventsButton}`}>+ new event</button> : <button onClick={e => {e.preventDefault(); props.history.push('/event-categories')}} className={`nav-bar__${eventsButton}`}>events</button>}
                <i className={`fas fa-user nav-bar__${userButton}`} onClick={e => {e.preventDefault()}}></i>
            </div>
            <div className={`nav-bar__${search}`}>{<Search setQuery={props.setQuery} setSearch={setSearch} setSearchButton={setSearchButton} setLogo={setLogo} setUserButton={setUserButton} setEventsButton={setEventsButton}></Search>}</div>
        </header>
    )
})