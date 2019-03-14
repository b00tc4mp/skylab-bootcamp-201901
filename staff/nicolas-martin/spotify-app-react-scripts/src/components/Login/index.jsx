'use strict'
import React from 'react'
import Feedback from '../Feedback'

class Login extends React.Component {
    state = { email: '', password: '' }

    handleClicktoRegister = () => this.props.loginVisible()

    handleEmailInput = event => this.setState({ email: event.target.value })
    
    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    render() {
        const { 
            handleEmailInput, 
            handlePasswordInput, 
            handleFormSubmit, 
            handleClicktoRegister,
            props: { 
                title, 
                feedback 
            } 
        } = this

        return (
            <section className="login">
                <h2>{title}</h2>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" name="email" onChange={handleEmailInput} />
                    <input type="password" name="password" onChange={handlePasswordInput} />
                    <button>Login</button>
                </form>
                <a href="#" onClick={handleClicktoRegister} >Register</a>
                {feedback && <Feedback message={feedback} level="warn" />}
            </section>
        )
    }
}

export default Login