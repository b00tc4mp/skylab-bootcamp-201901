import React from 'react'
import './index.sass'

function Login({ onLogin, error, goRegister }) {

    function handleSubmit(e) {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        onLogin(email, password)
    }

    return <main className="uk-container uk-container-large container-login uk-background-muted">
        <section>
        <div className="uk-margin">
                <p className="uk-text-large uk-text-muted"> Sign in with your email address</p>
            </div>
            <form  className="uk-form-stacked" onSubmit={handleSubmit}>
            <div className="uk-margin">
                    <input className="uk-input" type="text" name="email" placeholder="email"/>
                </div>
                <div className="uk-margin">
                    <input className="uk-input" type="password" name="password" placeholder="password" />
                </div>
                <div className="uk-margin">
                    <button className="uk-button uk-button-primary uk-width-1-1" >Sign In</button>
                    <span className="uk-form-danger">{error}</span>
                </div>
            </form>
            <button className="uk-button uk-button-default uk-width-1-1 uk-button-large-bottom uk-margin-bottom uk-text-muted" onClick={goRegister}>Sing Up</button>
        </section>
    </main>
}

export default Login