import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

import './index.sass'


export default function SignUp({ onSignUp, onToLogIn }) {

    const { feedback } = useContext(AppContext)

    const [name, setName] = useState(null)
    const [surname, setSurame] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)

    const handleFormSubmit = event => {
        event.preventDefault()
        onSignUp(name, surname, email, password, passwordConfirm)
    }

    const handleToLogIn = () => {
        onToLogIn()
    }

    return (
        <div className='signup-container'>
            <div className='signup-container__header'>
                <div className='signup-container__header-logo'></div>
            </div>
            <form className='signup-container__form' onSubmit={handleFormSubmit}>
                <div className='signup-container__form-input'>
                    <input type='text' name='name' placeholder='Name' onChange={e => setName(e.target.value)} required></input>
                </div>
                <div className='signup-container__form-input'>
                <input type='text' name='surname' placeholder='Surname' onChange={e => setSurame(e.target.value)} required></input>
                </div>
                <div className='signup-container__form-input'>
                <input type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} required></input>
                </div>
                <div className='signup-container__form-input'>
                <input type='password' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)} required></input>
                </div>
                <div className='signup-container__form-input'>
                    <input type='password' name='passwordConfirm' placeholder='Confirm Password' onChange={e => setPasswordConfirm(e.target.value)} required></input>
                </div>    
                {feedback && <Feedback />}
                <button className='btn btn--primary'type='submit'>Sign Up</button>
            </form>
            <div className='signup-container__link'>
                <a href onClick={handleToLogIn} className='login'>Go to Log In</a>
            </div>
            <div className='signup-container__footer'>
                <a rel="noopener noreferrer" href='https://www.skylabcoders.com/en' target='_blank'>Discover Skylab Coders Academy!</a>
            </div>
        </div>
    )
}