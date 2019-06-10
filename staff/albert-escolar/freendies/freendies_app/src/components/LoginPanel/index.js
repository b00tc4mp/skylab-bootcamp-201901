import React, { Component } from 'react'
import './index.scss'

class LoginPanel extends Component {
    state = {
        email: '',
        password: ''
    }

    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = async (event) => {
        event.preventDefault()
        const { onLogin } = this.props
        const { email, password } = this.state

        onLogin(email, password)
    }


    render() {
        const { history } = this.props
        const { onInputChange, onSubmit } = this


        return <div className="Login">
            <h2 className="Login__title">Login</h2>
            <form onSubmit={onSubmit}>
                <p>Email</p>
                <input className="Login__input"required name="email" placeholder="Insert your user mail" type="text" onChange={event => onInputChange(event)} />
                <br/>
                <p>Password</p>
                <input className="Login__input" required name="password" placeholder="Insert your user password" type="password" onChange={event => onInputChange(event)} />
                <br/>
                <br/>
                <button  className="Login__submitButton">Submit</button>
            </form>
        </div>
    }

}

export default LoginPanel