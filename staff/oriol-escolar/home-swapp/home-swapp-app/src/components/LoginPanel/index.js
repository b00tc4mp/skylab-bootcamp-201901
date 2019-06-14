'use strict'

import React, { Component } from 'react'
import Feedback from '../Feedback'
import Spinner from '../Spinner'
import './index.sass';




class Login extends Component {

    state = {

        email: "",
        password: "",
        loginFeedback:"",
        loading: false

    }

    componentWillReceiveProps(props){
        if(props.loginFeedback){

            this.setState({loginFeedback:props.loginFeedback, loading:false})
        }

    }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })
    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        this.setState({loading:true, loginFeedback:""})
        onLogin(email, password)
    }


    render() {

        const { handleInput, handleFormSubmit, props: { loginFeedback },state:{loading} } = this

        return <section className="login">
            {!loading ? <div>
                <h2> Login </h2>
                <form className="login-form" onSubmit={handleFormSubmit}>

                    <p>email</p>
                    <input className="login-form__input" required type="email" name="email" placeholder="Enter a valid email adress" onChange={handleInput}></input>

                    <p>password</p>
                    <input className="login-form__input" required type="password" name="password" placeholder="Enter a valid email adress" onChange={handleInput}></input>

                    <button className="login-form__button">Login</button>



                </form>
                <div className="block feedback">
                    {loginFeedback && <Feedback message={loginFeedback} />}
                </div>

            </div> : <Spinner></Spinner>}


        </section>

    }


}

export default Login