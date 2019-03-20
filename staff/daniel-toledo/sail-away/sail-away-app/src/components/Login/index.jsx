'use strict'

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import Feedback from '../Feedback'

import logic from '../../logic'
import './index.sass'

function Login(props) {

    const { isNeeded, isLogged } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [feedback, setfeedback] = useState('')

    async function handleFormSubmit(event) {
        event.preventDefault()

        try {
            await logic.login(email, password)
            setfeedback('')
            isLogged()
            props.history.push('/')

        } catch (error) {
            setfeedback(error.message)
        }
    }

    return (<section className="login">
        {isNeeded && <div className='login__need'>
            <h2 className='login__need-title'>Avast ye!</h2>
            <p className='login__need-text'>You need to be logged to proceed. Please Sign in!</p>

        </div>}
        <div className="login__container">
            <h2 className='login__title'>Login</h2>
            <form onSubmit={handleFormSubmit} className="login__form" >
                <div className="login__inputs">
                    <div className='login__input'>
                        <i className="fas fa-user login__logo"></i>
                        <input onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
                    </div>
                    <div className='login__input'>
                        <i className="fas fa-lock login__logo"></i>
                        <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required />
                    </div>
                </div>
                {feedback ? <Feedback message={feedback} /> : <div />}
                <button className="login__button" type="submit">let's sail away!</button>
                <div className='login__not-member'>
                    <p className='login__not-member-text'>Are you not a memeber? </p>
                    <a href='/#/register' className='login__not-member-link'>Sign up</a>
                </div>
            </form>
        </div>
    </section>)
}


export default withRouter(Login)