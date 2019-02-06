'use strict'

import React, {Component} from 'react'
import Feedback from '../Feedback'
import './index.sass'

class Register extends Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '' }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleFromSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render() {
        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, handleFromSubmit, props:{onGoToLogin, feedback} } = this

        return <section className="register">
            <div className="registerBox">
                <div className="content">
                    <div className="text">
                        <i className="fab fa-youtube fa-5x"></i>
                        <h3 className="tittle">Create your account</h3>
                        <p>to continue to TuTubo</p>
                    </div>
                    <form classname="form" onSubmit={handleFromSubmit}>
                        <div className="miniForm">
                            <input className="input" name='name' type='text' placeholder='name' onChange={handleNameInput} />
                            <input className="input" name='surname' type='text' placeholder='surname' onChange={handleSurnameInput} />
                        </div>
                        <div className="miniForm">
                            <input className="input" name='email' type='text' placeholder='email' onChange={handleEmailInput} />
                            <input className="input" name='password' type='password' placeholder='password' onChange={handlePasswordInput} />
                        </div>
                        <div className="miniForm">
                            <input className="input" name='passwordConfirmation' type='password' placeholder='confirm password' onChange={handlePasswordConfirmationInput} />
                            <button className="registerButton">Register</button>
                        </div>
                    </form>
                    <a className="signIn"onClick={onGoToLogin}>Sign In</a>
                </div>
            </div>
          
            {feedback && <Feedback message={feedback}/>}
        </section> 
    }
}

export default Register