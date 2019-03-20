'use strict'

import React, { Component } from 'react'
import logic from '../../logic';
import Feedback from '../Feedback'
import { withRouter, Link } from 'react-router-dom'
import './index.sass'

class Register extends Component {
    state = { name: null, surname: null, email: null, password: null, passwordConfirmation: null, feedback: null }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation } } = this

        try {
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => {
                    this.props.history.push('/login/')
                    this.setState({ feedback: '' })
                })
                .catch(({ message }) => {
                    this.setState({ feedback: message })
                })
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handleFormSubmit, handlePasswordConfirmationInput } = this

        return <section className="register">
            <div className="register__content">
                <img className="register__img" src="/images/logo.png"></img>
                <form onSubmit={handleFormSubmit}>
                    <div className="register__inputrow">
                        <input className="register__input" required="true" type="text" name="name" onChange={handleNameInput} placeholder="name" />
                    </div>
                    <div className="register__inputrow">
                        <input className="register__input" required="true" type="text" name="surname" onChange={handleSurnameInput} placeholder="surname" />
                    </div>
                    <div className="register__inputrow">
                        <input className="register__input" required="true" type="email" name="email" onChange={handleEmailInput} placeholder="email" />
                    </div>
                    <div className="register__inputrow">
                        <input className="register__input" required="true" type="password" name="password" onChange={handlePasswordInput} placeholder="password" />
                    </div>
                    <div className="register__inputrow">
                        <input className="register__input" required="true" type="password" name="passwordConfirmation" onChange={handlePasswordConfirmationInput} placeholder="confirm password" />
                    </div>
                    {this.state.feedback && <Feedback message={this.state.feedback} />}
                    <button className="register__btn" >Register</button>
                </form>
                <p className="register__login-text">
                    <Link to="/login" className="register__link">Login Now</Link>
                </p>
            </div>
        </section >
    }
}

export default withRouter(Register)