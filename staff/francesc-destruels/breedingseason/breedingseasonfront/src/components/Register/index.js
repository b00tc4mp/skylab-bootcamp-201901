import React from 'react'
import './index.sass'

function Register({ onRegister, error }) {

    function handleSubmit(e) {
        e.preventDefault()

        const {
            nickname: { value: name },
            age: { value: age },
            email: { value: email },
            password: { value: password }
        } = e.target

        onRegister(name, age, email, password)
    }

    return <section className="register">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nickname" placeholder="Nickname" />
            <input type="number" name="age" placeholder="Age" />
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button>Register</button>
            <span>{error}</span>
        </form>
    </section>
}

export default Register