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
        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, handleFromSubmit, props:{onGoToLogin, feedback, mode} } = this

        return <section className={`${mode ? 'register register-light' : 'register register-dark'}`}>
            <div className="registerBox">
                <div className={`${mode ? 'registerContent registerContent-light' : 'registerContent registerContent-dark'}`}>
                    <div className="registerText">
                        <i className={`${mode ? 'fab fa-youtube fa-youtube-light fa-5x' : 'fab fa-youtube fa-5x'}`}></i>
                        <h3 className={`${mode ? 'tittleRegister tittleRegister-light' : 'tittleRegister tittleRegister-dark'}`}>Create your account</h3>
                        <p>to continue to TuTubo</p>
                    </div>
                    <form classname="registerform" onSubmit={handleFromSubmit}>
                        <div className="miniForm">
                            <input className="registerInput" name='name' type='text' placeholder='name' onChange={handleNameInput} />
                            <input className="registerInput" name='surname' type='text' placeholder='surname' onChange={handleSurnameInput} />
                        </div>
                        <div className="miniForm">
                            <input className="registerInput" name='email' type='text' placeholder='email' onChange={handleEmailInput} />
                            <input className="registerInput" name='password' type='password' placeholder='password' onChange={handlePasswordInput} />
                        </div>
                        <div className="miniForm">
                            <input className="registerInput" name='passwordConfirmation' type='password' placeholder='confirm password' onChange={handlePasswordConfirmationInput} />
                            <button className="registerButton">Register</button>
                        </div>
                    </form>
                    <p className="feedback">{feedback && <Feedback message={feedback}/>}</p>
                    <a className="signIn"onClick={onGoToLogin}>Sign In</a>
                </div>
            </div>
          
            {/* {feedback && <Feedback message={feedback}/>} */}
        </section> 
    }
}

export default Register