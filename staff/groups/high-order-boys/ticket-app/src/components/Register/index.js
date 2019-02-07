import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic/'
import Feedback from '../Feedback/'

class Register extends Component {

    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '', bDate: ''}

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    onSubmitClick = event => {
        event.preventDefault()

        const { state: { name, surname, email ,password, passwordConfirmation }, props:{onRegister} } = this

        onRegister(name, surname, email ,password, passwordConfirmation)
    }
    render() {

        const { handleInput, props: {registerFeedback, user} } = this
        return <section>


            <form onSubmit={this.onSubmitClick}>
                <div>

                    <label>name: </label>
                    <input type="text" name="name" placeholder="Name" onChange={handleInput} required />
                </div>
                <div >
                    <label >surname: </label>
                    <input type="text" name="surname" placeholder="Surname" onChange={handleInput} required />
                </div>
                <div>
                    <label >Email: </label>
                    <input type="email" name="email" placeholder="email" onChange={handleInput} required />
                </div>
                {user && <div>
                    <label >Birth date: </label>
                    <input type="date" name="bDate" placeholder="birth date" onChange={handleInput} required />
                </div>}
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" placeholder="password" onChange={handleInput} required />
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input type="password" name="passwordConfirmation" placeholder="password confirmation" onChange={handleInput} required />
                </div>
                <button type="submit"><strong>{user ? 'Save changes': 'Register' }</strong></button>
            </form>
            <div>
                <button> <Link to="/login"> To Login</Link></button>
            </div>

            {registerFeedback && < Feedback message={registerFeedback} />}
        </section>
    }
}

export default Register;

