import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Feedback from '../Feedback/'

class Register extends Component {

    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '', bDate: '', user: null}

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    componentDidMount()
    {
        const {props: user} = this
        if(user)        
            this.setState({ 
                name: user.name,
                surname: user.surname,
                email: user.email,
                bDate: user.bDate ? user.bDate: ''
            })
    }

    componentWillReceiveProps(props) {
        const {user} = props
        if(user)
            this.setState({ 
                user: user,
                name: user.name,
                surname: user.surname,
                email: user.email,
                bDate: user.bDate ? user.bDate: ''
            })
    }

    onSubmitClick = event => {
        event.preventDefault()

        const { state: { name, surname, email ,password, passwordConfirmation, bDate }, props:{onRegister} } = this

        onRegister(name, surname, email ,password, passwordConfirmation, bDate)

        this.setState({password: '', passwordConfirmation: ''})
    }

    render() {

        const { handleInput, props: {registerFeedback}, state: {user} } = this


        return <section className="register">
        <div className="block registerPanel">
            <div className="columns is-mobile is-centered has-text-centered">
                <div className="column is-two-thirds-mobile is-one-third-tablet is-one-fifth-widescreen">
                    <form onSubmit={this.onSubmitClick}>
                        <div className="control">
                            <input className="input" type="text" name="name" placeholder="Name" onChange={handleInput}  value={this.state.name} required />
                        </div>
                        <div className="control">
                            <input className="input" type="text" name="surname" placeholder="Surname" onChange={handleInput} value={this.state.surname} required />
                        </div>
                        <div className="control">
                            <input className="input" type="email" name="email" placeholder="email" onChange={handleInput} value={this.state.email} required />
                        </div>
                        {user && <div className="control">
                            <input className="input" type="date" name="bDate" placeholder="birth date" onChange={handleInput} value={this.state.bDate} required />
                        </div>}
                        <div className="control">
                            <input className="input" type="password" name="password" placeholder="password" onChange={handleInput} required={user ? false: true} />
                        </div>
                        <div className="control">
                            <input className="input" type="password" name="passwordConfirmation" placeholder="password confirmation" onChange={handleInput} required={user && this.state.password.length ==  0 ? false: true} />
                        </div>
                        <button className="button is-fullwidth is-success is-outlined" type="submit"><strong>{user ? 'Save changes': 'Register' }</strong></button>
                    </form>
                </div>    
            </div> 
            <div className="columns is-mobile is-centered has-text-centered login">
                    <div className="column">  
                        {!user && <p>Already a memeber? go to <Link to="/login"> login</Link></p>}
                        {user && <p>Let the password empty if you don't want to change it</p>}
                    </div>     
            </div>
        </div>
            {registerFeedback && < Feedback message={registerFeedback} />}
        </section>
    }
}

export default Register;

