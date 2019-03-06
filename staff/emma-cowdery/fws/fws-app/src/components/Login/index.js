import React, { useState } from 'react'
import logic from '../../logic';
import { withRouter, Route, Redirect } from 'react-router-dom'

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
                    <form onSubmit={handleLoginSubmit}>
                    <div className="login-panel__row">
                        <p>Email or Username</p>
                        <input type="text" placeholder="email or username" value={emailOrUsername} onChange={handleEmailOrUsernameChange}></input>
                    </div>
                    <div className="login-panel__row">
                        <p>Password</p>
                        <input type="password" placeholder="password" value={password} onChange={handlePasswordChange}></input>
                    </div>
                    <button>Login</button>
                    </form>
                    <div>
                        <p>Not a user?</p>
                        <button onClick={handleGoToRegister}>Register</button>    
                    </div>
                </div>
                
            </div>
        </main>
    )
})