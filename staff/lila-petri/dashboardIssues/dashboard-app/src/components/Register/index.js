import React from 'react'
import './index.sass'


function Register({onRegister, error, goLogin}){
let country
const profile='product-expert'
    function onCountryChange(e){
        country=e
    }
    function handleSubmit(e) {
        e.preventDefault()
        
        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password }
        } = e.target

        onRegister(name, surname, email, password, profile, country)
    }
    return <main className="uk-container uk-container-large container-register uk-background-muted">
        <section >
            <div className="uk-margin">
                <p className="uk-text-large uk-text-muted"> Sign up with your email address</p>
            </div>
            <form className="uk-form-stacked" onSubmit={handleSubmit}>
                <div className="uk-margin">
                    <input className="uk-input" type="text" name="name" placeholder="name"/>
                </div>
                <div className="uk-margin">
                    <input className="uk-input" type="text" name="surname" placeholder="surname"/>
                </div>
                <div className="uk-margin">
                    <input className="uk-input" type="text" name="email" placeholder="email"/>
                </div>
                <div className="uk-margin">
                    <input className="uk-input" type="password" name="password" placeholder="password" />
                </div>
                <div className="uk-form-controls">
                    <select className="uk-select" name="country" onChange={event => onCountryChange(event.target.value)}>
                        <option value="">country</option>
                        <option value="AR">Argentina</option>
                        <option value="BR">Brazil</option>
                        <option value="CL">Chile</option>
                        <option value="CO">Colombia</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="IT">Italy</option>
                        <option value="MX">Mexico</option>
                        <option value="PE">Peru</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="ES">Spain</option>
                        <option value="TR">Turkey</option>
                    </select>
                </div>
                <div className="uk-margin">
                    <button className="uk-button uk-button-primary uk-width-1-1" >Sign Up</button>
                    <span className="uk-form-danger">{error}</span>
                </div>
            </form>
            <button className="uk-button uk-button-default uk-width-1-1 uk-button-large-bottom uk-margin-bottom uk-text-muted" onClick={goLogin}>Sign In</button>
        </section>
    </main>

}
export default Register
