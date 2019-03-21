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
                    .then(() => logic.retrieveUser())
                    .then(user => {
                        if (user.workspace) {
                            this.props.history.push('/home/inbox')
                        }
                        else {
                            return logic.verifyNewUserLink(invitation)
                                .then(workspaceId => {
                                    return logic.addUserToWorkspace(workspaceId)
                                })
                                .then(() => this.props.history.push('/home/inbox'))
                        }
                    })
                    .catch(({ message }) => this.setState({ feedback: message }))
            }
            else {
                return logic.logInUser(email, password)
                    .then(() => console.log(2))
                    .then(() => logic.retrieveUser())
                    .then(user => {
                        if (!user.workspace) {
                            logic.logOutUser()
                            throw Error('Please login to an existing workspace or create a new one')
                        }
                    })
                    .then(() => this.props.history.push('/home/inbox'))
                    .catch(({ message }) => this.setState({ feedback: message }))
            }
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleGoToRegister = event => {
        event.preventDefault()
        this.props.history.push('/register')
    }

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
                    <input type="text" placeholder="Email" autoFocus onChange={handleEmailInput} required />
                    <input type="password" placeholder="Password" onChange={handlePasswordInput} required />
                    <button className="">Login</button>
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

export default withRouter(Login)