'use strict'

import React, { Component } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'
import { withRouter, Link } from 'react-router-dom'
import './index.sass'

class Login extends Component {
    state = { email: '', password: '', feedback: null }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password } } = this

        try {
            logic.logInUser(email, password)
                .then(() => {
                    this.setState({ feedback: '' })
                    this.props.history.push('/')
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit } = this

        return <section className="login">
            <div className="login__content">
                <img className="login__img" src="/images/logoplaceholder.png"></img>
                <form className="login__form" onSubmit={handleFormSubmit}>
                    <div className="login__inputrow">
                        <input className="login__input" type="email" name="email" placeholder="Email" onChange={handleEmailInput} />
                    </div>
                    <div className="login__inputrow">
                        <input className="login__input" type="password" name="password" placeholder="Password" onChange={handlePasswordInput} />
                    </div>
                    <button className="login__btn">Login</button>
                </form>
                <div className="login__register">
                    <p className="login__register-text">
                        <Link to="/register" className="login__link">Register Now</Link>
                    </p>
                </div>
            </div>
            {this.state.feedback && <Feedback message={this.state.feedback} />}
        </section >
    }
}

export default withRouter(Login)