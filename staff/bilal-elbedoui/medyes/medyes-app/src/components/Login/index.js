import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './index.scss';
import logic from '../../logic'


export function Login({ history }) {
    const [messageError, setMessageError] = useState(null)

    const handleHome = (event) => {

        event.preventDefault()
        const {
            email: { value: email },
            password: { value: password },
        } = event.target

        return (async () => {
            try {
                debugger
                await logic.login(email, password)
                debugger
                history.push('/home')
            } catch ({ message }) {
                debugger
                setMessageError(message)
            }
        })()

    }

    return (
        <div className="login_body">
            <section className="login_container">
                <form onSubmit={handleHome}>
                    <h2>Log In</h2>
                    <div className="login_wrapper">

                        <div>
                            <p className='login_field'>
                                <label>Email Address</label>
                                <input name="email" type="email" placeholder="name@example.com" />
                            </p>

                            <p className='login_field'>
                                <label>Password</label>
                                <input name="password" type="password" placeholder="Password" />
                            </p>
                            <br />

                        </div>
                        <button className="login_button">Log In</button>

                    </div>
                    <div className="login_signUp">
                        <p>Do you have an account? <Link to={'/register'}>Sign Up</Link></p>
                        {
                            messageError && <div className='message-body'>
                                <p>{messageError}</p>
                            </div>
                        }
                    </div>
                </form>
            </section>
        </div>

    )
}
