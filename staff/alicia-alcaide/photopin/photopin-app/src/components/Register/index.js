import React from 'react'
import literals from './literals'
//import './index.sass'

function Register({ lang, onRegister, error }) {
    const { title, name, surname, email, password } = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password }
        } = e.target

        onRegister(name, surname, email, password)
    }

    return <section className="register">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder={name} defaultValue="Ali"/>
            <input type="text" name="surname" placeholder={surname} defaultValue="YO"/>
            <input type="text" name="email" placeholder={email} defaultValue="ali@mail.com"/>
            <input type="password" name="password" placeholder={password} defaultValue="123"/>
            <button>{title}</button>
            <span>{error}</span>
        </form>
    </section>
}

export default Register