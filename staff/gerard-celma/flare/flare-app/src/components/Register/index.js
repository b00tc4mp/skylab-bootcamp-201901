'use strict'

import React, { Component } from 'react'
import Feedback from '../Feedback'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'

class Register extends Component {
    state = { name: null, surname: null, email: null, password: null, passwordConfirmation: null, feedback: '' }

    handleInput = event => this.setState({[event.target.name] : event.target.value})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation } } = this

        try {
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => this.props.history.push('/login'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { handleInput, handleFormSubmit, state: { feedback } } = this

        return <section className="register">
            <h2>Register</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" onChange={handleInput} placeholder="name" />
                <input type="text" name="surname" onChange={handleInput} placeholder="surname" />
                <input type="text" name="email" onChange={handleInput} placeholder="email" />
                <input type="password" name="password" onChange={handleInput} placeholder="password" />
                <input type="password" name="passwordConfirmation" onChange={handleInput} placeholder="confirm password" />
                <button>Register</button>                
            </form>
            <p>Already a member? Go to <Link to="/login">Login</Link></p>
            {feedback && <Feedback message={ feedback } />}
        </section>
    }
}

export default withRouter(Register)