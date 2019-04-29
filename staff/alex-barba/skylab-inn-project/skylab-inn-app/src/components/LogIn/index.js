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
        <div className='login-container'>
            <div className='login-container__header'>
                <div className='login-container__header-logo'></div>
            </div>
            <form className='login-container__form' onSubmit={handleFormSubmit}>
                <div className='login-container__form-input'>
                    <input type='text' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} required></input>
                </div>
                <div className='login-container__form-input'>
                    <input type='password' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)} required></input>
                </div>
                {feedback && <Feedback />}
                <button type='submit' className='btn btn--primary'>Log In</button>
            </form>
            <div className='login-container__link'>
                <a href onClick={handleToSignUp} className='signup'>Not a member yet?<br/>Registration only by invitation</a>
            </div>
            <div className='login-container__footer'>
                <a rel="noopener noreferrer" href='https://www.skylabcoders.com/en' target='_blank'>Discover Skylab Coders Academy!</a>
            </div>
        </div>
    )
}