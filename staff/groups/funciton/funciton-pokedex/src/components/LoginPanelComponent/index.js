import React, { Component, Fragment } from "react";
import './index.sass'
import Feedback from '../../components/Feedback'
import Home from '../Home'
import logic from "../../logic";



class LoginPanel extends Component {

    state = { username: '', password: '', loginFeedback: '' }

    handleEmailInput = event => this.setState({ username: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { username, password }, login  } = this
        login(username, password)
    }

    goBack = () => this.props.history.push("/")


    login = (user, password) => {
        try {
          logic.loginUser(user, password)
            .then(({ user }) => {
              this.setState({ user }, () => this.props.history.push("/welcome"))
            })
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
        const { handleEmailInput, handlePasswordInput, handleFormSubmit, goBack } = this

        return <Fragment>
            <Home/>
            <div className="containerLogin fade-in">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="name" value={this.state.username} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" onChange={handleEmailInput} />
                        <small id="emailHelp" className="form-text text-muted">Your pokemon trainer's email!</small>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordInput} />
                        <br></br>
                        <button type="submit" className="btn btn-danger">Submit</button>
                        <button onClick={goBack} type="button" className="goBack__button btn btn-light">Go Back</button>
                        <Feedback message={this.state.loginFeedback} level="warn" />
                    </div>
                </form>
            </div>
        </Fragment>
    }
}


export default LoginPanel