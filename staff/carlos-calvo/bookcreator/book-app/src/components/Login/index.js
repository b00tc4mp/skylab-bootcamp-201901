import React, {Component, Fragment} from 'react'
import './index.sass'
import { Route, withRouter, Link } from 'react-router-dom'
import Welcome from '../Welcome';
import Feedback from '../Feedback'
import logic from '../../logic'

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
            this.setState({ loginFeedback: '' })
            return logic.authenticateUser(email, password)
                .then(({token}) => {
                    this.props.updateToken()
                    this.goBack()
                })
                .catch(({ message }) => this.showLoginFeedback('Incorrect credentials'))
        } catch ({ message }) {
          this.showLoginFeedback('Incorrect credentials')
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
                    <div>
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" value={this.state.email} placeholder="Enter Username" name="uname" onChange={this.handleEmailInput} required /> <br/>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" value={this.state.password} placeholder="Enter Password" name="psw" onChange={this.handlePasswordInput} required /><br/>                         
                    </div>
                    {this.state.loginFeedback && <Feedback message={this.state.loginFeedback} level="warn" />}
                    <div className="container-buttons">
                        <button type="submit" className="but but--login"onClick={this.onLogin}>Login</button>
                        <button type="button" className="but but--cancel" onClick={this.goBack}>Cancel</button>
                    </div>
                </form>
            </div>
        </Fragment>
    }
}

export default withRouter(Login);