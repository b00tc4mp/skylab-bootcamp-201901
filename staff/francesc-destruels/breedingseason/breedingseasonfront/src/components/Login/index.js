import React from 'react'
import './index.sass'

function Login({ onLogin, error }) {

    function handleSubmit(e) {
        e.preventDefault()

        const nicknameOEmail = e.target.nicknameOEmail.value
        const password = e.target.password.value

        onLogin(nicknameOEmail, password)
    }

    return <section className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nicknameOEmail" placeholder="Nickname or Email" />
            <input type="password" name="password" placeholder="Password" />
            <button>Login</button>
            <span>{error}</span>
        </form>
    </section>
}

export default Login