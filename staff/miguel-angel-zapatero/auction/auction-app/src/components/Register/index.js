import React, { useState } from 'react'

function Register({ onRegister }) {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()

        onRegister(name, surname, email, password, confirmPassword)
    }

    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" required onChange={e => setName(e.target.value)}/>
            <input type="text" name="surname" placeholder="surname" required onChange={e => setSurname(e.target.value)}/>
            <input type="email" name="email" placeholder="email" required onChange={e => setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="password" required onChange={e => setPassword(e.target.value)}/>
            <input type="password" name="confirmPassword" placeholder="confirm password" required onChange={e => setConfirmPassword(e.target.value)}/>
            <button>Sign up</button>
        </form>
    </>
}

export default Register