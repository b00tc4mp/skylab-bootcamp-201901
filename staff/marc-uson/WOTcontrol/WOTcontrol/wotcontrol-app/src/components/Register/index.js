import React, { useContext }  from 'react'
import { Context } from '../Context'
import './index.sass'
import logoGreen from '../../assets/images/logoTextGreen.png'

function Register({ onRegister, navigateToLogin }) {
    const { error, setError } = useContext(Context)

    function handleSubmit(e) {
        e.preventDefault()
        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password },
        } = e.target

        onRegister(name, surname, email, password)
    }
    return <div className='uk-flex uk-flex-center uk-position-center' >
        <div className='uk-container uk-text-center'>
            <div >
                <img width="371" height="294" src={logoGreen} />
                <p> the easiest way to monitor your processes</p>
            </div>
            <form className="uk-form-stacked" onSubmit={handleSubmit}>
                <div>
                    <input className="uk-input uk-form-small uk-form-width-medium" type="text" name="name" placeholder="name" />
                </div>
                <div>
                    <input className="uk-input uk-form-small uk-form-width-medium" type="text" name="surname" placeholder="surname" />
                </div>
                <div>
                    <input className="uk-input uk-form-small uk-form-width-medium" type="text" name="email" placeholder="email" />
                </div>
                <div>
                    <input className="uk-input uk-form-small uk-form-width-medium" type="password" name="password" placeholder="password" />
                </div>
                <button className="uk-button uk-button-default uk-margin">Sign Up</button>
            </form>
            <p>or <a onClick={navigateToLogin}>Login</a></p>
        </div>
    </div>

}
export default Register