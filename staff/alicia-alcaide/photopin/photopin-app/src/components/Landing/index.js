import React from 'react'
import literals from './literals'
import logo from '../../assets/logo/icon_v2_white.png'
import './index.css'

function Landing({ lang, onRegister, onLogin }) {

    const { title, subtitle, register, login } = literals[lang]

    return <section className="landing bg-landing">
        <div className="uk-position-top">
            <nav className="uk-navbar-container  uk-navbar-transparent" data-uk-navbar>
                <div className="uk-margin-top">
                    <ul className="uk-navbar-nav">
                        <li className="uk-margin-left uk-margin-right"><img src={logo} alt="logo-PhotoPin" width="60" height="60" /></li>
                        <li className="uk-margin-top uk-margin-left"><h1 className="white-title">{title}</h1></li>
                    </ul>
                </div>
            </nav>
        </div>

        <div className="uk-position-center">
            <h1 className='uk-tile uk-text-center white-title'>{subtitle}</h1>
            <section>
                <button className="uk-button white-button uk-text-bold uk-width-1-1 uk-margin-medium-bottom" onClick={() => onRegister()}>{register}</button>
                <button className="uk-button white-button uk-text-bold uk-width-1-1" onClick={() => onLogin()}>{login}</button>
            </section>
        </div>
    </section>
}

export default Landing