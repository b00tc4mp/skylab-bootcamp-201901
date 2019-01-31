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

        // return <section className="login">
        //     <h2>Login</h2>

        //     <form onSubmit={handleFormSubmit}>
        //         <input type="text" name="email" onChange={handleEmailInput} />
        //         <input type="password" name="password" onChange={handlePasswordInput} />
        //         <button className="button">Log in</button>
        //     </form>

        //     <button className="button" onClick={handleRegisterButton}>Register</button>
        // </section>


        return <section className="hero is-success is-fullheight">
            <div className="hero-body login">
                <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <h3 className="title">Login</h3>
                        <p className="subtitle">Please login to proceed.</p>
                        <div className="box">
                            <form onSubmit={handleFormSubmit}>
                                <div className="field">
                                    <div className="control">
                                        <p>E-mail:</p>
                                        <input className="input is-medium" type="text" name="email" placeholder="e-mail" onChange={handleEmailInput} />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <p>Password:</p>
                                        <input className="input is-medium" type="password" name="password" placeholder="password" onChange={handlePasswordInput} />
                                    </div>
                                </div>
                                <button className="button is-block is-info is-medium is-fullwidth">Login</button>
                            </form>
                        </div>
                        <p onClick={handleRegisterButton}>Register</p>
                    </div>
                </div>
            </div>
        </section>
    }
}

export default Login