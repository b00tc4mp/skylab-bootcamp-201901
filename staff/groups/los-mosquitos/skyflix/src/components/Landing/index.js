import React from 'react'
import literals from './literals'
import './index.sass'

function Landing({ lang, onLogin, onRegister}) {
    const { title, text, register, login } = literals[lang] //cambiar por lang cuando tengamos el LanguageSelector
    
    return <section className="" onClick={e => e.preventDefault()}>
        <nav className="landing clearfix">
            <img className="float-left" src="" alt="Logo Skyflix"/>
            <a className="float-right btn btn-primary" href="" onClick={() => onLogin()}>{login}</a>
        </nav>
        <header className="landing">
            <h1 className="text-white">{title}</h1>
            <p className="text-white">{text}</p>
            <a className="btn btn-success btn-lg btn-block" href="" onClick={() => onRegister()}>{register}</a>
        </header>
    </section>
}

export default Landing