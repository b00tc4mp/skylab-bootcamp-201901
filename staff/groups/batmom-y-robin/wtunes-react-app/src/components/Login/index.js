import React from 'react'
import './index.sass' 

function Login({ onLogin, error }) {

    function handleSubmit(e) {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username, password)
    }

    return <main className="mainlogin">
        <section className="login column is-4-desktop is-4-tablet is-10-mobile is-one-fifth">
            <div className="has-text-centered field">
                <h2 className="title is-2">Weatunes</h2>
                <p className="subtitle"> Sign in with your email address</p>
            </div >
            <form onSubmit={handleSubmit}>
                <input className="input field" type="text" name="username" placeholder="email"/>
                <input className="input field" type="password" name="password" placeholder="password" />
                <button className="button is-fullwidth is-primary">Sign In</button>
                <span className="help is-danger">{error}</span>
            </form>
        </section>
    </main> 
}

export default Login