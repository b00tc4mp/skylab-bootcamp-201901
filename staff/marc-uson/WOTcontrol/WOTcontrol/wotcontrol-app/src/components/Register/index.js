import React, { useContext }  from 'react'
import logoGreen from '../../assets/images/logoTextShortGreen.png'

function Register({ onRegister, navigateToLogin }) {

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
    return <div className='card uk-flex uk-flex-center uk-position-center' >
        <div className='uk-card-body uk-width-xlarge uk-padding uk-text-center'>
            <div >
                <img width="232" height="184" src={logoGreen} />
                <p className="select-none" >The easiest way to monitor & control your process</p>
            </div>
            <form className="uk-form-stacked" onSubmit={handleSubmit}>
                <div>
                    <input className="uk-input uk-form-small uk-form-width-medium" type="text" name="name" placeholder="name" />
                    <input className="uk-input uk-form-small uk-form-width-medium" type="text" name="surname" placeholder="surname" />
                </div>
                <div>
                    <input className="uk-input uk-form-small uk-form-width-medium" type="text" name="email" placeholder="email" />
                    <input className="uk-input uk-form-small uk-form-width-medium" type="password" name="password" placeholder="password" />
                </div>
                <button className="uk-button uk-button-default uk-margin-top">Sign Up</button>
            </form>
            <p className="select-none" >or <a onClick={navigateToLogin}>Login</a></p>
        </div>
    </div>

}
export default Register