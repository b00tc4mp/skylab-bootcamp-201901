import React, { useState } from 'react'
import './index.sass'

function Login({ handleEmailInput, handlePasswordInput, handleFormSubmit, onLogin, goToRegister }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    handleEmailInput = e => setEmail(e.target.value)
    handlePasswordInput = e => setPassword(e.target.value)

    handleFormSubmit = event => {
        event.preventDefault()

        onLogin(email, password)
    }

    window.onwheel = e => {
        e.preventDefault();

        if (e.deltaX) {
            setTimeout(() => goToRegister(), 500)
        } else {
        }
    }



    return <section className="login">
        {/* <div className="login__image"></div> */}
        <form className="login__form" onSubmit={handleFormSubmit}>
            <div>
                <input onChange={handleEmailInput} className="login__name" name="email" type="email" required></input>
                <label>Email</label>
            </div>
            <div>
                <input onChange={handlePasswordInput} className="login__password" name="password" type="password" required></input>
                <label>Password</label>
            </div>
            <button className="login__button">Login</button>
        </form>
    </section>
}

export default Login
