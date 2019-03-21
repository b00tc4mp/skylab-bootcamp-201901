'use strict'

import React, { Component } from 'react'
import Feedback from '../Feedback'
import Spinner from '../Spinner'
import './index.sass';



class Register extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        loading: false,
        registerFeedback: ""

    }

    componentWillReceiveProps(props) {
        if (props.registerFeedback) {

            this.setState({ registerFeedback: props.registerFeedback, loading: false })
        }

    }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })
    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { username, email, password, passwordConfirm }, props: { onRegister } } = this

        this.setState({ loading: true, registerFeedback: "" })
        onRegister(username, email, password, passwordConfirm)
    }


    render() {

        const { handleInput, handleFormSubmit, props: { registerFeedback },state:{loading} } = this

        return <section className="register">
            {!loading ? <div>
                <h2> Register </h2>
                <form className="register-form" onSubmit={handleFormSubmit}>

                    <p>username</p>
                    <input className="register-form__input" required type="text" name="username" placeholder="Type a valid username" onChange={handleInput}></input>

                    <p>email</p>
                    <input className="register-form__input" required type="email" name="email" placeholder="Type a valid email adress" onChange={handleInput}></input>

                    <p>password</p>
                    <input className="register-form__input" required type="password" name="password" placeholder="Type a valid password" onChange={handleInput}></input>

                    <p>password confirmation</p>
                    <input className="register-form__input" required type="password" name="passwordConfirm" placeholder="Type your password again" onChange={handleInput}></input>

                    <button className="register-form__button">Register</button>


                </form>
                <div className="block feedback">
                    {registerFeedback && <Feedback message={registerFeedback} />}
                </div>

            </div>:<Spinner></Spinner> }


        </section>

    }


}

export default Register