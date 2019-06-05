import React, { useContext }  from 'react'
import { Context } from '../Context'
import Toast from '../Toast'
import './index.sass'
import logoGreen from '../../assets/images/logoTextGreen.png'

function Register({ onRegister, navigateToLogin }) {
    const { error, setError } = useContext(Context)

    function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password },
        } = e.target

        onRegister(name, surname, email, password)
    }
    return <main className="mainregister">
        <section className="column is-6-desktop is-6-tablet is-10-mobile is-one-fifth">
            <div className="has-text-centered field">
                <img src={logoGreen}/>
                <p className="subtitle"> the easiest way to monitor your processes</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input className="input field" type="text" name="name" placeholder="name"/>
                <input className="input field" type="text" name="surname" placeholder="surname"/>
                <input className="input field" type="text" name="email" placeholder="email"/>
                <input className="input field" type="password" name="password" placeholder="password" />
                <button className="button is-fullwidth is-primary">Sign Up</button>
            </form>
            <p>or <a onClick={navigateToLogin}>Login</a></p>
            {error && <Toast error={error} />}
        </section>
    </main>

}
export default Register