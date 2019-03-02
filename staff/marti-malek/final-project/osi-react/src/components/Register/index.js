import React, { Component } from 'react'

class Register extends Component {
    render() {
        return <section>
            <form>
                <label>Name</label>
                <input name="name" type="text" placeholder="John"></input>
                <label>Surname</label>
                <input name="surname" type="text" placeholder="Doe"></input>
                <label>Email</label>
                <input name="email" type="email" placeholder="something@example.com"></input>
                <label>Password</label>
                <input name="password" type="password" placeholder="Must have at least 8 characters"></input>
                <label>Password Confirmation</label>
                <input name="passwordConfirm" type="password" placeholder="Must have at least 8 characters"></input>
            </form>
        </section>
    }
}

export default Register
