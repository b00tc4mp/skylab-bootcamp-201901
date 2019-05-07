import React from 'react'
import literals from './literals'

function Register({lang, onRegister, error}) {
    const { title, name, surname, email, password } = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const {
            name: { value: name },
            surname: { value: surname },
            username: { value: username },
            password: { value: password }
        } = e.target

        onRegister(name, surname, username, password)
    }

    return <>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder={name} />
            <input type="text" name="surname" placeholder={surname} />
            <input type="text" name="username" placeholder={email} />
            <input type="password" name="password" placeholder={password} />
            <button>{title}</button>
            <span>{error}</span>
        </form>
    </>
}

export default Register