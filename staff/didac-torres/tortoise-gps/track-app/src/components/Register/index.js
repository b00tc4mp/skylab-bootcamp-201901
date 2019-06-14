import React from 'react'
import './index.sass'

function Register({ onRegister, onBack}) {

    function handleSubmit(e) {
        e.preventDefault()
        const {
            name: { value: name },
            surname: { value: surname },
            username: { value: username },
            password: { value: password },
            password2: { value: password2 }
        } = e.target
        onRegister(name, surname, username, password, password2)
    }


    return <section className='main-register'>
        <div className='register-container'>
        <button className="button-back button is-rounded is-warning is-outlined" onClick={() => onBack()}>BACK</button>
            <h2 className='title-register title'>REGISTER</h2>
            <form className="form-register" onSubmit={handleSubmit}>
                <input className="input-register input field is-rounded is-warning" type="text" name="name" placeholder='Name' autoFocus required />
                <input className="input-register input field is-rounded is-warning" type="text" name="surname" placeholder='Surname' required/>
                <input className="input-register input field is-rounded is-warning" type="email" name="username" placeholder='Email' required />
                <input className="input-register input field is-rounded is-warning" type="password" name="password" placeholder='8 Characters Password' minLength='8' required />
                <input className="input-register input field is-rounded is-warning" type="password" name="password2" placeholder='Repeat Password' required/>
                <div>
                <input className="button-register button is-rounded is-warning" type="submit" value='SEND' />
                <input className="button-register button is-rounded is-warning" type="reset" value='RESET' />
                </div>
            </form>
        </div>
    </section>
}

export default Register