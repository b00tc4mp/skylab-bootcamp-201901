import React from 'react'
import literals from './literals'

function Nav({ lang, onList, onProfile, onLogout }) {
    const { list, profile, logout } = literals['en-US'] 
    
    return <nav className="home__menu" onClick={e => e.preventDefault()}>
        <img className="logo" src="" alt="Logo Skyflix"/>
        <a href="" onClick={() => onList()}>{list}</a>
        <a href="" onClick={() => onProfile()}>{profile}</a>
        <a href="" onClick={() => onLogout()}>{logout}</a>
    </nav>
}

export default Nav