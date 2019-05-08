import React from 'react'
import literals from './literals'
import logo from '../../logo-skyflix.png'
import './index.sass'

function AppNav({ lang, onLogin, onLanding}) {
    const { login } = literals[lang] //cambiar por lang cuando tengamos el LanguageSelector
    
    return (
        <nav onClick={e => e.preventDefault()} className="clearfix">
            <img onClick={() => onLanding()} className="logo float-left" src={logo} alt="Logo Skyflix"/>
            <a className="float-right btn btn-primary" href="" onClick={() => onLogin()}>{login}</a>
        </nav>
    )
}

export default AppNav