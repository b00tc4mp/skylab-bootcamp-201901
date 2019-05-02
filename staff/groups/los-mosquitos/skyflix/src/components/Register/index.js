import React from 'react'
import literals from './literals'
import './index.sass'



function Register({ lang, onRegister, error }) {

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
        <h1 className="text-white">{title}</h1>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <input type="text" className="register form-control" id="formGroupExampleInput" name="fullname" placeholder={fullname} />
                <input type="text" className="register form-control" id="formGroupExampleInput2" name="email" placeholder={email} />
                <input type="password" className="register form-control" id="formGroupExampleInput3" name="password" placeholder={password} />
                <input type="password" className="register form-control" id="formGroupExampleInput4" name="confirmPassword" placeholder={confirmPassword} />
                <button className="btn btn-success btn-primary btn-lg btn-block">{title}</button>
                <span>{error}</span>
            </div>
        </form>
    </section>
}



export default Register
