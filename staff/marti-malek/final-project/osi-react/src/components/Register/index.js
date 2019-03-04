import React, { useState } from 'react'

function Register({ handleEmailInput, handlePasswordInput, handleNameInput, handleSurnameInput, handlePasswordConfirmInput, handleFormSubmit, onRegister }) {

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

    return <section>
        <form onSubmit={handleFormSubmit}>
            <label>Name</label>
            <input onChange={handleNameInput} name="name" type="text" placeholder="John"></input>
            <label>Surname</label>
            <input onChange={handleSurnameInput} name="surname" type="text" placeholder="Doe"></input>
            <label>Email</label>
            <input onChange={handleEmailInput} name="email" type="email" placeholder="something@example.com"></input>
            <label>Password</label>
            <input onChange={handlePasswordInput} name="password" type="password" placeholder="Must have at least 8 characters"></input>
            <label>Password Confirmation</label>
            <input onChange={handlePasswordConfirmInput} name="passwordConfirm" type="password" placeholder="Must have at least 8 characters"></input>
            <button>Register</button>
        </form>
    </section>
}

export default Register
