import React, {Component, Fragment} from 'react'
import './index.sass'
import { Route, withRouter, Link } from 'react-router-dom'
import Welcome from '../welcome';
import logic from '../../logic/index'
import Feedback from '../Feedback'

class Register extends Component {

    state = { name: '', surname: '', email: '', password: '', passwordConf: '', loginFeedback: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handlePasswordConfInput = event => this.setState({ passwordConf: event.target.value })
    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })


    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { email, password, name, surname, passwordConf }, handleRegister } = this
        handleRegister(name, surname, email, password, passwordConf)
    }

    goBack = () => this.props.history.push("/welcome")


    handleRegister = (name, surname, email, password, passwordConf) => {

        try {
            this.setState({ loginFeedback: '' })
            logic.registerUser(name, surname, email, password, passwordConf)
                .then(() => this.props.history.push("/welcome"))
                .catch(({ message }) => this.showLoginFeedback(message))
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
                    <div >
                        <label htmlFor="uname"><b>Name</b></label>
                        <input type="text" value={this.state.name} placeholder="Name..." onChange={this.handleNameInput} required /> <br/>
                        <label htmlFor="psw"><b>Surname</b></label>
                        <input type="uname" value={this.state.surname} placeholder="Surname..." onChange={this.handleSurnameInput} required /><br/>
                        <label htmlFor="psw"><b>email</b></label>
                        <input type="email" value={this.state.email} placeholder="Enter email..." onChange={this.handleEmailInput} required /><br/>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" value={this.state.password} placeholder="Enter Password" onChange={this.handlePasswordInput} required /><br/> 
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" value={this.state.passwordConf} placeholder="Re-Enter Password" onChange={this.handlePasswordConfInput} required /><br/>
                        <button type="submit">Login</button>
                        {/* <label>
                        <input type="checkbox" checked="checked" name="remember"/> Remember me
                        </label> */}
                    </div>
                    {this.state.loginFeedback && <Feedback message={this.state.loginFeedback} level="warn" />}
                    <div className="container">
                        <button type="button" className="cancelbtn" onClick={this.goBack}>Cancel</button>
                    </div>

                </form>
            </div>
        </Fragment>
    }
}

export default withRouter(Register);