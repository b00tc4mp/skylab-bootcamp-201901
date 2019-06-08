import React from 'react'
import literals from './literals'
import logo from '../../asserts/logo/icon_v2_white.png'
import './index.css'

function Login({ lang, onLogin, error }) {
    const { title, subtitle, email, password, enter } = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username, password)
    }

    return <section className="bg-login">
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
        <div className="uk-position-center uk-card uk-card-default uk-card-body card-transparent">
            <h1 className='uk-card-title uk-text-center'>{subtitle}</h1>
            <form className="uk-form " onSubmit={handleSubmit}>
                <div className="uk-margin">
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-large" id="form-stacked-text" type="email" name="username" placeholder={email} value="ali@mail.com" />
                    </div>
                </div>
                <div className="uk-margin">
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-large" id="form-stacked-text" type="password" name="password" placeholder={password} value="123" />
                    </div>
                </div>

                <button className="uk-button uk-button-default uk-text-bold uk-width-1-1" >{enter}</button>
                <span>{error}</span>
            </form>
        </div>
    </section>
}

export default Login









{/* <section className="login">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" name="username" placeholder={email} />
            <input type="password" name="password" placeholder={password} />
            <button>{title}</button>
            <span>{error}</span>
        </form>
    </section> */}