import React from 'react'
import './index.sass'



class LoginPanel extends React.Component {

    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { email, password }, props: { onLogin } } = this
        onLogin(email, password)
    }

    //OnLogin tiene que ser el nombre de la propiedad que llegue desde el ente superior.

    render(){

        const { handleEmailInput, handlePasswordInput, handleFormSubmit } = this
        return <div className="containerLogin">
        <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleEmailInput}/>
                <small id="emailHelp" className="form-text text-muted">Your pokemon trainer's email!</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordInput}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    }
}


export default LoginPanel