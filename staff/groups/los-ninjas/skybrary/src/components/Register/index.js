import React, {Fragment} from 'react'

function Register({ onRegister, error }) {

function handleSubmit(event){
    event.preventDefault()

    const {
        alias: {value: alias},
        username: {value: username},
        password: {value: password}
    } = event.target

    onRegister(alias, username, password)
}


    return <Fragment>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="alias" placeholder="Alias" />
            <input type="text" name="username" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button>Send</button>
            <span>{error}</span>
        </form>

    </Fragment>
}

export default Register