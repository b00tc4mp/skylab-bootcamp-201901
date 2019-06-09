import React, { useState } from 'react'

function Register({ onRegister }) {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()

        onRegister(name, surname, email, password, confirmPassword)
    }

    return <>
        <form className="uk-form-horizontal uk-margin-large" onSubmit={handleSubmit}>
            <div className="uk-margin">
                <label className="uk-form-label">Name</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="text" name="name" placeholder="Place your awesome name" required onChange={e => setName(e.target.value)}/>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label">Surname</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="text" name="surname" placeholder="and your surname" required onChange={e => setSurname(e.target.value)}/>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label">Email</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="email" name="email" placeholder={(name && surname) ? 'Maybe this...  '+ name.replace(/\s/g, '').toLowerCase() + '.' + surname.replace(/\s/g, '').toLowerCase() + '@mail.com :)' : 'Email'} required onChange={e => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label">Password</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="password" name="password" placeholder="Sshhhhh... don't say your password" required onChange={e => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label">Confirm Password</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="password" name="confirmPassword" placeholder="Repeat your password" required onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label"></label>
                <div className="uk-form-controls">
                    <button className="uk-button">Sign up</button>
                </div>
            </div>
        </form>
    </>
}

export default Register