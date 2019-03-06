import React, { useState } from 'react'
import './index.sass'

function Register({ handleEmailInput, handlePasswordInput, handleNameInput, handleSurnameInput, handlePasswordConfirmInput, handleFormSubmit, onRegister, goToLogin }) {

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

    window.onwheel = e => {
        e.preventDefault();

        if (e.ctrlKey) {
            // Your zoom/scale factor
            // scale -= e.deltaY * 0.01;
        } else {
            // Your trackpad X and Y positions
            // posX -= e.deltaX * 2;
            // posY -= e.deltaY * 2;
            setTimeout(() => goToLogin(), 500)
        }
    }

    return <section className="register">
        {/* <div className="register__image"></div> */}
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
    </section>
}

export default Register
