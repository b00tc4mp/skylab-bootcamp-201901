'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import logic from '../../logic'
import './index.sass'

function Register(props) {
    let [name, setName] = useState('')
    let [surname, setSurname] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [passwordConfirm, setPasswordConfirm] = useState('')

    async function handleFormSubmit(event) {
        event.preventDefault()

        try {
            await logic.register(name, surname, email, password, passwordConfirm, 'captain')
            await logic.login(email, password)
            props.history.push('/welcome')

        } catch (error) {
            console.error(error)
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
                    {/* <div className='register__input'>
                        <input onChange={e => setKind(e.target.value)} className='mr-2' type="radio" value="captain" required />
                        <label className='mr-5' for="male">Captain</label>
                    </div>
                    <div className='register__input'>
                        <input onChange={e => setKind(e.target.value)} className='mr-2' type="radio" value="crew" required />
                        <label for="female">Crew</label>
                    </div> */}
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