import React, { useState } from 'react'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'

export default withRouter(function Login(props) {
    const [emailOrUsername, setEmailOrUsername] = useState()
    const [password, setPassword] = useState()

    const handleEmailOrUsernameChange = emailOrUsername => setEmailOrUsername(emailOrUsername.target.value)

    const handlePasswordChange = password => setPassword(password.target.value)

    const handleLoginSubmit =  () => {
        logic.authenticateUser(emailOrUsername, password)
            .then(token => {
                if (token.token) props.history.push('/event-categories')
            })
    }

    const handleGoToRegister = () => {
        props.history.push('/register')
    }

    return (
        <main className="login-page">
            <div className="login-panel">
                <div className="login-panel__box">
                    <h1>LOGO</h1>
                    <form onSubmit={handleLoginSubmit} className='login-panel__form'>
                        <div className="login-panel__row">
                            <p className='login-panel__input-title'>Email or Username</p>
                            <input type="text" placeholder="email or username" value={emailOrUsername} onChange={handleEmailOrUsernameChange} className='login-panel__input'></input>
                        </div>
                        <div className="login-panel__row">
                            <p className='login-panel__input-title'>Password</p>
                            <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} className='login-panel__input'></input>
                        </div>
                        <button className='login-panel__login-button'>LOGIN</button>
                    </form>
                    <div className='login-panel__register'>
                        <p className='login-panel__register-text'>Not a user?</p>
                        <button onClick={handleGoToRegister} className='login-panel__register-button'>sign up</button>    
                    </div>
                </div>
            </div>
        </main>
    )
})