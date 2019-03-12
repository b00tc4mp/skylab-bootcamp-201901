import React, { Component } from 'react'
import logic from '../../logic';


class Login extends Component {

  state = { email: '', password: '', error: null, isLogin: false, goHome: true, signIn: true }

  handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  handleLoginSubmit = event => {
    event.preventDefault()
    const { state: { email, password } } = this
    this.login(email, password)
  }

  handleGoHome = event => {
    event.preventDefault()
    this.props.history.push('/home')
  }
  
  // login = async (email, password) => {
  //   try {
  //     await logic.logInUser(email, password)
  //     this.setState({isLogin:true, signIn: false,goHome: true, error: null})
  //   } catch ({ message }) {
  //     this.setState({ error: message })
  //   }
  // }

  handleOnLogin = event => {
    event.preventDefault()
    
    const {state: {email, password}, props: {onLogin}} = this

    onLogin(email, password)

  }

  render() {

    return <form className="form" onSubmit={this.handleOnLogin} >
        <p className="title__form">Login:</p>
        <div className="input__form">
        <label>Email</label>
     
          <input type="email" name="email" onChange={this.handleOnChange} required />
        </div>
        <div className="input__form">
        <label>Password</label>
          <input type="password" name="password" onChange={this.handleOnChange} required />
        
        {this.state.error && <p p className= "feedback feedback__error">{this.state.error}</p>}
        {this.state.isLogin && <p className= "feedback feedback__success">You have successfully logged in!</p>} 
        {this.state.isLogin && <button className="button__home" onClick={this.handleGoHome}>Go Home</button>}
        {this.state.signIn &&<button type="submit" className="button">Sign in</button>}
        </div>
 
    </form>
  }
}

export default Login