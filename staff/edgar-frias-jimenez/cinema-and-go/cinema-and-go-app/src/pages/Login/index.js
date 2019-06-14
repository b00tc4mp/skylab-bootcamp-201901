import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import { GlobalContext } from '../../components/GlobalContext'
import GoogleMaps from '../../components/Maps'
import Feedback from '../../components/Feedback'

import './index.scss'

function Login({ onLogin }) {

    const { feedback } = useContext(GlobalContext)

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = event => {
        event.preventDefault()
        onLogin(email, password)
    }

    return (
        <section className="login">
            <section className="login__content">
                <section className="main-section">
                    <Header />
                    <form className="login__form" onSubmit={handleSubmit}>
                        <div className="field">
                            <input type="email" name="email" placeholder="Insert email" onChange={e => setEmail(e.target.value)}/>
                            <label htmlFor="email" data-label="Insert email"></label>
                        </div>
                        <div className="field">
                            <input type="password" name="email" placeholder="Insert password" onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="password" data-label="Insert password"></label>
                        </div>

                        <button className="button">Log in</button>
                        {feedback && <Feedback />}

                        </form>
                </section>
                <section className="maps">
                    <GoogleMaps />
                </section>
            </section>
        </section>
    )
}

export default Login
