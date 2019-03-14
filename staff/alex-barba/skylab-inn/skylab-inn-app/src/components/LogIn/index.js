'use strict'

import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

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
        <section>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required></input>
                <input type="text" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required></input>
                {feedback && <Feedback />}
                <button type="submit">Log In</button>
            </form>
            <a onClick={handleToSignUp}>Sign Up</a>
        </section>
    )
}