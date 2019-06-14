import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Feedback from '../Feedback'
import logic from '../../logic'

function Login({ history }) {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [feedback, setFeedback] = useState(null)

    function handleLogin(e) {
        e.preventDefault()

        try {
            logic.logInUser(email, password)
                .then(() => history.push('/admin'))
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
                            <div class="field has-text-centered">
                                <img src="https://res.cloudinary.com/drohwwwof/image/upload/v1553157712/Logo_tot.png" alt="logo-flyme" width="87" />
                            </div>
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
                        <div className="field has-text-centered">
                            <p>Not a member? register <Link to="/register">here</Link></p>
                        </div>
                        {feedback && <Feedback message={feedback} />}
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default Login 