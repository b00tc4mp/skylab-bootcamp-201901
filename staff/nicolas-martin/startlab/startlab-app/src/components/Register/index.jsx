import React, { Component } from 'react'
import Feedback from '../Feedback/'

class Register extends Component {
    state = { name: null, surname: null, email: null, password: null, passwordConfirmation: null }

    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { 
            state: { name, surname, email, password, passwordConfirmation }, 
            props: { onRegister } 
        } = this

        onRegister(name, surname, email, password, passwordConfirmation)

    }

    render() {
        const { 
            handleNameInput, 
            handleSurnameInput, 
            handleEmailInput, 
            handlePasswordInput, 
            handleFormSubmit, 
            handlePasswordConfirmationInput, 
            props: { feedback } 
        } = this

        return <section className="register">
            <h1>Register</h1>

            <p>Lorem fistrum amatomaa qué dise usteer amatomaa fistro me cago en tus 
                muelas qué dise usteer a peich sexuarl. Pecador ahorarr sexuarl va usté 
                muy cargadoo pecador. Ese pedazo de diodeno la caidita no puedor al 
                ataquerl qué dise usteer te va a hasé pupitaa.</p>
            <hr />
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" onChange={handleNameInput} placeholder="name" required/>
                <input type="text" name="surname" onChange={handleSurnameInput} placeholder="surname" required/>
                <input type="text" name="email" onChange={handleEmailInput} placeholder="email" required/>
                <input type="password" name="password" onChange={handlePasswordInput} placeholder="password" required/>
                <input type="password" name="passwordConfirmation" onChange={handlePasswordConfirmationInput} placeholder="confirm password" required/>

                <button>Register</button>
            </form>

            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default Register