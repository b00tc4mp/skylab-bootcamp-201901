import React from 'react'
import Menu from '../Menu'
import Login from '../Login'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem } from '@fortawesome/free-regular-svg-icons'
import './index.sass'
import logic from '../../logic';

function Nav({onLogin, onLogout, isLogged, user}) {
    return <>
        <div className="uk-width-1-1@m uk-margin">
            <nav className="uk-navbar" data-uk-navbar>
                <a className="uk-navbar-item uk-logo nav__logo" href="#">D <FontAwesomeIcon icon={faGem} className="footer__icon"/>A</a>
                {!logic.isUserLoggedIn && <Login onLogin={onLogin}/>}
                {logic.isUserLoggedIn && user && <Menu user={user} onLogout={onLogout}/>}
            </nav>
        </div>
    </>
}

export default withRouter(Nav)