import React, { Component } from 'react'

class Login extends Component {
    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    render() {
        const { handleFormSubmit, handleEmailInput, handlePasswordInput } = this
        return (
            <section className="login">
                <h1 className="title">Login</h1>

                <p className="subtitle"></p>
                <hr />

                <form className="login__form" onSubmit={handleFormSubmit} autoComplete="off">
                    <input className="input" type="email" name="email" onChange={handleEmailInput} placeholder="email" autoComplete="off" autoCorrect="off" required />
                    <input className="input" type="password" name="password" onChange={handlePasswordInput} placeholder="password"  autoComplete="off" autoCorrect="off" required />
                    <button className="button is-link">Login</button>
                </form>
            </section>
        )
    }
}
export default Login