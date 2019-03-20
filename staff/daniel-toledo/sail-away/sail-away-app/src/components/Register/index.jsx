'use strict'

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import Feedback from '../Feedback'
import logic from '../../logic'
import './index.sass'

function Register(props) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [feedback, setfeedback] = useState('')

    async function handleFormSubmit(event) {
        event.preventDefault()

        try {
            await logic.register(name, surname, email, password, passwordConfirm, 'captain')
            await logic.login(email, password)
            props.isLogged()
            setfeedback('')
            props.history.push('/welcome')

        } catch (error) {
            setfeedback(error.message)
        }
    }

    return (<section className="register">
        <div className="register__container">
            <h2 className="register__title">Register</h2>
            <form onSubmit={handleFormSubmit} className="register__form form-group container mb-3 " >
                <div className="register__inputs">
                    <div className='register__input'>
                        <i class="fas fa-signature register__logo"></i>
                        <input onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Name" required />
                    </div>
                    <div className='register__input'>
                        <i class="fas fa-signature register__logo"></i>
                        <input onChange={e => setSurname(e.target.value)} type="text" name="surname" placeholder="Surname" required />
                    </div>
                    <div className='register__input'>
                        <i class="fas fa-at register_logo"></i>
                        <input onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
                    </div>
                    <div className='register__input'>
                        <i className="fas fa-lock register__logo"></i>
                        <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required />
                    </div>
                    <div className='register__input'>
                        <i className="fas fa-lock register__logo"></i>
                        <input onChange={e => setPasswordConfirm(e.target.value)} type="password" name="confirmPassword" placeholder="Confirm Password" required />
                    </div>
                    {feedback ? <Feedback message={feedback} /> : <div />}
                </div>
                <button className="register__button" type="submit">Register</button>
                <div className='register__member'>
                    <p className='register__member-text'>Are you already a memeber? </p>
                    <a href='/#/login' className='register__member-link'>Sign in</a>
                </div>
            </form>
        </div>
    </section>)
}


export default withRouter(Register)