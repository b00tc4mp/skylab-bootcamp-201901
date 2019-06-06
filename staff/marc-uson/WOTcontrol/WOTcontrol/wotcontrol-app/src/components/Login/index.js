import React, { useContext }  from 'react'
import { Context } from '../Context'
import Alert from '../Alert'
import './index.sass' 
import logoGreen from '../../assets/images/logoTextGreen.png'

function Login({ onLogin, navigateToRegister }) {

    const { error, setError } = useContext(Context)

    function handleSubmit(e) {
        e.preventDefault()
        setError(null)

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username, password)
    }

    return <div className='uk-flex uk-flex-center'>
        <div className='uk-container uk-text-center'>
            <div>
                <img width="371" height="294" src={logoGreen} />
                <p className="subtitle"> Sign in with your email address</p>
            </div >
            <form className="uk-form-stacked" onSubmit={handleSubmit} >
                <input className="uk-input uk-form-small" type="text" name="username" placeholder="email" />
                <input className="uk-input uk-form-small" type="password" name="password" placeholder="password" />
                <button className="uk-button uk-button-default">Sign In</button>
            </form>
            <p>or <a onClick={navigateToRegister}>Register</a></p>
            {error && <Alert error={error} />}
        </div>
    </div>
}

export default Login