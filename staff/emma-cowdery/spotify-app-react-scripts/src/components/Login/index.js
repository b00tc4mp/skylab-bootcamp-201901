import React, { Component } from 'react'
import './index.sass'

class Login extends Component {
    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleRegisterButton = event => {
        event.preventDefault()

        this.props.goToRegister()
    }

    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleRegisterButton } = this

        return <section className="login">
            <h2>Login</h2>

            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                <button className="button">Log in</button>
            </form>

            <button className="button" onClick={handleRegisterButton}>Register</button>
        </section>
    }
}

export default Login