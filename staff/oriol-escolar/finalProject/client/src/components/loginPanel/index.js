'use strict'

import React, { Component } from 'react'


class Login extends Component {

    state = {

        email: "",
        password: ""

    }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })
    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }


    render() {

        const { handleInput, handleFormSubmit } = this

        return <section className="login">

            <h2> Login </h2>
            <form className="login-form" onSubmit={handleFormSubmit}>

                <p>email</p>
                <input type="text" name="email" placeholder="Enter a valid email adress" onChange={handleInput}></input>

                <p>password</p>
                <input type="text" name="email" placeholder="Enter a valid email adress" onChange={handleInput}></input>

                <button>Login</button>


            </form>


        </section>

    }


}

export default Login