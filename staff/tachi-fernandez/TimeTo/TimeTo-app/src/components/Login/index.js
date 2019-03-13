import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom' 
import Feedback from '../Feedback'
import './index.css'


class Login extends Component {
    state = { email: '', password: '', loginFeedback : null }

    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFromSubmit = event => {
        event.preventDefault()
        debugger
        const { state: { email, password }, props: { onLogin } } = this
        onLogin(email, password)
    }
    
    onGoToRegister = () => {
        this.setState({loginFeedback: null})
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
            <div className='login__input'>
            <form onSubmit={handleFromSubmit}>
                <input onChange={handleEmailInput} className="login__input-email" type="email" placeholder="Email" autoFocus required/>
                <input onChange={handlePasswordInput} className="login__input-password" type="password" placeholder="Password" required/>
                <button class='btn btn-primarys' className="login__button">Login</button>
            </form>
            { feedback && <Feedback message={feedback} level="warn" /> }
            </div>
            <div className="login__link">
                <button  onClick={() => this.props.history.push('/home')}>
                    Home
                </button>
                <button  onClick={() => onGoToRegister()  }>
                    Register
                </button>
            </div>
          </section>     
      )


    }
}

export default  withRouter(Login)