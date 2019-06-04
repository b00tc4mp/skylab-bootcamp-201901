import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import { GlobalContext } from '../../components/GlobalContext'
import Feedback from '../../components/Feedback'

import './index.scss'

const Login = ({ onLogin }) => {

    const { feedback } = useContext(GlobalContext)

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        onLogin(email, password)
    }

    return (
        <section className="login">
            <section className="login__content">
                <Header />

                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Insert email" onChange={e => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Insert password" onChange={e => setPassword(e.target.value)} />
                    <button className="button">Log in</button>
                    {feedback && <Feedback />}
                </form>
            </section>
        </section>
    )
}

export default Login
