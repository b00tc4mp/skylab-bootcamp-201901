import React from 'react'
import literals from './literals'

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


    return <section>
            <h2>{title}</h2>
            <form onSubmit = {handleSubmit}>
                <input type="text" name="name" placeholder={name} autoFocus/>
                <input type="text" name="surname" placeholder={surname}/>
                <input type="email" name="username" placeholder={email}/>
                <input type="password" name="password" placeholder={password}/>
                <input type="password" name="password2" placeholder={password2}/>
                <input type="submit" value={title}/>
                <input type="reset" value={reset}/>
                <span>{error}</span>
            </form>
        </section>
}

export default Register