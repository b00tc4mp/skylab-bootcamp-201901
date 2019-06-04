import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import GoogleMaps from '../../components/Maps'
import { GlobalContext } from '../../components/GlobalContext'
import Feedback from '../../components/Feedback'

import './index.scss'

function Register({ onRegister }) {

    const { feedback } = useContext(GlobalContext)

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = event => {
        event.preventDefault()
        onRegister(name, email, password)
    }

    return (
        <section className="register">
            <section className="register__content">
                <section className="main-section">
                    <Header />
                    <form className="register__form" onSubmit={handleSubmit}>
                        <div className="field">
                            <input type="text" name="name" placeholder="Insert name" onChange={e => setName(e.target.value)} />
                            <label htmlFor="name" data-label="Insert name"></label>
                        </div>
                        <div className="field">
                            <input type="email" name="email" placeholder="Insert email" onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="email" data-label="Insert email"></label>
                        </div>
                        <div className="field">
                            <input type="password" name="email" placeholder="Insert password" onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="password" data-label="Insert password"></label>
                        </div>

                        <button className="button">Register</button>
                        {feedback && <Feedback />}
                    </form>
                </section>
            </section>

            <section className="maps">
                <GoogleMaps />
            </section>
        </section>
    )
}

export default Register
