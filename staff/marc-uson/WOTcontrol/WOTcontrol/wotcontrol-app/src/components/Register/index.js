import React, { useContext }  from 'react'
import { Context } from '../Context'
import Alert from '../Alert'
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
    return <div class='uk-flex uk-flex-center' >
        <div class='uk-container uk-text-center'>
            <div >
                <img width="371" height="294" src={logoGreen} />
                <p> the easiest way to monitor your processes</p>
            </div>
            <form className="uk-form-stacked" onSubmit={handleSubmit}>
                <input className="uk-input uk-form-small" type="text" name="name" placeholder="name" />
                <input className="uk-input uk-form-small" type="text" name="surname" placeholder="surname" />
                <input className="uk-input uk-form-small" type="text" name="email" placeholder="email" />
                <input className="uk-input uk-form-small" type="password" name="password" placeholder="password" />
                <button className="uk-button uk-button-default">Sign Up</button>
            </form>
            <p>or <a onClick={navigateToLogin}>Login</a></p>
            {error && <Alert error={error} />}
        </div>
    </div>

}
export default Register