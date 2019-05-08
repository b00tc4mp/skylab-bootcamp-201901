import React ,{ Fragment } from 'react'
import literals from './literals'
import logo from '../../logo-skyflix.png'
import './index.sass'

function Landing({ lang, onLogin, onRegister, onLanding}) {
    const { title, text, register, login } = literals[lang] //cambiar por lang cuando tengamos el LanguageSelector
    
    return (
        <Fragment>
        <div className="bg-container" />
        <section className="landing" onClick={e => e.preventDefault()}>
            <nav className="landing__nav clearfix">
                <img onClick={() => onLanding()} className="landing__logo float-left" src={logo} alt="Logo Skyflix"/>
                <a className="float-right btn btn-primary" href="" onClick={() => onLogin()}>{login}</a>
            </nav>
            <header className="landing__header">
                <h1 className="text-white">{title}</h1>
                <p className="text-white">{text}</p>
                <a className="btn btn-success btn-lg btn-block" href="" onClick={() => onRegister()}>{register}</a>
            </header>
        </section>
        </Fragment>
    )
}

export default Landing