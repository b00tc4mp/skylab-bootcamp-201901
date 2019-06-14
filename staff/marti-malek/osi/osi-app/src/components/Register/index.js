import React, { useState } from 'react'
import './index.sass'

function Register({ handleEmailInput, handlePasswordInput, handleNameInput, handleSurnameInput, handlePasswordConfirmInput, handleFormSubmit, onRegister, wheelHandler, goToLogin }) {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    handleNameInput = e => setName(e.target.value)
    handleSurnameInput = e => setSurname(e.target.value)
    handleEmailInput = e => setEmail(e.target.value)
    handlePasswordInput = e => setPassword(e.target.value)
    handlePasswordConfirmInput = e => setPasswordConfirm(e.target.value)

    handleFormSubmit = event => {
        event.preventDefault()

        onRegister(name, surname, email, password, passwordConfirm)
    }

    wheelHandler = e => {
        if (e.cancelable)
            goToLogin()
    }

    return <section className="register"  onWheel={e => wheelHandler(e)}> 
        <form onSubmit={handleFormSubmit} className="register__form">
            <div>
                <input onChange={handleNameInput} className="register__name" name="name" type="text" required></input>
                <label>Name</label>
            </div>
            <div>
                <input onChange={handleSurnameInput} className="register__surname" name="surname" type="text" required></input>
                <label>Surname</label>
            </div>
            <div>
                <input onChange={handleEmailInput} className="register__email" name="email" type="email" required></input>
                <label>Email</label>
            </div>
            <div>
                <input onChange={handlePasswordInput} className="register__password" name="password" type="password" required></input>
                <label>Password</label>
            </div>
            <div>
                <input onChange={handlePasswordConfirmInput} className="register__passwordConfirm" name="passwordConfirm" type="password" required></input>
                <label>Password Confirmation</label>
            </div>
            <button className="register__button">Register</button>
        </form>
        <div className="register__login" onClick={() => goToLogin()}>Swipe right or click here to go to login</div>
    </section>
}

export default Register
