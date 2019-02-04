'use strict'

import React, { Component } from 'react'
import Feedback from '../Feedback'
import logic from '../../logic'
import userStorage from '../../localstorage'

class Login extends Component {
    state = { loginFeedback: null, user: { email: '' }, email: '', password: ''}

    handleLogin = (email,password) => {
        try {
            logic.loginUser(email,password)
                .then(user => {
                    this.setState({user})
                })
                .catch(({ message }) => this.setState({ loginFeedback: message }))
        } catch ({message})  {
                this.setState({loginFeedback: message})
            }
        }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })
    
    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password },handleLogin } = this

        handleLogin(email,password)
    }
    
    

    render() {
        const {handleFormSubmit, handleInput, state: {loginFeedback}} = this

        return <section className="login">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleInput} />
                <input type="password" name="password" onChange={handleInput} />
                <button>Login</button> 
            </form>
            {loginFeedback && <Feedback message={loginFeedback} />}
        </section>
    }
}

export default Login