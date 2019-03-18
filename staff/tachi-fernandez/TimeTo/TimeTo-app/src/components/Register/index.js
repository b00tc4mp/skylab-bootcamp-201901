import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import "./index.css"



class Register extends Component {

    state = { name: null, surname: null, userName: null, email: null, password: null, passwordConfirmation: null }

    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    handleUserNameInput = event => this.setState({ userName: event.target.value })
    handleAgeInput = event => this.setState({ age: event.target.value })
    handleDescriptionArea = event => this.setState({ description: event.target.value })
    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handlePasswordConfirmInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleOnSubmit = event => {
        event.preventDefault()
        const { state: { name, surname, userName, age, description, email, password, passwordConfirmation }, props: { onRegister } } = this

        onRegister(name, surname, userName, age, description, email, password, passwordConfirmation)
    }



    render() {

        const { handleOnSubmit, handleNameInput, handleSurnameInput, handleUserNameInput, handleAgeInput, handleDescriptionArea, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput } = this
        const { feedback } = this.props

        return (

            <section className="register">
                <form className="register__form" onSubmit={handleOnSubmit}>
                    <h1 className="register__form-title">Register</h1>
                    <div className="register__form-name">
                        <input onChange={handleNameInput} className="register__form-input" type="text" placeholder="Name" autoFocus required />
                    </div >
                    <div className="register__form-surname">
                        <input onChange={handleSurnameInput} className="register__form-input" type="text" placeholder="Surname" required />
                    </div>
                    <div className="register__form-username">
                        <input onChange={handleUserNameInput} className="register__form-input" type="text" placeholder="Username" required />
                    </div>
                    <div className="register__form-age">
                        <input onChange={handleAgeInput} className="register__form-input" type="number" placeholder="Age" required />
                    </div>
                    <div className="register__form-description">
                        <textarea onChange={handleDescriptionArea} className="register__form-textarea" type="text" placeholder="Description" maxLength="300" required />
                    </div>
                    <div className="register__form-email">
                        <input onChange={handleEmailInput} className="register__form-input" type="email" placeholder="Email" required />
                    </div>
                    <div className="register__form-password">
                        <input onChange={handlePasswordInput} className="register__form-input" type="password" placeholder="Password" required />
                    </div>
                    <div className="register__form-confirmPassword">
                        <input onChange={handlePasswordConfirmInput} className="register__form-input" type="password" placeholder="Confirm Password" required />
                    </div>

                    <div className="button-primary-action">
                        <button className="register__form-button register__form-button--blue">
                            Register
                      </button>
                    </div>
                    <div className="button-secondary-action">
                        <button className="register__form-button register__form-button--green" onClick={() => this.props.history.push('/login')}>
                            Login
                        </button>

                        <button className="register__form-button register__form-button--green" onClick={() => this.props.history.push('/home')}>
                            Home
                      </button>
                    </div>
                {feedback && <Feedback message={feedback} level="warn" />}
                </form>
                

            </section>

        )

    }
}

export default withRouter(Register)