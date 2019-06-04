import React, { useContext } from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { GameContext } from '../GameContext'

function Login({ onLogin }) {

    const { feedback } = useContext(GameContext)

    function handleSubmit(e) {
        e.preventDefault()

        const nicknameOEmail = e.target.nicknameOEmail.value
        const password = e.target.password.value

        onLogin(nicknameOEmail, password)
    }

    return <section className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nicknameOEmail" placeholder="Nickname or Email" />
            <input type="password" name="password" placeholder="Password" />
            <button>Login</button>
            {feedback && <Feedback message={feedback}/>}
        </form>
    </section>
}

export default Login