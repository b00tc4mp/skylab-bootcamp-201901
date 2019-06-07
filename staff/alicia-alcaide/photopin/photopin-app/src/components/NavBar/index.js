import React from 'react'
import literals from './literals.js'
import logic from '../../logic'
import logo from '../../asserts/logo/icono_v2.png'

function NavBar({ lang, onLogout }) {

    function handleLogout(e) {
        e.preventDefault()
        onLogout()
    }

    const { title, logout, home } = literals[lang]

    return <>
        <div className="uk-position-top">
            <nav class="uk-navbar-container  uk-navbar-transparent" data-uk-navbar>
                <div class="uk-margin-top">
                    <ul class="uk-navbar-nav">
                        <li class="uk-margin-left uk-margin-right"><img src={logo} alt="logo-PhotoPin" width="60" height="60" /></li>
                        <li class="uk-margin-top uk-margin-left"><h1>{title}</h1></li>
                    </ul>
                </div>
                <div class="uk-navbar-right">
                    <ul class="uk-navbar-nav">
                        <li class="uk-margin-top uk-margin-right uk-active"><a href="#">{home}</a></li>
                        {logic.isUserLoggedIn && <li class="uk-margin-top"><a onClick={handleLogout}>{logout}</a></li>}
                    </ul>
                </div>
            </nav>
        </div>
    </>
}

export default NavBar