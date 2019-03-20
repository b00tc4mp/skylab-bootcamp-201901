import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import Feedback from '../Feedback'
import './index.css'


class Login extends Component {
    state = { email: '', password: '' , registerFeedback: null}


    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFromSubmit = event => {
        event.preventDefault()
        debugger
        const { state: { email, password }, props: { onLogin } } = this
        onLogin(email, password)
    }
    
    onGoToRegister = () => {
        this.setState({registerFeedback: null})
        this.props.history.push('/register')
    }
  

    render() {
        const { handleEmailInput, handlePasswordInput, handleFromSubmit,onGoToRegister } = this
        const {feedback} = this.props
        return (

          <section className="login">
            <div className='login__form'>
            <form onSubmit={handleFromSubmit}>
              <h1 className="login__form-title">Login</h1>
                <div className="login__form-email">
                    <input onChange={handleEmailInput} className="login__form-input" type="email" placeholder="Email" autoFocus required/>
                </div>
                <div className="login__form-password">
                    <input onChange={handlePasswordInput} className="login__form-input" type="password" placeholder="Password" required/>
                </div>
                <div className="button-primary-action">
                    <button className="login__form-button login__form-button--blue">
                    Login
                    </button>
                </div>

                
                <div className="button-secondary-action">
                    <button className="login__form-button login__form-button--green" onClick={() => onGoToRegister()  }>
                    Register
                    </button>    
                
                    <button className="login__form-button login__form-button--green" onClick={() => this.props.history.push('/home')}>
                    Home
                    </button>
                </div>
            </form>
            { feedback && <Feedback message={feedback} level="warn" /> }
            </div>
            
          </section>     
      )


    }
}

export default  withRouter(Login)