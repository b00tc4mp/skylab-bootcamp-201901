import React from 'react'
import './index.sass'

function Login({ onLogin, error }) {
    
    function handleSubmit(event) {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        onLogin(username, password)
    }

    return <section className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="username" required />
            <input type="password" name="password" placeholder="password" required />
            <button>Login</button>
            <span>{error}</span>
        </form>
    </section>
}

export default Login