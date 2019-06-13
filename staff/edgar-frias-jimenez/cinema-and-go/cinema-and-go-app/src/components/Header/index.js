import React from 'react'
import { Link } from 'react-router-dom'
import appLogic from '../../logic'

import './index.scss'

function Header() {
    const handleLogout = () => {
        appLogic.logoutUser()
        window.location.reload()
    }

    return (
        <header className="header container">
            <div className="columns is-mobile">
                <h1 className="column is-12">
                    <Link to="/">Cinema And Go</Link>
                    <span className="subtitle">Find the closest cinema and go!</span>
                </h1>
                <div className="logout-container" onClick={handleLogout}>
                    <span className="logout-container__button">
                        <i className="fas fa-power-off"></i>
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header
