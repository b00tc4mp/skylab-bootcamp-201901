import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import literals from './literals'
import logo from '../../asserts/logo/icono_v2.png'
import './index.css'

function Landing({ lang, onRegister, onLogin }) {

    const { title, subtitle, register, login } = literals[lang]

    return <section className="bg-landing">
        <div className="uk-position-top">
            <nav class="uk-navbar-container  uk-navbar-transparent" data-uk-navbar>
                <div class="uk-margin-top">
                    <ul class="uk-navbar-nav">
                        <li class="uk-margin-left uk-margin-right"><img src={logo} alt="logo-PhotoPin" width="60" height="60" /></li>
                        <li class="uk-margin-top uk-margin-left"><h1>{title}</h1></li>
                    </ul>
                </div>
            </nav>
        </div>

        <div className="uk-position-center">
            <h1 className='landing__title'>{subtitle}</h1>
            <section className='landing__buttons'>
                <button className='landing__button' onClick={() => onRegister()}>{register}</button>
                <button className='landing__button' onClick={() => onLogin()}>{login}</button>
            </section>
        </div>
    </section>
}

export default Landing