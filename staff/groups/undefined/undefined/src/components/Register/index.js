import React, { Component } from 'react'


class Register extends Component {

    state = {name: null, surname: null, email: null, password: null, passwordConfirmation: null}

    handleNameInput = event => this.setState ({name: event.target.value})
    handleSurnameInput = event => this.setState({surname: event.target.value})
    handleEmailInput = event => this.setState ({email: event.target.value})
    handlePasswordInput = event => this.setState({password: event.target.value})
    handlePasswordConfirmInput = event => this.setState({passwordConfirmation: event.target.value})

    handleOnSubmit = event => {
        event.preventDeafult()

        const { state: {name, surname, email, password, passwordConfirmation}, props: {onRegister}} = this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render(){

        const { handleOnSubmit, handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput} = this

        return <section className = "register">
            <h2>Register</h2>
                <form onSubmit = {handleOnSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" onChange={handleNameInput}></input>
                    <label>Surname</label>
                    <input type="text" name="surname" placeholder="Surname" onChange={handleSurnameInput}></input>
                    <label>E-mail</label>
                    <input type="email" name="email" placeholder="E-mail" onChange={handleEmailInput}></input>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={handlePasswordInput}></input>
                    <label>Password Confirmation</label>
                    <input type="password" name="passwordConfirmation" placeholder="Password confirmation" onChange={handlePasswordConfirmInput}></input>
                    <button type="submit">Register</button>
                </form>
        </section>

    }
}

export default Register