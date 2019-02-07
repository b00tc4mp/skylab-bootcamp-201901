import React, { Component, Fragment } from "react";
import './index.sass'
import Feedback from '../../components/Feedback'
import logic from "../../logic";
import Home from '../Home'




class RegisterPanel extends Component {

    state = { email: '', username: '', password: '', retryPassword: '', registerFeedback: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })
    handleUsernameInput = event => this.setState({ username: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handleConfirmPassword = event => this.setState({ retryPassword: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { email, username, password, retryPassword }, register } = this
        register(email, username, password, retryPassword)
    }

    hideRegisterFeedback = () => this.setState({ registerFeedback: '' })

    showRegisterFeedback = message => {
        this.setState({ registerFeedback: message })
        setTimeout(this.hideRegisterFeedback, 2000)
    }



  register = (email, username, password, passwordConfirmation) => {
    try {

      logic.registerUser(email, username, password, passwordConfirmation)
        .then(user => {
          this.setState({ user })
          this.setState({ user }, () => this.props.history.push("/"))
        })

        .catch(({ message }) => this.showRegisterFeedback(message))
    } catch ({ message }) {
      this.showRegisterFeedback(message)

    }
  }

  goBack = () => this.props.history.push("/")


    render() {

        const { handleEmailInput, handlePasswordInput, handleUsernameInput, handleConfirmPassword, handleFormSubmit, goBack } = this
        return <Fragment>
            <Home/>

            <div className='row'>
                <div className="containerRegister fade-in">
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="Username">Username</label>
                            <input type="text" value={this.state.username} className="form-control" id="exampleInputUsername1" aria-describedby="emailHelp" placeholder="Enter Pokemon Trainer Name" onChange={handleUsernameInput} />
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" value={this.state.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleEmailInput} />
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordInput} />
                            <label htmlFor="exampleInputRetryPassword1">Retry Password</label>
                            <input type="password" value={this.state.retryPassword} className="form-control" id="exampleInputPassword1" placeholder="Retry Password" onChange={handleConfirmPassword} />
                            <br></br>
                            <button type="submit" className="btn btn-info">Submit</button>
                            <button onClick={goBack} type="button" className="goBack__button btn btn-light">Go Back</button>
                            <Feedback message={this.state.registerFeedback} level="warn" />

                        </div>
                    </form>
                </div>
            </div>
        </Fragment >
    }
}


export default RegisterPanel