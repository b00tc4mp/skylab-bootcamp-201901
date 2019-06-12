import React, { useContext } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass'
import Feedback from '../Feedback'
import Logo from "../Logo"
import { AppContext } from '../AppContext'

function Login({ onLogin, history }) {

    const { feedback } = useContext(AppContext)

    function handleSubmit(e) {
        e.preventDefault()

        const nicknameOEmail = e.target.nicknameOEmail.value
        const password = e.target.password.value

        onLogin(nicknameOEmail, password)
    }

    const handleToGoBack = () => {
        history.push('/')
    }

    return <section className="Login">
        <Logo sizeX={"50%"} main={true} classToUse={"Login__Logo"} />
        <form className={"Login__LogNav"} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <p class="control">
                <input className="input is-large" type="text" name="nicknameOEmail" placeholder="Nickname or Email" required />

                <input className="input is-large" type="password" name="password" placeholder="Password" required/>
            </p>
            <button className="button is-link is-large">Login</button>
            {feedback && <Feedback message={feedback} />}
        </form>
    </section>
}

export default withRouter(Login)