import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic/'
import Feedback from '../Feedback/'
import Header from '../Header/index'
import Footer from '../Footer/index'

class Register extends Component {

    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '', registerFeedback: null }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    onSubmitClick = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation } } = this

        this.handleRegister(name, surname, email, password, passwordConfirmation)
    }


    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .catch(({ message }) => this.setState({ registerFeedback: message }))
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }


    render() {

        const { handleInput, state: { registerFeedback } } = this

        return <section>
            <header>
                <Header />
            </header>

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
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" placeholder="password" onChange={handleInput} required />
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input type="password" name="passwordConfirmation" placeholder="password confirmation" onChange={handleInput} required />
                </div>
                <button type="submit"><strong>Register </strong></button>
            </form>
            <div>
                <button> <Link to="/Login/"> To Login</Link></button>
            </div>

            {registerFeedback && < Feedback message={registerFeedback} />}
            <footer>
                <Footer />
            </footer>
        </section>
    }
}

export default Register;

