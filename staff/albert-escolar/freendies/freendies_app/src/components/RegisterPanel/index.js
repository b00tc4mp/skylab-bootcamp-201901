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

        return <div className="Register">
            <h2 className="Register__title">Register</h2>
            <form onSubmit={onSubmit}>
                <p>Name</p>
                <input className="Register__input" required name="username" placeholder="Insert your user name" type="text" onChange={event => onInputChange(event)} />
                <br />
                <p>Email</p>
                <input className="Register__input"required name="email" placeholder="Insert your user mail" type="text" onChange={event => onInputChange(event)} />
                <br />
                <p>Password</p>
                <input className="Register__input"required name="password" placeholder="Insert your user password" type="password" onChange={event => onInputChange(event)} />
                <br />
                <p>Password Confirmation</p>
                <input className="Register__input"required name="passwordConfirmation" placeholder="Confirm you password" type="password" onChange={event => onInputChange(event)} />
                <br />
                <br />
                <button className="Register__submitButton">Submit</button>
            </form>
        </div>


    }
}


export default RegisterPanel