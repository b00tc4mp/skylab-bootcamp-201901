'use strict'

import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

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
        <section>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} required></input>
                <input type="text" name="surname" placeholder="Surname" onChange={e => setSurame(e.target.value)} required></input>
                <input type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required></input>
                <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required></input>
                <input type="password" name="passwordConfirm" placeholder="Confirm Password" onChange={e => setPasswordConfirm(e.target.value)} required></input>
                {feedback && <Feedback />}
                <button type="submit">Sign Up</button>
            </form>
            <a onClick={handleToLogIn}>Log In</a>
        </section>
    )
}