import React, { useContext }  from 'react'
import { Context } from '../Context'
import Toast from '../Toast'
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

    return <main className="mainlogin">
        <section className="login column is-4-desktop is-4-tablet is-10-mobile is-one-fifth">
            <div className="has-text-centered field">
                <img src={logoGreen} />
                <p className="subtitle"> Sign in with your email address</p>
            </div >
            <form onSubmit={handleSubmit}>
                <input className="input field" type="text" name="username" placeholder="email"/>
                <input className="input field" type="password" name="password" placeholder="password" />
                <button className="button is-fullwidth is-primary">Sign In</button>
            </form>
            <p>or <a onClick={navigateToRegister}>Register</a></p>
            {error && <Toast error={error} />}
        </section>
    </main>
}

export default Login