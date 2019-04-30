import React, {Fragment } from 'react'

function Login({onLogin, error}){
    

    function handleSubmit(event) {

        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        onLogin(username, password)

    }




    return <Fragment>

<h2>Login</h2>
<form onSubmit={handleSubmit}>
    <input type="text" name="username" placeholder="Email" />
    <input type="password" name="password" placeholder="Password" />
    <button>Send</button>
    <span>{error}</span>
</form>

    </Fragment>
}

export default Login