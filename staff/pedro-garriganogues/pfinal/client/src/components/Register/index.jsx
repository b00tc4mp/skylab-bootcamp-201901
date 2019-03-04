

import React, { Component } from 'react'
import Feedback from '../Feedback'

class Login extends Component {
    state = { name: null, surname: null, email: null, password: null, passwordConfirmation: null }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render() {
        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handleFormSubmit, handlePasswordConfirmationInput, props: { feedback } } = this

        return <section className="register">

            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" onChange={handleNameInput} placeholder="name" />
                <input type="text" name="surname" onChange={handleSurnameInput} placeholder="surname" />
                <input type="text" name="email" onChange={handleEmailInput} placeholder="email" />
                <input type="password" name="password" onChange={handlePasswordInput} placeholder="password" />
                <input type="password" name="passwordConfirmation" onChange={handlePasswordConfirmationInput} placeholder="confirm password" />

                <button>Register</button>
            </form>

            {feedback && <Feedback message={feedback} level="warn" />}
        </section>
    }
}

export default Login