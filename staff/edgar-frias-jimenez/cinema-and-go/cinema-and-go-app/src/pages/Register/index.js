import React, { useContext } from 'react'
import Header from '../../components/Header'
import { GlobalContext } from '../../components/GlobalContext'
import Feedback from '../../components/Feedback'

import './index.scss'

const Register = ({ onRegister }) => {

    const { feedback } = useContext(GlobalContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password }
        } = e.target

        onRegister(name, email, password)
    }

    return (
        <section className="register">
            <section className="register__content">
                <Header />

                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Insert name" />
                    <input type="email" name="email" placeholder="Insert email" />
                    <input type="password" name="password" placeholder="Insert password" />
                    <button>Register</button>
                    {feedback && <Feedback />}
                </form>
            </section>
    </section>
    )
}

export default Register
