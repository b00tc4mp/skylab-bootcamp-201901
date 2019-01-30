import React, { Component } from 'react';
import Feedback from '../Feedback';

class RegisterSection extends React.Component{
    state = { name: '', surname: '', email: '', password: '', passwordconf: '' } //Equivalente al constructor

    //Controlan los estados de los inputs y van actualizando el estado que define el objeto
    handleNameChange = event => this.setState({ name: event.target.value})
    handleSurnameChange = event => this.setState({ surname: event.target.value})
    handleEmailChange = event => this.setState({ email: event.target.value})
    handlePasswordChange = event => this.setState({ password: event.target.value})
    handlePwdConfChange = event => this.setState({ passwordconf: event.target.value})

    onSubmitClick = event =>{
        event.preventDefault()
        this.props.onRegisterUser(this.state.name,this.state.surname, this.state.email, this.state.password, this.state.passwordconf )
    }

    onClickBackToLogin = event =>{
        event.preventDefault()
        this.props.fromRegisterToLogin()
    }


    render(){
        return <section className="register form-row justify-content-center">
            <h2>Welcome to Register Section</h2>
            <form className="row justify-content-center col-10" onSubmit={this.onSubmitClick}>
                <div className="form-group col-7">
                    <label >Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Name" onChange={this.handleNameChange} required  />
                </div>
                <div className="form-group col-7">
                    <label >Surname</label>
                    <input type="text" name="surname"  className="form-control" placeholder="Surname" onChange={this.handleSurnameChange} required />
                </div>
                <div className="form-group col-7">
                    <label >email</label>
                    <input type="email" className="form-control" placeholder="email" onChange={this.handleEmailChange} required />
                </div>
                <div className="form-group col-7">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="password" onChange={this.handlePasswordChange} required />
                </div>
                <div className="form-group col-7">
                    <label>Password conf</label>
                    <input type="password" name="password-confirmation" className="form-control" placeholder="password confirmation" onChange={this.handlePwdConfChange} required />
                </div>
                <button type="submit" className="btn btn-primary col-7"><strong>Register</strong></button>
            </form>
            <div className="row justify-content-center col-3">
                <button type="submit" className="btn btn-secondary col-6" onClick={this.onClickBackToLogin}><strong>Back</strong></button>
            </div>

            {this.props.feedbackRegister && <Feedback message={this.props.feedbackRegister} level="warn" />}  
        </section>
    }
}

export default RegisterSection