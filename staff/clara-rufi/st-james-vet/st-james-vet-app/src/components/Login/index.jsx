import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic';


class Login extends Component {


  state = { email: '', password: '', error: null, isLoggedIn: false, signIn: true }

  handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  handleGoHome = event => {
    event.preventDefault()
    this.props.history.push('/home')
  }

  handleOnLogin = (email, password) => {
    try {
      logic.logInUser(email, password)
        .then(() => {
          this.setState({ isLoggedIn: logic.isUserLoggedIn, isAdmin: logic.isAdmin, signIn: false }, () => this.props.login())
        })
        .catch(({ message }) => this.setState({ error: message }))
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  onLogin = event => {
    event.preventDefault()
    const { state: { email, password } } = this
    this.handleOnLogin(email, password)
  }

  render() {

    return <form className="form__login" onSubmit={this.onLogin} >
      <h1>Login:</h1>
      <div className="input__form">
        <label>Email</label>
        <input type="email" name="email" onChange={this.handleOnChange} required />
      </div>
      <div className="input__form">
        <label>Password</label>
        <input type="password" name="password" onChange={this.handleOnChange} required />

        {this.state.error && <p p className="feedback feedback__error">{this.state.error}</p>}
        {this.state.isLoggedIn && <p className="feedback feedback__success">You have successfully logged in!</p>}
        {this.state.isLoggedIn && <button className="button__home" onClick={this.handleGoHome}>Go Home</button>}
        {this.state.signIn && <button type="submit" className="button">Sign in</button>}
      </div>
    </form>
  }
}

export default withRouter(Login)