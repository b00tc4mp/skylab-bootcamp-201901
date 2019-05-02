import React from 'react'
import literals from './literals'
import './index.sass'

function Register ({lang, onRegister, error }) {

    const {title, name, surname, email, password, password2, reset} = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const {
            name : {value: name},
            surname : {value: surname},   
            username : {value: username},  
            password : {value: password},
            password2 : {value: password2}
        } = e.target
        
        onRegister(name, surname, username, password, password2)
    }


    return <section className='main-register'>
    <div className='register-container'>
            <h2 className='title'>{title}</h2>
            <form onSubmit = {handleSubmit}>
                <input className="input field"  type="text" name="name" placeholder={name} autoFocus/>
                <input className="input field" type="text" name="surname" placeholder={surname}/>
                <input className="input field" type="email" name="username" placeholder={email}/>
                <input className="input field" type="password" name="password" placeholder={password}/>
                <input className="input field" type="password" name="password2" placeholder={password2}/>
                <input className="button is-rounded is-primary" type="submit" value={title}/>
                <input className="button is-rounded is-primary" type="reset" value={reset}/>
                <span className="help is-danger">{error}</span>
            </form>
            </div>
        </section>
}

export default Register