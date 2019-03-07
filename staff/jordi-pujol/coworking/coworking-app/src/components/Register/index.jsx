'use strict'

import React, { Component } from 'react'

class Register extends Component {

    state = { name: '', surname: '', email: '', password: '', passwordConfirm: '' }


    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmInput = event => this.setState({ passwordConfirm: event.target.value })


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirm }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirm)
    }


    render() {

        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput, handleFormSubmit } = this


        return <section className="login">
            <section className="login_content">
                <h2>Welcome back,</h2>
                <form className="login_content-form" onSubmit={handleFormSubmit}>
                    <span>Name</span>
                    <input type="text" onChange={handleNameInput} required autoFocus />
                    <span>Surname</span>
                    <input type="text" onChange={handleSurnameInput} required />
                    <span>email</span>
                    <input type="email" onChange={handleEmailInput} required />
                    <span>Password</span>
                    <input type="password" onChange={handlePasswordInput} required />
                    <span>Confim password</span>
                    <input type="password" onChange={handlePasswordConfirmInput} required />
                    <p className="forgot-pass">Forgot password?</p>
                    <button className="submit">Sign Up</button>
                </form>
            </section>
            <section className="login_subcontent">
                <div className="img__text m--up">
                    <h2>New here?</h2>
                    <p>Sign up and discover great amount of new opportunities!</p>
                </div>
                <div className="img__text m--in">
                    <h2>One of us?</h2>
                    <p>If you already has an account, just sign in. We've missed you!</p>
                </div>
                <div className="img__btn">
                    <span>Sign Up</span>
                </div>
            </section>
        </section>
    }
}
export default Register