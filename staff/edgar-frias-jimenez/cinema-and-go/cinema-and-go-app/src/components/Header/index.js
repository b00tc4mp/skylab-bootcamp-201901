import React from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

function Header() {
    return (
        <header className="header container">
            <div className="columns is-mobile">
                <h1 className="column is-12">
                    <Link to="/">Cinema And Go</Link>
                    <span className="subtitle">Find the closest cinema and go!</span>
                </h1>
                <hr />
            </div>
        </header>
    )
}

export default Header
