import React from 'react'
import literals from './literals'
import price from './price'



function Register({ lang, onRegister/*, error */}) {

    const { title, fullname, email, password, confirmPassword } = literals[lang]


    function handlesubmit(event) {
        event.preventDefault()

        const {
            fullname: { value: fullname },
            email: { value: email },
            password: { value: password },
            confirmPassword: { value: confirmPassword }
        } = event.target

       onRegister(fullname, email, password, confirmPassword, price)
    }


    return <section className="Register">
        <h1>{title}</h1>
        <form onSubmit={handlesubmit}>

            <input type="text" fullname="fullname" placeholder={fullname} />
            <input type="text" name="username" placeholder={email} />
            <input type="password" name="password" placeholder={password} />
            <input type="password" name="confirmpassword" placeholder={confirmPassword} />
            <button>{title}</button>

        </form>
    </section>
}



export default Register
