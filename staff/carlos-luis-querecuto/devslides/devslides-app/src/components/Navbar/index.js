import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'

import Login from '../Login'

function Navbar({ history, onLogin, onLoginError }) {

    const [togglenav, setToggleNav] = useState(false)

    const handleLogout = () => {
        logic.logoutUser()
        history.push('/')
    }

    return (
        <nav class="navbar is-white navbar-shadow" role="navigation" aria-label="main navigation">
            <div class="container navbar-shadow">
                <div class="navbar-brand">
                    <a class="navbar-item navbarLogo" onClick={() => history.push('/')}>
                        {"</DEVSLIDES>"}
                    </a>

                    <a role="button" onClick={() => setToggleNav(!togglenav)} class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class={"navbar-menu" + (togglenav ? "is-active" : "")}>
                    <div class="navbar-start">
                        <a class="navbar-item lighttext">
                            HOME
                        </a>
                        <a class="navbar-item lighttext">
                            DOCUMENTATION
                        </a>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item">
                            {logic.isUserLoggedIn ? <div class="buttons">
                                <a class="button is-medium boldtext" onClick={() => history.push('/Personal/Profile')}>
                                    Profile
                                </a>
                                <a class="button is-medium boldtext" onClick={() => handleLogout()}>
                                    Log Out
                                </a>
                            </div>
                                :
                                <div class="buttons">
                                    <a class="button is-medium boldtext" onClick={() => history.push('/register')}>
                                        SIGN UP
                                    </a>
                                    <a class="button is-medium  boldtext" onClick={() => history.push('/login')}>
                                        LOG IN
                                    </a>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)


