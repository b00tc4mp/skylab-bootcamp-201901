import React, { useState } from 'react'
import logic from '../../logic'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'

export default withRouter( function Register(props) {
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()

    const handleNameChange = name => setName(name.target.value)

    const handleSurnameChange = surname => setSurname(surname.target.value)

    const handleEmailChange = email => setEmail(email.target.value)

    const handleUsernameChange = username => setUsername(username.target.value)

    const handlePasswordChange = password => setPassword(password.target.value)

    const handlePasswordConfirmationChange = passwordConfirmation => setPasswordConfirmation(passwordConfirmation.target.value)

    const handleRegisterSubmit = () => {
        logic.registerUser(name, surname, email, username, password, passwordConfirmation)
            .then(id => {
                if (id) props.history.push('/login')
            })
    }

    const handleGoToLogin = () => {
        props.history.push('/login')
    }

    return (
        <main className="register-page">
            <div className="register-panel">
                <div className="register-panel__box">
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="register-panel__row">
                            <p>Name</p>
                            <input type="text" placeholder="name" value={name} onChange={handleNameChange}></input>
                        </div>
                        <div className="register-panel__row">
                            <p>Surname</p>
                            <input type="text" placeholder="surname" value={surname} onChange={handleSurnameChange}></input>
                        </div>
                        <div className="register-panel__row">
                            <p>Email</p>
                            <input type="text" placeholder="email" value={email} onChange={handleEmailChange}></input>
                        </div>
                        <div className="register-panel__row">
                            <p>Username</p>
                            <input type="text" placeholder="username" value={username} onChange={handleUsernameChange}></input>
                        </div>
                        <div className="register-panel__row">
                            <p>Password</p>
                            <input type="password" placeholder="password" value={password} onChange={handlePasswordChange}></input>
                        </div>
                        <div className="register-panel__row">
                            <p>Password Confirmation</p>
                            <input type="password" placeholder="passwordConfirmation" value={passwordConfirmation} onChange={handlePasswordConfirmationChange}></input> 
                        </div>
                        <button>Register</button>
                    </form>
                    <div>
                        <p>Already a user?</p>
                        <button onClick={handleGoToLogin}>Login</button>    
                    </div>
                </div>
                
            </div>
        </main>
    )
})