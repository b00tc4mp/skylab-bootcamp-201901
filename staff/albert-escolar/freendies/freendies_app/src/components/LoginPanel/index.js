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


        return <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input required name="email" placeholder="insert your user mail" type="text" onChange={event => onInputChange(event)} />
                <input required name="password" placeholder="insert your user password" type="password" onChange={event => onInputChange(event)} />
                <button>Submit</button>
            </form>
        </div>
    }

}

export default LoginPanel