import React, { Component } from 'react'
import './index.sass'
import logic from '../../logic';
//import Feedback from '../Feedback'


class Register_Owner extends Component {

    state = { name: '', surname: '', idCard: '', phone: '',  adress: '', city: '', email: '', password: '', passwordConfirmation: '', error: null, isRegister: false }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })


    handleRegisterSubmit = event => {
        event.preventDefault()
        const { state: { name, surname, idCard, phone, adress, city, email, password, passwordConfirmation} } = this
        this.register(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)

    }

    handleGoLogin = event => {
        event.preventDefault()
        this.props.history.push('/login')
    }

    register = async (name, surname, idCard, phone, adress, city, email, password, passwordConfirmation ) => {
        try {
            debugger
            await logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation )
            console.log('you have succesfully registered!!')
            this.setState({isRegister: true, error: null})
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
    
        return <form onSubmit={this.handleRegisterSubmit} >
            <p className="title__form">Owner's details:</p>
            <div className="inputs__form">
                <label>Name</label>
                <div className="col-sm-7">
                    <input type="text" name="name" onChange={this.handleOnChange} className="form-control" required></input>
                </div>
            </div>
            <div className="form-group row">
                <label>Surname</label>
                <div className="col-sm-7">
                    <input type="text" name="surname" onChange={this.handleOnChange} className="form-control" id="inputPassword3" required></input>
                </div>
            </div>
            <div className="form-group row">
                <label>Id Card</label>
                <div className="col-sm-7">
                    <input type="text" name="idCard" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
                </div>
            </div>
            <div className="form-group row">
                <label>Phone</label>
                <div className="col-sm-7">
                    <input type="text" name="phone" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
                </div>
            </div>
            <div className="form-group row">
                <label>Adress</label>
                <div className="col-sm-7">
                    <input type="text" name="adress" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
                </div>
            </div>
            <div className="form-group row">
                <label>City</label>
                <div className="col-sm-7">
                    <input type="text" name="city" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
                </div>
            </div>
          
            <div className="form-group row">
                <label>Email</label>
                <div className="col-sm-7">
                    <input type="text" name="email" onChange={this.handleOnChange} className="form-control" id="inputPassword3" required></input>
                </div>
            </div>
            <div className="form-group row">
                <label>Password</label>
                <div className="col-sm-7">
                    <input type="password" name="password" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
                </div>
            </div>
            <div className="form-group row">
                <label>Confirm Password</label>
                <div className="col-sm-7">
                    <input type="password" name="passwordConfirmation" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
                </div>
            </div>
            <button type="submit" class="btn btn-primary login">Sign in</button>
            <button className="goHome" onClick={this.handleGoLogin}>Go Login</button>
            {this.state.error && <p className= "feedbackError">{this.state.error}</p>} 
            {this.state.isRegister && <p className= "feedbackOk">You have successfully registered!</p>}
        </form>

    }
}

export default Register_Owner