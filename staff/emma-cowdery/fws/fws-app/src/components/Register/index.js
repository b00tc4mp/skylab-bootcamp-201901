import React, { useState } from 'react'
import logic from '../../logic'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import Feedback from '../Feedback'

export default withRouter( function Register(props) {
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState() 

    const handleNameChange = name => setName(name.target.value)

    const handleSurnameChange = surname => setSurname(surname.target.value)

    const handleEmailChange = email => setEmail(email.target.value)

    const handleUsernameChange = username => setUsername(username.target.value)

    const handlePasswordChange = password => setPassword(password.target.value)

    const handlePasswordConfirmationChange = passwordConfirmation => setPasswordConfirmation(passwordConfirmation.target.value)

    const handleRegisterSubmit = () => {
        try {
            logic.registerUser(name, surname, email, username, password, passwordConfirmation)
            .then(id => {
                if (id) props.history.push('/login')
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

    const handleGoToLogin = () => {
        props.history.push('/login')
    }

    return (
        <main className="register-page">
            <div className="register-panel">
                <div className="register-panel__box">
                    <h1>LOGO</h1>
                    <form onSubmit={handleRegisterSubmit} className='login-panel-form'>
                        <div className="register-panel__row">
                            <p className='register-panel__input-title'>Name</p>
                            <input type="text" placeholder="name" value={name} onChange={handleNameChange} className='register-panel__input'></input>
                        </div>
                        <div className="register-panel__row">
                            <p className='register-panel__input-title'>Surname</p>
                            <input type="text" placeholder="surname" value={surname} onChange={handleSurnameChange} className='register-panel__input'></input>
                        </div>
                        <div className="register-panel__row">
                            <p className='register-panel__input-title'>Email</p>
                            <input type="text" placeholder="email" value={email} onChange={handleEmailChange} className='register-panel__input'></input>
                        </div>
                        <div className="register-panel__row">
                            <p className='register-panel__input-title'>Username</p>
                            <input type="text" placeholder="username" value={username} onChange={handleUsernameChange} className='register-panel__input'></input>
                        </div>
                        <div className="register-panel__row">
                            <p className='register-panel__input-title'>Password</p>
                            <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} className='register-panel__input'></input>
                        </div>
                        <div className="register-panel__row">
                            <p className='register-panel__input-title'>Password Confirmation</p>
                            <input type="password" placeholder="passwordConfirmation" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} className='register-panel__input'></input> 
                        </div>
                        {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
                        <button className='register-panel__register-button'>REGISTER</button>
                    </form>
                    <div className='register-panel__login'>
                        <p className='register-panel__login-text'>Already a user?</p>
                        <button onClick={handleGoToLogin} className='register-panel__login-button'>sign in</button>    
                    </div>
                </div> 
            </div>
        </main>
    )
})