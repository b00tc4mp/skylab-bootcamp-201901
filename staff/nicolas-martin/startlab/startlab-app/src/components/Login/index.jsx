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

                <p>Lorem fistrum amatomaa qué dise usteer amatomaa fistro me cago en tus
                muelas qué dise usteer a peich sexuarl. Pecador ahorarr sexuarl va usté
                muy cargadoo pecador. Ese pedazo de diodeno la caidita no puedor al
                ataquerl qué dise usteer te va a hasé pupitaa.</p>
                <hr />

                <form className="login__form" onSubmit={handleFormSubmit} autoComplete="off">
                    <input className="input" type="email" name="email" onChange={handleEmailInput} placeholder="email" autoComplete="off" required />
                    <input className="input" type="password" name="password" onChange={handlePasswordInput} placeholder="password" required />
                    <button className="button is-info">Login</button>
                </form>
            </section>
        )
    }
}
export default Login