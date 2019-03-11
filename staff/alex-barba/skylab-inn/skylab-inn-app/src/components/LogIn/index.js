'use strict'

import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'
import './index.sass'

export default function LogIn({ onLogIn, onToSignUp }) {

    const { feedback } = useContext(AppContext)

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleFormSubmit = event => {
        event.preventDefault()
        onLogIn(email, password)
    }

    const handleToSignUp = () => {
        onToSignUp()
    }

    return (
        <div className='container'>
            <div className='header'>
                <h1>SkyLab Inn</h1>
            </div>
            <form className='form' onSubmit={handleFormSubmit}>
                <input autoFocus type='text' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} required></input>
                <input type='password' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)} required></input>
                {feedback && <Feedback />}
                <button type='submit' className='btn btn--primary'>Log In</button>
            </form>
            <div className='signup'>
                <a onClick={handleToSignUp}>Not a member yet?<br/>Registration only by invitation</a>
            </div>
            <div className='footer'>
                <a href='https://www.skylabcoders.com/en' target='_blank'>Discover Skylab Coders Academy!</a>
            </div>
        </div>
    )
}