'use strict'

import React, {Component} from 'react'
import Feedback from '../Feedback'
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
        const { handleEmailInput, handlePasswordInput, handleFromSubmit, props: { onGoToRegister, feedback } } = this

        return <section>
            <h2>Login</h2>
            <form onSubmit={handleFromSubmit}>
                <input className="red" name='email' type='text' placeholder='email' onChange={handleEmailInput} />
                <input name='password' type='password' placeholder='password' onChange={handlePasswordInput} />
                <button>Login</button>
            </form>
            <button onClick={onGoToRegister}>Register</button>
            {feedback && <Feedback message = {feedback}/>}
        </section> 
    }
}

export default Login