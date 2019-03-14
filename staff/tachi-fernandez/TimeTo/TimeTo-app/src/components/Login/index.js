import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom' 
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

          <section className="login" class="container">
          <div>
              <h1 className="login__title">Login</h1>
          </div>
            <div className='login__form'>
            <form onSubmit={handleFromSubmit}>
                <div className="login__form-email">
                    <label className = 'login__label-email'>E-mail:</label>
                    <input onChange={handleEmailInput} className="login__input-email" type="email" placeholder="Email" autoFocus required/>
                </div>
                <div className="login_form-password">
                    <label className = 'login__label-password'>Password:</label>
                    <input onChange={handlePasswordInput} className="login__input-password" type="password" placeholder="Password" required/>
                </div>
                <button class='btn btn-primarys' className="login__button">Login</button>
            </form>
            { feedback && <Feedback message={feedback} level="warn" /> }
            </div>
            <div className="login__button-home">
                <button  onClick={() => this.props.history.push('/home')}>
                    Home
                </button>
            </div>
            <div className="login__button-Register" > 
                <button  onClick={() => onGoToRegister()  }>
                    Register
                </button>
            </div>
          </section>     
      )


    }
}

export default  withRouter(Login)