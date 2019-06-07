import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

import Login from '../Login'

function Navbar({ history, onLogin, onLoginError }) {

    const [toggleLogin, setToggleLogin] = useState(false)

    const handleLogout = () => {
        logic.logoutUser()
        history.push('/')
    }

    return (
        <nav class="navbar container" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" onClick={() => history.push('/')}>
                    DEVSLIDES
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item">
                        Home
                </a>
                    <a class="navbar-item">
                        Documentation
                </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                    </a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                        </a>
                            <a class="navbar-item">
                                Jobs
                        </a>
                            <a class="navbar-item">
                                Contact
                        </a>
                            <hr class="navbar-divider" />
                            <a class="navbar-item">
                                Report an issue
                        </a>
                        </div>
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        {logic.isUserLoggedIn ? <div class="buttons">
                            <a class="button is-light" onClick={() => history.push('/Personal/Profile')}>
                                Profile
                            </a>
                            <a class="button is-light " onClick={() => handleLogout()}>
                                Log Out
                            </a>
                        </div>
                            :
                            <div class="buttons">
                                <a class="button is-light" onClick={() => history.push('/register')}>
                                    Sign Up
                            </a>
                                <a class="button is-light " onClick={() => history.push('/login')}>
                                    Log in
                                </a>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)


