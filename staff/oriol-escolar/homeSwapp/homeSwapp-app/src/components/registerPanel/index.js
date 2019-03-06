'use strict'

import React, { Component } from 'react'
import Feedback from '../Feedback'



class Register extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""

    }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })
    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { username, email, password, passwordConfirm }, props: { onRegister } } = this

        onRegister(username, email, password, passwordConfirm)
    }


    render() {

        const { handleInput, handleFormSubmit, props: { registerFeedback } } = this

        return <section className="login">

            <h2> Register </h2>
            <form className="login-form" onSubmit={handleFormSubmit}>

                <p>username</p>
                <input required type="text" name="username" placeholder="Enter a valid username" onChange={handleInput}></input>

                <p>email</p>
                <input required type="email" name="email" placeholder="Enter a valid email adress" onChange={handleInput}></input>

                <p>password</p>
                <input required type="password" name="password" placeholder="Enter a valid email adress" onChange={handleInput}></input>

                <p>password confirmation</p>
                <input required type="password" name="passwordConfirm" placeholder="Enter a valid email adress" onChange={handleInput}></input>

                <button>Register</button>


            </form>
            <div className="block feedback">
                {registerFeedback && <Feedback message={registerFeedback} />}
            </div>


        </section>

    }


}

export default Register