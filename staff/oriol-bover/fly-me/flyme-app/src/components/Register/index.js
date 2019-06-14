import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Feedback from '../Feedback'
import logic from '../../logic'

function Register({ history }) {
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
                .then(({ status }) => {
                    if (status === 'OK') {

                        toast.success('Register successfully done', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        })

                        setTimeout(() => history.push('/login'), 3000);
                    }
                })
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    return (<section className="hero is-fullheight">

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
        />
        <ToastContainer />

        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                        <form className="box" onSubmit={e => handleRegister(e)}>
                            <div class="field has-text-centered">
                                <img src="https://res.cloudinary.com/drohwwwof/image/upload/v1553157712/Logo_tot.png" alt="logo-flyme" width="87" />
                            </div>
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
                                <button className="button">Register</button>
                            </div>
                        </form>
                        <div className="field has-text-centered">
                            <p>Go back to <Link to="/login">login</Link></p>
                        </div>
                        {feedback && <Feedback message={feedback} />}
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default Register 