'use strict'

import React, { Component } from 'react'
import Feedback from '../Feedback'

class Login extends Component {
    state = { name: null, surname: null, email: null, password: null }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password }, props: { onRegister } } = this

        onRegister(name, surname, email, password)
    }

    render() {
        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handleFormSubmit, props: { title, feedback } } = this

        return <section className="register">
            <h2>{title}</h2>

            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" onChange={handleNameInput} />
                <input type="text" name="surname" onChange={handleSurnameInput} />
                <input type="text" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                
                <button>Register</button>
            </form>

            {feedback && <Feedback message={feedback} level="warn" />}
        </section>
    }
}

export default Login