import React, { Component } from 'react'
import './index.sass'
import logic from '../../logic';


class Login extends Component {

  state = { email: '', password: '', error: null, isLogin: false, goHome: true, signIn: true }

  handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  handleLoginSubmit = event => {
    event.preventDefault()
    debugger
    const { state: { email, password } } = this
    this.login(email, password)
  }

  handleGoHome = event => {
    event.preventDefault()
    this.props.history.push('/home')
  }
  
  login = async (email, password) => {
    try {
      const token = await logic.logInUser(email, password)
      logic.__userToken__ = token
      this.setState({isLogin:true, signIn: false,goHome: true, error: null})
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  render() {

    return <form className="register" onSubmit={this.handleLoginSubmit} >
      <div className="form-group row">
        <label for="validationDefault01" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-7">
          <input type="email" name="email" onChange={this.handleOnChange} className="form-control" id="inputEmail3" placeholder="" required />
        </div>
      </div>
      <div className="form-group row">
        <label for="validationDefault01" className="col-sm-2 col-form-label" required>Password</label>
        <div className="col-sm-7">
          <input type="password" name="password" onChange={this.handleOnChange} className="form-control" id="inputPassword3" placeholder="" required />
        {this.state.error && <p p className= "feedbackError">{this.state.error}</p>}
        {this.state.isLogin && <p className= "feedback__Ok">You have successfully logged in!</p>} 
        {this.state.isLogin && <button className="button" onClick={this.handleGoHome}>Go Home</button>}
        {this.state.signIn &&<button type="submit" className="button">Sign in</button>}
        </div>
      </div>
    </form>
  }
}

export default Login