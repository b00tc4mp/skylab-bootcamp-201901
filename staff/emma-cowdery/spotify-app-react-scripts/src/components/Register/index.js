import React, {Component} from 'react'
import './index.sass'


class Register extends Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '' }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameinput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleLoginButton = event => {
        event.preventDefault()

        this.props.backToLogin()
    }

    handleRegisterFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render() {
        const { handleNameInput, handleSurnameinput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, handleLoginButton, handleRegisterFormSubmit } = this

        return <section className="register">
            <h2>Register</h2>

            <form onSubmit={handleRegisterFormSubmit}>
                <input type="text" name="name" placeholder="name" onChange={handleNameInput} />
                <input type="text" name="surname" placeholder="surname" onChange={handleSurnameinput} />
                <input type="text" name="email" placeholder="email" onChange={handleEmailInput} />
                <input type="password" name="password" placeholder="password" onChange={handlePasswordInput} />
                <input type="password" name="passwordConfirmation" placeholder="password confirmation" onChange={handlePasswordConfirmationInput} />
                <button className="button">Register</button>
            </form>

            <button className="button" onClick={handleLoginButton}>Log In</button>
        </section>
    }
}

export default Register