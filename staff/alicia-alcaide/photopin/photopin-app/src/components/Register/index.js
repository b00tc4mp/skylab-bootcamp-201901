import React from 'react'
import literals from './literals'
import './index.css'
import logo from '../../asserts/logo/icono_v2.png'

function Register({ lang, onRegister, error }) {
    const { title, subtitle, name, surname, email, password } = literals[lang]

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
            <h2>{subtitle}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder={name} />
                <input type="text" name="surname" placeholder={surname} />
                <input type="email" name="email" placeholder={email} />
                <input type="password" name="password" placeholder={password} />
                <button>{title}</button>
                <span>{error}</span>
            </form>
        </div>
    </section>
}

export default Register