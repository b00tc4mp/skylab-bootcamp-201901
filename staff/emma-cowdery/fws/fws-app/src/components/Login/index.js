import React, { useState } from 'react'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'
import Feedback from '../Feedback'

export default withRouter(function Login(props) {
    const [emailOrUsername, setEmailOrUsername] = useState()
    const [password, setPassword] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState() 

    const handleEmailOrUsernameChange = emailOrUsername => setEmailOrUsername(emailOrUsername.target.value)

    const handlePasswordChange = password => setPassword(password.target.value)

    const handleLoginSubmit =  () => {
        try {
            logic.authenticateUser(emailOrUsername, password)
            .then(token => {
                if (token.token) props.history.push('/event-categories')
            })
            .catch(err => {
                setFeedback(err.message)
                setLevel('alert')
                setType('normal')
            })
        } catch ({message}) {
            setFeedback(message)
            setLevel('alert')
            setType('normal')
        }
    }

    const handleGoToRegister = () => {
        props.history.push('/register')
    }

    return (
        <main className="login-page">
            <div className="login-panel">
                <div className="login-panel__box">
                    <img width='150em' alt='logo' src='images/logo.png'></img>
                    <form onSubmit={handleLoginSubmit} className='login-panel__form'>
                        <div className="login-panel__row">
                            <p className='login-panel__input-title'>Email or Username</p>
                            <input type="text" placeholder="email or username" value={emailOrUsername} onChange={handleEmailOrUsernameChange} className='login-panel__input'></input>
                        </div>
                        <div className="login-panel__row">
                            <p className='login-panel__input-title'>Password</p>
                            <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} className='login-panel__input'></input>
                        </div>
                        {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
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