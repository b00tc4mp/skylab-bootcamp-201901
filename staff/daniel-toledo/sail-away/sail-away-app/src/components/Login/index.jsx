'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import logic from '../../logic'

function Login(props) {
    
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
   
    async function handleFormSubmit(event) {
        event.preventDefault()

        try {
            let user = await logic.login(email, password)
            debugger
            props.history.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    return (<section className="login">
        <div className="login__box container pl-lg-5 pr-lg-5">
            <h2 className="col-2 mt-3">Login</h2>
            <form onSubmit={handleFormSubmit} className="login__form form-group container mb-3 " >
                <div className="row mr-2">
                    <label htmlFor="email" className="col col-md-3 col-sm-12 flex mt-1">Email</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="col col-md-9 col-12 form-control mt-1" name="email" placeholder="Email" required />
                    <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="col col-md-9 col-12 form-control mt-1" name="password" placeholder="Password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </section>)
}


export default withRouter(Login)