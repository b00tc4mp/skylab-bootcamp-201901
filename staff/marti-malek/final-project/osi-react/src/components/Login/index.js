import React, { useState } from 'react'
import './index.sass'

function Login({ handleEmailInput, handlePasswordInput, handleFormSubmit, onLogin }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    handleEmailInput = e => setEmail(e.target.value)
    handlePasswordInput = e => setPassword(e.target.value)

    handleFormSubmit = event => {
        event.preventDefault()

        onLogin(email, password)
    }



    return <section>
        <form className="login" onSubmit={handleFormSubmit}>
            <label>Email</label>
            <input onChange={handleEmailInput} className="login__name" name="email" type="email" placeholder="something@example.com"></input>
            <label>Password</label>
            <input onChange={handlePasswordInput} className="login__password" name="password" type="password" placeholder="Must have at least 8 characters"></input>
            <button>Login</button>
        </form>
    </section>
}

export default Login
