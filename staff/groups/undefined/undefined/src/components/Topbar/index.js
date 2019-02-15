import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import logic from '../../logic';

import './index.sass'

function Topbar({ onGoToHome, onGoToFavorites, onLogout, onGoToRegister, onGoToLogin }) {
    return <nav className="topbar navbar is-fullwidth" role="navigation" aria-label="main navigation">
        <div className="topbar__inner container inner-container">
            <div className="navbar-brand">
                <a className="navbar-item" onClick={onGoToHome} href="#">
                    <span className="logo">UNDEFINED<span className="films">films</span></span>
                </a>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <Route path='/' render={() => !logic.userLoggedIn && <button className="button is-info is-outlined" onClick={onGoToRegister}>Register</button>} />
                        <Route path='/' render={() => !logic.userLoggedIn && <button className="button is-primary is-outlined" onClick={onGoToLogin}>Login</button>} />
                        <Route path='/' render={() => logic.userLoggedIn && <button className="button is-light" onClick={onLogout}>Logout</button>} />
                        <Route path='/' render={() => logic.userLoggedIn && <button className="button is-light" onClick={onGoToFavorites}>Favorites</button>} />
                    </div>
                </div>
            </div>
        </div>
    </nav>
}

export default Topbar