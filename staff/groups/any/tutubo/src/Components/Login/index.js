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
        const { handleEmailInput, handlePasswordInput, handleFromSubmit, props: { onGoToRegister, feedback, mode } } = this

        return <section className={`${mode ? 'login login-light' : 'login-dark'}`}>
            <div className="loginBox">
                <div className={`${mode ? 'content content-light' : 'content content-dark'}`}>
                    <div className="text">
                        <i className={`${mode ? 'fab fa-youtube fa-youtube-light fa-5x' : 'fab fa-youtube fa-5x'}`}></i>
                        <h3 className={`${mode ? 'loginTitle loginTitle-light' : 'loginTitle loginTitle-dark'}`}>Sign in</h3>
                        <p>to continue to TuTubo</p>
                    </div>
                    <form className="loginform" onSubmit={handleFromSubmit}>
                        <input className="input" name='email' type='text' placeholder='email' onChange={handleEmailInput} />
                        <input className="input" name='password' type='password' placeholder='password' onChange={handlePasswordInput} />
                        <button className="loginButton">Login</button>
                    </form>
                    <a className="createAccount" onClick={onGoToRegister}>Create account</a>
                </div>
            </div>
            {feedback && <Feedback message = {feedback}/>}
        </section> 
    }
}

export default Login