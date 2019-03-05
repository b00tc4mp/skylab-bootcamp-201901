import React, { useState } from 'react'
import logic from '../../logic'

function Register() {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [feedback, setFeedback] = useState(null)

    function handleRegister(e) {
        e.preventDefault()

        try {
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(({ status }) => console.log('async res', status))
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
                        <form className="box" onSubmit={e => handleRegister(e)}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder="name" onChange={e => setName(e.target.value)} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Surname</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder="surname" onChange={e => setSurname(e.target.value)} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input type="email" className="input" placeholder="email" onChange={e => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input type="password" className="input" placeholder="* * * * * * *" onChange={e => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password Confirm</label>
                                <div className="control">
                                    <input type="password" className="input" placeholder="* * * * * * *" onChange={e => setPasswordConfirm(e.target.value)} required />
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

export default Register 