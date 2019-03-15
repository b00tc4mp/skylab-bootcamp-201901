'use strict'

import React, {Component} from 'react'
import Feedback from '../Feedback'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'

class Login extends Component {
    state = { email: null, password: null, feedback: null }

    handleInput = event => this.setState({[event.target.name] : event.target.value})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password } } = this
       
        try {
            logic.logInUser(email, password)
                .then(() => this.props.history.push('/home'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { handleFormSubmit, handleInput, state: { feedback } } = this

        return <section className="login">
                <div className="loginBox">
                    <h2>Login</h2>
                    <form className="loginForm" onSubmit={handleFormSubmit}>
                        <input type="text" name="email" placeholder="email" onChange={handleInput} />
                        <input type="password" name="password" placeholder="password" onChange={handleInput} />
                        <button>Login</button>
                    </form>
                    <p>Not a member? Go to <Link to="/register">Register</Link></p>
                    {feedback && <Feedback message={feedback} />}
                </div>
                <button>Back to landing</button>
        </section>
    }
}

export default withRouter(Login)