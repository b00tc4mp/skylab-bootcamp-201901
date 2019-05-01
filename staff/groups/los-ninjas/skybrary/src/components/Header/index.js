import React from 'react'
import './index.scss'

function Header(){
    return <header className="great-vibes header">
        <div className="container">
            <h1>Skybrary</h1>
            <hr />
        </div>
            <button className="button is-pulled-left">Log Out</button>
    </header>
}

export default Header
