'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { data, mongoose, models } from 'sail-away-data'
import logic from '../../logic'

function Register(props) {
    let [name, setName] = useState('')
    let [surname, setSurname] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [passwordConfirm, setPasswordConfirm] = useState('')
    let [kind, setKind] = useState('')

    async function handleFormSubmit(event) {
        event.preventDefault()

        try {
            await logic.register(name, surname, email, password, passwordConfirm, kind)
            props.history.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    return (<section className="register">
        <div className="register__box container pl-lg-5 pr-lg-5">
            <h2 className="col-2 mt-3">Register</h2>
            <form onSubmit={handleFormSubmit} className="login__form form-group container mb-3 " >
                <div className="row mr-2">
                    <label htmlFor="name" className="col col-md-3 col-sm-12 flex mt-1">Name</label>
                    <input onChange={e => setName(e.target.value)} type="text" className="col col-md-9 col-12 form-control mt-1" name="name" placeholder="Name" required />
                    <label htmlFor="surname" className="col col-md-3 col-sm-12 flex mt-1">Surname</label>
                    <input onChange={e => setSurname(e.target.value)} type="text" className="col col-md-9 col-12 form-control mt-1" name="surname" placeholder="Surname" required />
                    <label htmlFor="email" className="col col-md-3 col-sm-12 flex mt-1">Email</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="col col-md-9 col-12 form-control mt-1" name="email" placeholder="Email" required />
                    <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="col col-md-9 col-12 form-control mt-1" name="password" placeholder="Password" required />
                    <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Confirm Password</label>
                    <input onChange={e => setPasswordConfirm(e.target.value)} type="password" className="col col-md-9 col-12 form-control mt-1" name="confirmPassword" placeholder="Confirm Password" required />
                    <input onChange={e => setKind(e.target.value)} className='mr-2' type="radio"  value="captain" required />
                    <label className='mr-5' for="male">Captain</label>
                    <input onChange={e => setKind(e.target.value)} className='mr-2' type="radio" value="crew" required />
                    <label for="female">Crew</label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    </section>)
}


export default withRouter(Register)