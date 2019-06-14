
import './index.css'
import React, { Component } from 'react'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'

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
        const { handleEmailInput, handlePasswordInput, handleFormSubmit, props: { title, feedback } } = this

        return <section className="login">
            <h2>{title}</h2>

            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleEmailInput} placeholder="email" />
                <br />
                <br />
                <input type="password" name="password" onChange={handlePasswordInput} placeholder="password" />
                <br />
                <br />
                <br />
                <button>Login</button>
                <br />
                <br />
                <button>
                    <Link className="decoration" to="/register">Register</Link>
                </button>
            </form>
            {feedback && <Feedback message={feedback} level="warn" />}
        </section>
    }
}

export default Login