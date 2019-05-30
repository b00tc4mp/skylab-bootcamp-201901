import React, { Component } from 'react'
import './index.scss'

class RegisterPanel extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()

        const { onRegister } = this.props
        const { username, email, password, passwordConfirmation } = this.state

        onRegister(username, email, password, passwordConfirmation)

    }

    render() {
        const { history } = this.props
        const { onInputChange, onSubmit } = this

        return <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input required name="username" placeholder="insert your user name" type="text" onChange={event => onInputChange(event)} />
                <input required name="email" placeholder="insert your user mail" type="text" onChange={event => onInputChange(event)} />
                <input required name="password" placeholder="insert your user password" type="password" onChange={event => onInputChange(event)} />
                <input required name="passwordConfirmation" placeholder="confirm you password" type="password" onChange={event => onInputChange(event)} />
                <button>Submit</button>
            </form>
        </div>


    }
}


export default RegisterPanel