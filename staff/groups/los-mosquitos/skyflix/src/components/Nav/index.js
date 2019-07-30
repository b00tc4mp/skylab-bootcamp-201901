import React from 'react'
import literals from './literals'
import logo from '../../logo-skyflix.png'
import './index.sass'

function Nav({ lang, onList, onProfile, onLogout, onHome }) {
    const { list, profile, logout, home } = literals['en-US'] 
    
    return <>
    <nav className="navbar" onClick={e => e.preventDefault()}>
        <a className="navbar-brand"><img className="logo" src={logo} alt="Logo"/></a>
        <a className="btn-sm btn-danger" href="" onClick={() => onLogout()}>{logout}</a>
    </nav>
    <nav className ="navbar" onClick={e => e.preventDefault()}>
        <a className="nav-link text-white" href="" onClick={() => onHome()}>{home}</a>
        <a className="nav-link text-white" href="" onClick={() => onList()}>{list}</a>
        <a className="nav-link text-white disabled" href="" onClick={() => onProfile()}>{profile}</a>
    </nav>
    </>
}

export default Nav