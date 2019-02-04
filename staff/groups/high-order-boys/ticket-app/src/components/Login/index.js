'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Feedback from '../Feedback'

class Login extends Component {
    state = {email: '', password: ''}

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: {onLogin} } = this

        onLogin(email,password)
    }



    render() {
        const {handleFormSubmit, handleInput, props: {loginFeedback}} = this

        return <section className="login">

            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleInput} />
                <input type="password" name="password" onChange={handleInput} />
                <button>Login</button>
            </form>
            <div>
                <button> <Link to="/register"> To Register</Link></button>
            </div>
            {loginFeedback && <Feedback message={loginFeedback} />}

        </section>
    }
}

export default Login