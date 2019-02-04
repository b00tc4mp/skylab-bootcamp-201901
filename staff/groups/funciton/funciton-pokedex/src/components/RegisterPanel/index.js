import React, { Component, Fragment } from "react";
import './index.sass'




class RegisterPanel extends Component {

    state = { email: '', username: '', password: '', retryPassword: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })
    handleUsernameInput = event => this.setState({ username: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handleConfirmPassword = event => this.setState({ retryPassword: event.target.value })

    handleFormSubmit = event => {
        debugger
        event.preventDefault()
        const { state: { email, username, password, retryPassword } } = this
        this.props.onRegister(email, username, password, retryPassword)
    }



    render() {

        const { handleEmailInput, handlePasswordInput, handleUsernameInput, handleConfirmPassword, handleFormSubmit } = this
        const showHideClassName = this.props.show ? 'containerRegister' : 'containerRegisterNone'
        return <Fragment>

            <div className='row'>
                <div className={showHideClassName}>
                    <form onSubmit={handleFormSubmit}>
                        <div className="colum">
                            <label htmlFor="exampleInputUsername1">Username</label>
                            <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="emailHelp" placeholder="Enter Pokemon Trainer Name" onChange={handleUsernameInput} />
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleEmailInput} />
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordInput} />
                            <label htmlFor="exampleInputRetryPassword1">Retry Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Retry Password" onChange={handleConfirmPassword} />
                            <br></br>
                            <button type="submit" className="btn btn-info">Submit</button>

                        </div>
                    </form>
                </div>
            </div>
        </Fragment >
    }
}


export default RegisterPanel