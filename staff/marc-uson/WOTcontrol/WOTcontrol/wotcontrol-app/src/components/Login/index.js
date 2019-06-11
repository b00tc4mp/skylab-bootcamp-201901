import React from 'react'
import logoGreen from '../../assets/images/logoTextShortGreen.png'

function Login({ onLogin, navigateToRegister }) {

    function handleSubmit(e) {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username, password)
    }

    return <div className='card uk-flex uk-flex-center uk-position-center'>
        <div className='uk-card-body uk-width-xlarge uk-padding uk-text-center'>
            <div>
                <img alt='WOTcon logo' width="232" height="184" src={logoGreen} />
                <p className="select-none subtitle"> The easiest way to monitor & control your process</p>
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
            <p className="select-none" onClick={e => e.preventDefault()}>or <a href=" " onClick={navigateToRegister}>Register</a></p>
        </div>
    </div>
}

export default Login