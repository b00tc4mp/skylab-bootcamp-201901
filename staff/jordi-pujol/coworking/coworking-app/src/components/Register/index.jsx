'use strict'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

import Feedback from '../Feedback'

class Register extends Component {

    state = { name: '', surname: '', email: '', password: '', passwordConfirm: '', userName:'' , feedback: null }

    componentWillMount() {
        this.setState({ feedback: null })
    }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmInput = event => this.setState({ passwordConfirm: event.target.value })

    handleUserNameInput = event => this.setState({ userName: event.target.value })


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, userName, email, password, passwordConfirm } } = this

        try {
            logic.registerUser(name, surname, userName, email, password, passwordConfirm)
                .then(() => this.props.history.push('/login'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleGoToLogin = event => {
        event.preventDefault()

        this.props.history.push('/login')
    }

    render() {

        const { state: { feedback }, handleNameInput, handleSurnameInput, handleUserNameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput, handleFormSubmit, handleGoToLogin } = this


        return <section className="register">
            <section className="register_content">
                <h2>Welcome!</h2>
                <form className="register_content-form" onSubmit={handleFormSubmit}>
                    <input type="text" placeholder="Name" onChange={handleNameInput} required autoFocus />
                    <input type="text" placeholder="Surname" onChange={handleSurnameInput} required />
                    <input type="text" placeholder="UserName" onChange={handleUserNameInput} required />
                    <input type="email" placeholder="Email" onChange={handleEmailInput} required />
                    <input type="password" placeholder="Password" onChange={handlePasswordInput} required />
                    <input type="password" placeholder="Confirm Password" onChange={handlePasswordConfirmInput} required />
                    <button className="submit">Sign Up</button>
                </form>
            </section>
            <section className="register_subcontent">
                <div className="img__text m--in">
                    <h2>One of us?</h2>
                    <p>If you already has an account, just sign in. We've missed you!</p>
                </div>
                <form onSubmit={handleGoToLogin} className="img__btn">
                    <button>Sign In</button>
                </form>
            </section>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}
export default withRouter(Register)