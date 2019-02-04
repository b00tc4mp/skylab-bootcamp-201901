'use strict'

import React, {Component} from 'react'
import './index.sass'

class Login extends Component {
    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFromSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    render() {
        const { handleEmailInput, handlePasswordInput, handleFromSubmit, props: { onGoToRegister } } = this

        return <section>
            <h2>Login</h2>
            <form onSubmit={handleFromSubmit}>
                <input name='email' type='text' placeholder='email' onChange={handleEmailInput} />
                <input name='password' type='password' placeholder='password' onChange={handlePasswordInput} />
                <button>Login</button>
            </form>
            <button onClick={onGoToRegister}>Register</button>
        </section> 
    }
}

export default Login