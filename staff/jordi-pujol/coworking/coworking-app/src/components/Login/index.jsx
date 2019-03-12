'use strict'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

import Feedback from '../Feedback';


class Login extends Component {
    state = { email: '', password: '', invitation: '', feedback: null }

    componentWillMount() {
        const { props: { link } } = this

        this.setState({ invitation: link, feedback: null })
    }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password, invitation } } = this

        try {
            if (invitation) {

                return logic.logInUser(email, password)
                    .then(() => logic.verifyNewUserLink(invitation))
                    .then(workspaceId => {
                        return logic.addUserToWorkspace(workspaceId)
                    })
                    .then(() => this.props.history.push('/home/inbox'))
                    .catch(({ message }) => this.setState({ feedback: message }))
            }
            else {
                logic.logInUser(email, password)
                    .then(() => this.props.history.push('/home/inbox'))
                    .catch(({ message }) => this.setState({ feedback: message }))
            }
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleGoToRegister = event => {
        event.preventDefault()
        this.props.history.push('/register')}

    handleNewFormSubmit = event => {
        event.preventDefault()

        this.props.history.push('/workspace')
    }

    render() {

        const { state: { feedback }, handleEmailInput, handlePasswordInput, handleFormSubmit, handleNewFormSubmit, handleGoToRegister } = this

        return <section className="login">
            <section className="login_content">
                <h2>Welcome back,</h2>
                <form className="login_content-form" onSubmit={handleFormSubmit}>
                    <span>Email</span>
                    <input type="text" autoFocus onChange={handleEmailInput} required />
                    <span>Password</span>
                    <input type="password" onChange={handlePasswordInput} required />
                    <p className="contentforgot-pass">Forgot password?</p>
                    <button className="submit">Log In</button>
                </form>
                <form onSubmit={handleNewFormSubmit}>
                    <button className="submit">Create new Workspace and Log In</button>
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
                <form onSubmit={handleGoToRegister} className="img__btn">
                    <button>Sign Up</button>
                </form>
            </section>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default withRouter(Login)