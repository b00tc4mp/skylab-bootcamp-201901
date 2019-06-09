import React from 'react'
import Menu from '../Menu'
import Login from '../Login'
import { withRouter } from 'react-router-dom'
import logo from '../../logo.svg';

function Nav({onLogin, onLogout, isLogged, user}) {

    return <>
        <div className="uk-width-1-1@m uk-margin">
            <nav className="uk-navbar" data-uk-navbar>
                {/* <a className="uk-navbar-item uk-logo" href="#">{logo}</a> */}
                {!isLogged && <Login onLogin={onLogin}/>}
                {isLogged && user && <Menu user={user} onLogout={onLogout}/>}
            </nav>
        </div>
    </>
}

export default withRouter(Nav)