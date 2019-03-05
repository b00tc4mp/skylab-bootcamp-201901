'use strict'

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

        const { handleEmailInput, handlePasswordInput, handleFormSubmit } = this

        return <section className="login">
                <section className="login_content">
                    <h2>Welcome back,</h2>
                    <form className="login_content-form" onSubmit={handleFormSubmit}>
                        <span>Email</span>
                        <input type="text" autoFocus onChange={handleEmailInput} required />
                        <span>Password</span>
                        <input type="password" onChange={handlePasswordInput} required />
                        <p className="contentforgot-pass">Forgot password?</p>
                        <button className="submit">Sign In</button>
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

export default Login