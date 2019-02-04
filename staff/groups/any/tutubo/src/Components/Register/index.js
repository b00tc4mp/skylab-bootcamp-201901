'use strict'

import React, {Component} from 'react'
import './index.sass'

class Register extends Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '' }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleFromSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render() {
        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, handleFromSubmit } = this

        return <section>
            <h2>Register</h2>
            <form onSubmit={handleFromSubmit}>
                <input name='name' type='text' placeholder='name' onChange={handleNameInput} />
                <input name='surname' type='text' placeholder='surname' onChange={handleSurnameInput} />
                <input name='email' type='text' placeholder='email' onChange={handleEmailInput} />
                <input name='password' type='password' placeholder='password' onChange={handlePasswordInput} />
                <input name='passwordConfirmation' type='password' placeholder='confirm password' onChange={handlePasswordConfirmationInput} />
                <button>Register</button>
            </form>
        </section> 
    }
}

export default Register