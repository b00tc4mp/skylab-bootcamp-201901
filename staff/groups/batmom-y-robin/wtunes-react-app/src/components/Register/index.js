import React from 'react'
import Toast from '../Toast'
import './index.sass' 

function Register({onRegister, error}){
let city
    function onCityChange(e){
        city=e
    }
    function handleSubmit(e) {
        e.preventDefault()
        
        const {
            name: { value: name },
            surname: { value: surname },
            username: { value: username },
            password: { value: password },
        } = e.target

        onRegister(name, surname, username, password, city)
    }
    return <main className="mainregister">
        <section className="column is-6-desktop is-6-tablet is-10-mobile is-one-fifth">
            <div className="has-text-centered field">
                <h2 className="title is-2">Weatunes</h2>
                <p className="subtitle"> Sign up with your email address</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input className="input field" type="text" name="name" placeholder="name"/>
                <input className="input field" type="text" name="surname" placeholder="surname"/>
                <input className="input field" type="text" name="username" placeholder="email"/>
                <input className="input field" type="password" name="password" placeholder="password" />
                <div className="select field is-fullwidth">
                    <select name="city" onChange={event => onCityChange(event.target.value)}>
                        <option value="">City</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Auckland">Auckland</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Buenos Aires">Buenos Aires</option>
                        <option value="Cape Town">Cape Town</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Helsinki">Helsinki</option>
                        <option value="London">London</option>
                        <option value="New York">New York</option>
                        <option value="Paris">Paris</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Warsaw">Warsaw</option>
                    </select>
                </div>
                <button className="button is-fullwidth is-primary">Sign Up</button>
                {error && <Toast error={error}/>}
            </form>
        </section>
    </main>

}
export default Register