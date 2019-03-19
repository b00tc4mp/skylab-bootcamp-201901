import React, { useState, useRef, useEffect } from 'react'
import './index.sass'

function Login({ handleEmailInput, handlePasswordInput, handleFormSubmit, onLogin, goToRegister, wheelHandler, MouseWheelHandler }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let login = useRef()

    useEffect(() => {

    }, [login])

    handleEmailInput = e => setEmail(e.target.value)
    handlePasswordInput = e => setPassword(e.target.value)

    handleFormSubmit = event => {
        event.preventDefault()

        onLogin(email, password)
    }

    wheelHandler = e => {
        if (e.cancelable)
            goToRegister()
    }

    return <section className="login" ref={login} onWheel={(e) => wheelHandler(e)}>
    {
        login && 
        <form className="login__form" onSubmit={handleFormSubmit}>
            <div>
                <input onChange={handleEmailInput} id="email" className="login__name" name="email" type="email" required></input>
                <label>Email</label>
            </div>
            <div>
                <input onChange={handlePasswordInput} id="password" className="login__password" name="password" type="password" required></input>
                <label>Password</label>
            </div>
            <button className="login__button">Login</button>
        </form>
    }
    <div className="login__register" onClick={() => goToRegister()}>Swipe left or click here to go to register</div>
    </section>
}

export default Login
