import React, { useState } from 'react'
import logic from '../../logic'

function Login() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [feedback, setFeedback] = useState(null)

    function handleLogin(e) {
        e.preventDefault()

        try {
            logic.logInUser(email, password)
                .then(res => console.log('async res', res))
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    return (<section className="hero is-fullheight">
        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                        <form className="box" onSubmit={e => handleLogin(e)}>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input type="email" className="input" placeholder="email" onChange={e => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input type="password" className="input" placeholder="* * * * * * *" onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default Login 