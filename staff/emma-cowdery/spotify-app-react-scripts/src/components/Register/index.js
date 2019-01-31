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

        // return <section className="register">
        //     <h2>Register</h2>

        //     <form onSubmit={handleRegisterFormSubmit}>
        //         <input type="text" name="name" placeholder="name" onChange={handleNameInput} />
        //         <input type="text" name="surname" placeholder="surname" onChange={handleSurnameinput} />
        //         <input type="text" name="email" placeholder="email" onChange={handleEmailInput} />
        //         <input type="password" name="password" placeholder="password" onChange={handlePasswordInput} />
        //         <input type="password" name="passwordConfirmation" placeholder="password confirmation" onChange={handlePasswordConfirmationInput} />
        //         <button className="button">Register</button>
        //     </form>

        //     <button className="button" onClick={handleLoginButton}>Log In</button>
        // </section>

        return <section className="hero is-success is-fullheight">
        <div className="hero-body register">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title">Register</h3>
                    <p className="subtitle">Please register to proceed.</p>
                    <div className="box">
                        <form onSubmit={handleRegisterFormSubmit}>
                            <div className="field">
                                <div className="control">
                                    <p>Name:</p>
                                    <input className="input is-small" type="text" name="name" placeholder="name" onChange={handleNameInput} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <p>Surname:</p>
                                    <input className="input is-small" type="text" name="surname" placeholder="surname" onChange={handleSurnameinput} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <p>E-mail:</p>
                                    <input className="input is-small" type="text" name="email" placeholder="e-mail" onChange={handleEmailInput} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <p>Password:</p>
                                    <input className="input is-small" type="password" name="password" placeholder="password" onChange={handlePasswordInput} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <p>Password confirmation:</p>
                                    <input className="input is-small" type="password" name="passworsConfirmation" placeholder="password confirmation" onChange={handlePasswordConfirmationInput} />
                                </div>
                            </div>
                            <button className="button is-block is-info is-medium is-fullwidth">Register</button>
                        </form>
                    </div>
                    <p onClick={handleLoginButton}>Login</p>
                </div>
            </div>
        </div>
        </section>
    }
}

export default Register