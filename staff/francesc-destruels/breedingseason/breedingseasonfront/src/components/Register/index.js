import React, { useContext } from 'react'
import './index.sass'
import Feedback from '../Feedback'
import Logo from "../Logo"
import { AppContext } from '../AppContext'

function Register({ onSignUp }) {

    const { feedback } = useContext(AppContext)

    function handleSubmit(e) {
        e.preventDefault()

        const {
            nickname: { value: nickname },
            age: { value: age },
            email: { value: email },
            password: { value: password }
        } = e.target

        onSignUp(nickname, parseInt(age), email, password)
    }

    return <section className="Register">
        <Logo sizeX={"50%"} classToUse={"Register__Logo"}  main={true} />
        <form className="Register__RegNav" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input className="input is-large" type="text" name="nickname" placeholder="Nickname" required />
            <input className="input is-large" type="number" name="age" placeholder="Age" required />
            <input className="input is-large" type="text" name="email" placeholder="email" required/>
            <input className="input is-large" type="password" name="password" placeholder="password" required />
            <button className="button is-link is-large">Register</button>
            {feedback && <Feedback message={feedback} />}
        </form>
    </section>
}

export default Register