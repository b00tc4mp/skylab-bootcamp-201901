import React from 'react'
import Search from '../Search'
import './index.sass'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'

export default withRouter(function Navbar(props, {setResults}) {
    const handleLogout = () => {
        logic.logout()
        if (!logic.isUserLoggedIn) props.history.push('/landing')
    }
    return (
        <header className="nav-bar">
            <p>Logo</p>  
            {<Search setResults={setResults} className="nav-bar__search"></Search>}
            <button onClick={handleLogout}>Logout</button>
        </header>
    )
})