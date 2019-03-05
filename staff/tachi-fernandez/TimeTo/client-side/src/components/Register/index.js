import React, { Component } from 'react'
import { Link } from 'react-router-dom' 



class Register extends Component {

    state = {name: null, surname: null, email: null, password: null, passwordConfirmation: null}

    handleNameInput = event => this.setState ({name: event.target.value})
    handleSurnameInput = event => this.setState({surname: event.target.value})
    handleAgeInput = event => this.setState({ age:event.target.value })
    handleDescriptionInput = event => this.setState({ description:event.target.value })
    handleEmailInput = event => this.setState ({email: event.target.value})
    handlePasswordInput = event => this.setState({password: event.target.value})
    handlePasswordConfirmInput = event => this.setState({passwordConfirmation: event.target.value})

    handleOnSubmit = event => {
        event.preventDefault()
        const { state: {name, surname, age, description, email, password, passwordConfirmation}, props: {onRegister}} = this

        onRegister(name, surname, age, description, email, password, passwordConfirmation)
    }

  

    render(){

        const {handleOnSubmit, handleNameInput, handleSurnameInput, handleAgeInput, handleDescriptionInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput} = this

        return (
    
        <section className="register columns">
              <h1 className="title">Register</h1>
           <form onSubmit={handleOnSubmit}>
                <label className="label">Name</label>
                  <input onChange={handleNameInput} className="input" type="text" placeholder="Name" required />
                  <label className="label">Surname</label>
                    <input onChange={handleSurnameInput} className="input" type="text" placeholder="Surname" required />
                    <label className="label">Age</label>
                    <input onChange={handleAgeInput} className="input" type="number" placeholder="Age" required />
                    <label className="label">Description</label>
                    <input onChange={handleDescriptionInput} className="input" type="text" placeholder="Description" required />
                <label className="label">Email</label>
                  <input onChange={handleEmailInput} className="input" type="email" placeholder="Email"  required />
                  <label className="label">Password</label>
                    <input onChange={handlePasswordInput} className="input" type="password" placeholder="Password" required />
                  <label className="label">Confirm Password</label>
                    <input onChange={handlePasswordConfirmInput} className="input" type="password" placeholder="Confirm Password" required />
                      <button className="button is-success">Register</button>
                      <div>
                    <Link to="/home" className="button">Go home</Link>
                    </div>
                    <div>
                    <Link to="/login" className="button">Login</Link>
                    </div>

                      
           </form>
        </section>

        )

    }
}

export default Register