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
    <div>

        <h2 className='login__title'>Login</h2>
        <form className='login__form' onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="username" required />
            <input type="password" name="password" placeholder="password" required />
            <button className='login__form-button'>Login</button>
            {error && <span className='login__form-error'>{error}</span>}
        </form>
    </div>
    </section>
}

export default Login