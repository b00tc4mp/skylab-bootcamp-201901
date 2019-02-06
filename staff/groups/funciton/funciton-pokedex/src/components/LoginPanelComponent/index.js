import React, { Component, Fragment } from "react";
import './index.sass'
import Feedback from '../../components/Feedback'



class LoginPanel extends Component {

    state = { username: '', password: '' }

    handleEmailInput = event => this.setState({ username: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { username, password }, props: { onLogin } } = this
        onLogin(username, password)
    }

    onGoBack = () => {
        this.setState({ username: '', password: '' })
        this.props.goBackHomeLogin()
    }




    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit, onGoBack } = this
        const showHideClassName = this.props.show ? 'containerLogin' : 'containerLoginNone'

        return <Fragment>
            <div className={showHideClassName}>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="name" value={this.state.username} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" onChange={handleEmailInput} />
                        <small id="emailHelp" className="form-text text-muted">Your pokemon trainer's email!</small>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordInput} />
                        <br></br>
                        <button type="submit" className="btn btn-danger">Submit</button>
                        <button onClick={onGoBack} type="button" className="goBack__button btn btn-light">Go Back</button>
                        <Feedback message={this.props.message} level="warn" />
                    </div>
                </form>
            </div>
        </Fragment>
    }
}


export default LoginPanel