import React, {Component, Fragment} from 'react'
import './index.sass'
import { Route, withRouter, Link } from 'react-router-dom'
import Welcome from '../welcome';
import logic from '../../logic/index'

class Login extends Component {

    state = { email: '', password: '', loginFeedback: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { email, password }, handleLogin } = this
        handleLogin(email, password)
    }

    goBack = () => this.props.history.push("/welcome")


    handleLogin = (email, password) => {

        try {
            logic.authenticateUser(email, password)
                .then(({ email }) => {
                    this.setState({ email }, () => this.props.history.push("/welcome"))
                })
                .catch(({ message }) => console.log(message))
        } catch ({ message }) {
          this.showLoginFeedback(message)
        }
      }

    hideLoginFeedback = () => this.setState({ loginFeedback: '' })
    
    showLoginFeedback = message => {
        this.setState({ loginFeedback: message })
        setTimeout(this.hideLoginFeedback, 2000)
    }

    render() {

        return <Fragment>
            <Welcome/>
            <div className="containerLogin fade-in">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="imgcontainer">
                        <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png" alt="Avatar" className="avatar"/>
                    </div>
                    <div >
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" value={this.state.email} placeholder="Enter Username" name="uname" onChange={this.handleEmailInput} required /> <br/>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" value={this.state.password} placeholder="Enter Password" name="psw" onChange={this.handlePasswordInput} required /><br/>
                            
                        <button type="submit" onClick={this.onLogin}>Login</button>
                        {/* <label>
                        <input type="checkbox" checked="checked" name="remember"/> Remember me
                        </label> */}
                    </div>
                    {/* <Feedback></Feedback> */}
                    <div className="container">
                        <button type="button" className="cancelbtn" onClick={this.goBack}>Cancel</button>
                        <span className="psw">Forgot <a href="#">password?</a></span>
                    </div>

                </form>
            </div>
        </Fragment>
    }
}

export default withRouter(Login);