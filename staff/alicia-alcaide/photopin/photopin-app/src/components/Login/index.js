import React from 'react'
import literals from './literals'
//import './index.sass'

function Login({ lang, onLogin, error }) {
    const { title, email, password } = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username, password)
    }

    return <section className="login">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder={email} />
            <input type="password" name="password" placeholder={password} />
            <button>{title}</button>
            <span>{error}</span>
        </form>
    </section>
}

export default Login