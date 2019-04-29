import React from 'react'

function Login({ onLogin, error }) {

    function handleSubmit(e) {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username, password)
    }

    return <section className="login">
        <h2>Wetunes</h2>
        <p>Sign in  with you email address</p>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button>Sing in</button>
            <span>{error}</span>
        </form>
    </section>
}

export default Login