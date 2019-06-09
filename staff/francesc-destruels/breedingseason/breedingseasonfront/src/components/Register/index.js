import React, { useContext } from 'react'
import './index.sass'
import Feedback from '../Feedback'
import Logo from "../Logo"
import { GameContext } from '../GameContext'

function Register({ onSignUp }) {

    const { feedback } = useContext(GameContext)

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

    return <section className="register">
        <Logo sizeX={"20%"} sizeY={"100%"} main={true} />
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nickname" placeholder="Nickname" />
            <input type="number" name="age" placeholder="Age" />
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button>Register</button>
            {feedback && <Feedback message={feedback} />}
        </form>
    </section>
}

export default Register