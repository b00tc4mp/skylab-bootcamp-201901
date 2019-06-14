import React, { useState } from 'react'
import './index.sass'
import logic from '../../logic'

function Login(props) {
    const [messageError, setMessageError] = useState(null)
    const [success, setSuccessMessage] = useState(null)

    const { match: { params: { register } } } = props

    async function handleSubmit(e) {

        e.preventDefault()
        const {

            email: { value: email },
            password: { value: password },

        } = e.target

        try {

            await logic.loginUser(email, password)
            setSuccessMessage(true)
        } catch (error) {
            setMessageError(error.message)
        }
    }

    const handleToRegister = () => {
        props.history.push('/register')
    }
    
    if(logic.isUserLoggedIn) props.history.push('/search/category')

    return (
        <form className="contens6" onSubmit={handleSubmit}>
            <div className="field">
                <div className="control has-icons-left has-icons-right">
                    <input className="input" name='email' type="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <div className="control has-icons-left">
                    <input className="input" name='password' type="password" placeholder="Password" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-success">
                        Login
                    </button>
                </div>
            </div>
            <div>
                <a href onClick={handleToRegister}>Not registered yet? Click here to register </a>
            </div>
            {messageError && <div className="message-error">
                <p>{messageError}</p>
            </div>}
        </form>
    )
}

export default Login