'use strict'

import React, { Component } from 'react'
import Feedback from '../Feedback'

class Login extends Component {
    state = { email: '', password: ''}

    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    
    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email,password)
    }
    
    

    render() {
        const {handleFormSubmit, handleEmailInput, handlePasswordInput, props: { feedback }} = this

        return <section className="login">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                <button>Login</button> 
            </form>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default Login