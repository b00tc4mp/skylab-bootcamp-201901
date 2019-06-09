import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

function Login({onLogin}) {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    
    function handleSubmit(e) {
        e.preventDefault()
        onLogin(email, password)
    }

    return <>
    <span data-uk-icon="icon: check"></span>
    <div className="uk-navbar-right">
        <div className="uk-navbar-item">
            <form className="login-form" onSubmit={handleSubmit}>
                <input className="uk-input uk-form-width-medium login-form__input" type="text" name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                <input className="uk-input uk-form-width-medium login-form__input" type="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                <button className="uk-button uk-button-default">Login</button>
            <div className="uk-navbar-subtitle">Don't have an account? <Link to="/register">Sign up</Link></div>
            </form>
        </div>
    </div>
    </>
}

export default Login