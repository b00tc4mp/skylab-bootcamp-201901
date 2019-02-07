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
                user: user,
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
        return <section>


            <form onSubmit={this.onSubmitClick}>
                <div>
                    <label>name: </label>
                    <input type="text" name="name" placeholder="Name" onChange={handleInput}  value={this.state.name} required />
                </div>
                <div >
                    <label >surname: </label>
                    <input type="text" name="surname" placeholder="Surname" onChange={handleInput} value={this.state.surname} required />
                </div>
                <div>
                    <label >Email: </label>
                    <input type="email" name="email" placeholder="email" onChange={handleInput} value={this.state.email} required />
                </div>
                {user && <div>
                    <label >Birth date: </label>
                    <input type="date" name="bDate" placeholder="birth date" onChange={handleInput} value={this.state.bDate}/>
                </div>}
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" placeholder="password" onChange={handleInput} required={user ? false: true} />
                </div>
                {this.state.password.length > 0 && <div>
                    <label>Confirm Password: </label>
                    <input type="password" name="passwordConfirmation" placeholder="password confirmation" onChange={handleInput} required={user && this.state.password.length ==  0 ? false: true} />
                </div>}
                <button type="submit"><strong>{user ? 'Save changes': 'Register' }</strong></button>
            </form>
            <div>
                {!user &&  <button> <Link to="/login"> To Login</Link></button>}
                {user && <p>Let the password empty if you don't want to change it</p>}
            </div>
                
            {registerFeedback && < Feedback message={registerFeedback} />}
        </section>
    }
}

export default Register;

