'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Feedback from '../Feedback'

class Login extends Component {
    state = {email: '', password: ''}

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: {onLogin} } = this

        onLogin(email,password)
    }



    render() {
        const {handleFormSubmit, handleInput, props: {loginFeedback}} = this

        return <section className="login">
            <div className="columns is-mobile is-centered has-text-centered">
                <p className="column is-three-quarters title">Discover the best plans in your city</p>
            </div>
            <div className="block loginPanel">
                <div className="columns is-mobile is-tablet is-centered has-text-centered">
                    <div className="column">
                        <form className="columns is-centered" onSubmit={handleFormSubmit}>
                            <div className="control column is-2">
                                <input className="input" type="text" name="email" placeholder="email" onChange={handleInput} />
                            </div>
                            <div className="control column is-2">
                                <input className="input" type="password" name="password" placeholder="password" onChange={handleInput} />
                            </div>
                            <div className="column is-2">
                                <button className="button is-fullwidth is-danger is-outlined">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="columns is-mobile is-centered has-text-centered register">
                    <div className="column">
                        <p>Not a memeber? go to<Link to="/register"> register</Link></p>
                    </div>
                </div>
            </div>
            <div className="block feedback">
                {loginFeedback && <Feedback message={loginFeedback} />}
            </div>    
        </section>
    }
}

export default Login