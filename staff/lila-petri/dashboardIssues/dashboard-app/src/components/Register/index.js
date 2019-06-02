import React from 'react'


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
    return <main className="mainregister">
        <section className="column is-6-desktop is-6-tablet is-10-mobile is-one-fifth">
            <div className="has-text-centered field">
                <h2 className="title is-2">Dashboard Issues</h2>
                <p className="subtitle"> Sign up with your email address</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input className="input field" type="text" name="name" placeholder="name"/>
                <input className="input field" type="text" name="surname" placeholder="surname"/>
                <input className="input field" type="text" name="email" placeholder="email"/>
                <input className="input field" type="password" name="password" placeholder="password" />
                <div className="select field is-fullwidth">
                    <select name="city" onChange={event => onCountryChange(event.target.value)}>
                        <option value="">Country</option>
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
                <button className="button is-fullwidth is-primary">Sign Up</button>
                <span>{error}</span>
            </form>
            <button onClick={goLogin}>Sign In</button>
        </section>
    </main>

}
export default Register
