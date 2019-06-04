import React from 'react';
import './index.scss'

function Header() {
    return (
        <header className="header container">
            <div className="columns">
                <h1 className="column is-6">Cinema And Go
                    <span className="subtitle">Find the closest cinema and go!</span>
                </h1>
                <hr />
            </div>
        </header>
    )
}

export default Header
