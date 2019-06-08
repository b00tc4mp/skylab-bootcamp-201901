import React from 'react'
import literals from './literals'
import './index.css'
import logo from '../../asserts/logo/icon_v2_white.png'

function Register({ lang, onRegister, error }) {
    const { title, subtitle, name, surname, email, password, enter } = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password }
        } = e.target

        onRegister(name, surname, email, password)
    }

    return <section className="bg-register">
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
        <div className="uk-position-center  uk-card uk-card-default uk-card-body card-transparent">
            <h1 className='uk-card-title uk-text-center'>{subtitle}</h1>
            <form className="uk-form-stacked" onSubmit={handleSubmit}>
                <div className="uk-margin">
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-large" id="form-stacked-text" type="text" name="name" placeholder={name} />
                    </div>
                </div>
                <div className="uk-margin">
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-large" id="form-stacked-text" type="text" name="surname" placeholder={surname} />
                    </div>
                </div>
                <div className="uk-margin">
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-large" id="form-stacked-text" type="email" name="email" placeholder={email} />
                    </div>
                </div>
                <div className="uk-margin">
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-large" id="form-stacked-text" type="password" name="password" placeholder={password} />
                    </div>
                </div>
                <button className="uk-button uk-button-default uk-text-bold uk-width-1-1" >{enter}</button>
                <span>{error}</span>
            </form>
        </div>
    </section>
}

export default Register