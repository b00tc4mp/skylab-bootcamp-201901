import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom' 
import Feedback from '../Feedback'
import "./index.css"



class Register extends Component {

    state = {name: null, surname: null,userName: null ,  email: null, password: null, passwordConfirmation: null}
    
    handleNameInput = event => this.setState ({name: event.target.value})
    handleSurnameInput = event => this.setState({surname: event.target.value})
    handleUserNameInput = event => this.setState({userName: event.target.value})
    handleAgeInput = event => this.setState({ age:event.target.value })
    handleDescriptionArea = event => this.setState({ description:event.target.value })
    handleEmailInput = event => this.setState ({email: event.target.value})
    handlePasswordInput = event => this.setState({password: event.target.value})
    handlePasswordConfirmInput = event => this.setState({passwordConfirmation: event.target.value})
    
    handleOnSubmit = event => {
      event.preventDefault()
      const { state: {name, surname, userName ,age, description, email, password, passwordConfirmation}, props: {onRegister}} = this
      
      onRegister(name, surname, userName ,age, description, email, password, passwordConfirmation)
    }
    
    
    
    render(){
      
      const {handleOnSubmit, handleNameInput, handleSurnameInput,handleUserNameInput , handleAgeInput, handleDescriptionArea, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput} = this
      const {feedback} = this.props
      
      return (
        
        <section className="register">
           <form className="register__form" onSubmit={handleOnSubmit}>
              <h1 className="register__form-title">Register</h1>
                <div className="register__form-name">
                  <label className="register__form-name-label">Name</label>
                  <input onChange={handleNameInput} className="register__form-name-input" type="text" placeholder="Name" autoFocus required />
                </div >
                <div className="register__form-surname">
                    <label className="register__form-surname-label">Surname</label>
                    <input onChange={handleSurnameInput} className="register__form-surname-input"type="text" placeholder="Surname" required />
                </div>
                <div className="register__form-username">
                    <label className="register__form-username-label">Username:</label>
                    <input onChange={handleUserNameInput} className="register__form-username-input" type="text" placeholder="Username" required />
                </div>
                <div className="register__form-age">
                    <label className="register__form-age-label">Age</label>
                    <input onChange={handleAgeInput} className="register__form-age-input" type="number" placeholder="Age" required />
                </div>
                <div className="register__form-description">
                    <label className="register__form-description-label">Description</label>
                    <textarea onChange={handleDescriptionArea} className="register__form-description-input" type="text" placeholder="Description" maxLength="300" required />
                </div>
                <div className="register__form-email">
                    <label className="register__form-email-label">Email</label>
                    <input onChange={handleEmailInput} className="register__form-email-input" type="email" placeholder="Email"  required />
                </div>
                <div className="register__form-password">
                    <label className="register__form-password-label">Password</label>
                    <input onChange={handlePasswordInput} className="register__form-password-input" type="password" placeholder="Password" required />
                </div>
                <div className="register__form-confirmPassword">
                    <label className="register__form-confirmPassword-label">Confirm Password</label>
                    <input onChange={handlePasswordConfirmInput} className="register__form-confirmPassword-input" type="password" placeholder="Confirm Password" required />
                </div>
                      <button className="register__form-button-register">
                        Register
                      </button>

                      <button className="register__form-button-login"  onClick={() => this.props.history.push('/login')}>
                        Login
                      </button>

                      <button  className="register__form-button-home" onClick={() => this.props.history.push('/home')}>
                        Home
                      </button>
           </form>
           { feedback && <Feedback message={feedback} level="warn" /> }

        </section>

        )

    }
}

export default withRouter(Register)