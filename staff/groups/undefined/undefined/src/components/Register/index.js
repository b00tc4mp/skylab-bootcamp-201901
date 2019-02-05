import React, { Component } from 'react'


class Register extends Component {

    state = {name: null, surname: null, email: null, password: null, passwordConfirmation: null}

    handleNameInput = event => this.setState ({name: event.target.value})
    handleSurnameInput = event => this.setState({surname: event.target.value})
    handleEmailInput = event => this.setState ({email: event.target.value})
    handlePasswordInput = event => this.setState({password: event.target.value})
    handlePasswordConfirmInput = event => this.setState({passwordConfirmation: event.target.value})

    handleOnSubmit = event => {
        event.preventDefault()
        const { state: {name, surname, email, password, passwordConfirmation}, props: {onRegister}} = this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render(){

        const { handleOnSubmit, handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput} = this

        return <section className = "register">
            <h2>Register</h2>
                <form onSubmit = {handleOnSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Name" onChange={handleNameInput} required />

                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname" name="surname" placeholder="Surname" onChange={handleSurnameInput} required />

                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" placeholder="E-mail" onChange={handleEmailInput} required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={handlePasswordInput} required />

                    <label htmlFor="passwordConfirmation">Password Confirmation</label>
                    <input type="password" id="passwordConfirmation" name="passwordConfirmation" placeholder="Password confirmation" onChange={handlePasswordConfirmInput} required />

                    <button type="submit">Register</button>
                </form>
        </section>

    }
}

export default Register