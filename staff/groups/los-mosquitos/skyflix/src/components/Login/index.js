import React from 'react'
import literals from './literals'

function Login({ lang, onLogin, error }) {
    const { title, email, password } = literals[lang]
    function handleSubmit(event) {

        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        onLogin(username, password)
    }

    return <>
        <div className="bg-container" />
        <section>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder={email} />
                <input type='password' name='password' placeholder={password} />
                <button>{title}</button>
            </form>
            <span>{error}</span>
        </section>
    </>
}

export default Login