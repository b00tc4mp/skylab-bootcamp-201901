import React from 'react'
import literals from './literals'



function Register({ lang, onRegister,error}) {

    const { title, fullname, email, password, confirmPassword } = literals[lang]


    function handleSubmit(event) {
        
        event.preventDefault()

        const {
            fullname: { value: fullname },
            email: { value: email },
            password: { value: password },
            confirmPassword: { value: confirmPassword },
        } = event.target

       onRegister(fullname, email, password, confirmPassword)
    }


    return <section className="Register">
        <h1>{title}</h1>
        <form onSubmit={handleSubmit}>

            <input type="text" name="fullname" placeholder={fullname} />
            <input type="text" name="email" placeholder={email} />
            <input type="password" name="password" placeholder={password} />
            <input type="password" name="confirmPassword" placeholder={confirmPassword} />
            <button>{title}</button>
            <span>{error}</span>
        </form>
    </section>
}



export default Register
