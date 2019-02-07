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
        return <section className="register">
        <div className="block registerPanel">
            <div className="columns is-mobile is-centered has-text-centered">
                <div className="column is-two-thirds-mobile is-one-third-tablet is-one-fifth-widescreen">
                    <form onSubmit={this.onSubmitClick}>
                        <div className="control">
                            <input className="input" type="text" name="name" placeholder="Name" onChange={handleInput} required />
                        </div>
                        <div className="control">
                            <input className="input" type="text" name="surname" placeholder="Surname" onChange={handleInput} required />
                        </div>
                        <div className="control">
                            <input className="input" type="email" name="email" placeholder="email" onChange={handleInput} required />
                        </div>
                        {user && <div className="control">
                            <input className="input" type="date" name="bDate" placeholder="birth date" onChange={handleInput} required />
                        </div>}
                        <div className="control">
                            <input className="input" type="password" name="password" placeholder="password" onChange={handleInput} required />
                        </div>
                        <div className="control">
                            <input className="input" type="password" name="passwordConfirmation" placeholder="password confirmation" onChange={handleInput} required />
                        </div>
                        <button className="button is-fullwidth is-success is-outlined" type="submit"><strong>{user ? 'Save changes': 'Register' }</strong></button>
                    </form>
                </div>    
            </div> 
            <div className="columns is-mobile is-centered has-text-centered login">
                    <div className="column">  
                        <p>Already a memeber? go to <Link to="/login"> login</Link></p>
                    </div>     
            </div>
        </div>
            {registerFeedback && < Feedback message={registerFeedback} />}
        </section>
    }
}

export default Register;

