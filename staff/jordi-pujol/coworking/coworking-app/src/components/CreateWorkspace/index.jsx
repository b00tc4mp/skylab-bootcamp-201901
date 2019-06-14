'use strict'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'

class Workspace extends Component {
    state = { email: '', password: '', name: '', feedback: null }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleWorkspaceInput = event => this.setState({ name: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password, name } } = this

        try {
            return logic.logInUser(email, password)
                .then(() => logic.createWorkspace(name))
                .then(() => this.props.history.push('/home/inbox'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleGoToRegister = event => {
        event.preventDefault()
        this.props.history.push('/register')}

    render() {

        const { state: { feedback }, handleEmailInput, handleGoToRegister, handlePasswordInput, handleFormSubmit, handleWorkspaceInput } = this

        return <section className="login">
            <section className="login_content">
                <h2>Welcome</h2>
                <form className="login_content-form" onSubmit={handleFormSubmit}>
                    <input type="text" placeholder="Email" autoFocus onChange={handleEmailInput} required />
                    <input placeholder="Password" type="password" onChange={handlePasswordInput} required />
                    <input placeholder="Workspace Name" type="text" onChange={handleWorkspaceInput} required />
                    <button className="submit">Create new Workspace and Log In</button>
                </form>
            </section>
            <section className="login_subcontent">
                <div className="img__text m--up">
                    <h2>New here?</h2>
                    <p>Sign up and discover great amount of new opportunities!</p>
                </div>
                <form onSubmit={handleGoToRegister} className="img__btn">
                    <button>Sign Up</button>
                </form>
                <div className="img__text m--in">
                    <h2>One of us?</h2>
                    <p>If you already has an account, just sign in. We've missed you!</p>
                </div>
            </section>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default withRouter(Workspace)