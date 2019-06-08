import React from 'react'
import './index.sass' 
import logoGreen from '../../assets/images/logoTextGreen.png'

function Login({ onLogin, navigateToRegister }) {

    function handleSubmit(e) {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username, password)
    }

    return <div className='uk-flex uk-flex-center uk-position-center'>
        <div className='uk-container uk-text-center'>
            <div>
                <img width="371" height="294" src={logoGreen} />
                <p className="subtitle"> Sign in with your email address</p>
            </div >
            <form className="uk-form-stacked" onSubmit={handleSubmit} >
                <div>
                    <input className="uk-input uk-form-small uk-form-width-medium" type="text" name="username" placeholder="email" />
                </div>
                <div>
                    <input className="uk-input uk-form-small uk-form-width-medium" type="password" name="password" placeholder="password" />
                </div>
                <div className="uk-margin">
                    <button className="uk-button uk-button-default">Sign In</button>
                </div>
            </form>
            <p>or <a onClick={navigateToRegister}>Register</a></p>
        </div>
    </div>
}

export default Login