import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import './index.css'


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
        const { handleEmailInput, handlePasswordInput, handleFromSubmit, handleGoBack } = this
        return (

          <section className="login">
              <h1 className="login__title">Login</h1>
            <div className='login__input'>
            <form onSubmit={handleFromSubmit}>
                <input onChange={handleEmailInput} className="login__input-email" type="email" placeholder="Email" required/>
                <input onChange={handlePasswordInput} className="login__input-password" type="password" placeholder="Password" required/>
                <button className="login__button">Login</button>
            </form>
            </div>
            <div className="login__link">
                <div>
                <Link to="/home" className="login__link-home">Go home</Link>
                </div>
                <div>
                <Link to="/register" className="login__link-register">Register</Link>
                </div>
            </div>
          </section>     
      )


    }
}

export default  Login