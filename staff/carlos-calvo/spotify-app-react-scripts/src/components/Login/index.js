import React, { Component } from 'react';
import Feedback from '../Feedback'

class Login extends React.Component{
    state = { email: '', password: ''} //Equivalente al constructor

    //Método HandleLogin
    handleEmailChange = event => this.setState({ email: event.target.value})
    handlePasswordChange = event => this.setState({password: event.target.value})
    
    handleSubmit = event => {
        event.preventDefault()
        const { state: { email, password }, props: { onLogin } } = this
        onLogin(email, password)
    }


    render(){

        const { handleEmailChange, handlePasswordChange, handleSubmit, props: {feedback}} = this
        
        return <section className="loginPanel">
                <h1>SpotifyApp</h1>
                <h5 className="indigo-text">Please, login into your account</h5>
                <form onSubmit={handleSubmit}>
                    <label>Enter your email</label>
                    <input type="email" name="email" onChange={handleEmailChange} /> 
                    <label>Enter your password</label>
                    <input type="password" name="password" onChange={handlePasswordChange} />
                    <div className="div__buttonlogin">
                        <button type= "submit" className="btn btn-primary">Login</button>
                        {feedback && <Feedback message={feedback} level="warn" />}
                    </div>
                </form>
            </section>
    } //ojo con el this, que si no se pone no funciona por contextos!!!!!!
}



export default Login