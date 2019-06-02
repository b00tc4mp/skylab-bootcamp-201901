import React from 'react'


function Login({ onLogin, error, goRegister }) {

    function handleSubmit(e) {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        onLogin(email, password)
    }

    return <section className="login">
        <h2 className="title is-2">Dashboard Issues</h2>
        <p className="subtitle">Sign In with your email address</p>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button>Sign In</button>
            <span>{error}</span>
        </form>
        <button onClick={goRegister}>Sing Up</button>
    </section>
}

export default Login