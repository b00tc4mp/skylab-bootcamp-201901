import React, { Component } from 'react'
import './index.sass'

class Login extends Component {
    render () {
        return <section>
            <form className="login">
                <label>Email</label>
                <input className="login__name" name="email" type="email" placeholder="something@example.com"></input>
                <label>Password</label>
                <input className="login__password" name="password" type="password" placeholder="Must have at least 8 characters"></input>
            </form>
        </section>
    }
}

export default Login
