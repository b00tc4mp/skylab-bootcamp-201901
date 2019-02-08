import React, { Component } from 'react'
import Feedback from '../Feedback'

import {withRouter} from 'react-router-dom'

import './index.sass'


class Register extends Component {

    state = {name: null, surname: null, email: null, password: null, passwordConfirmation: null}

    handleNameInput = event => this.setState ({name: event.target.value})
    handleSurnameInput = event => this.setState({surname: event.target.value})
    handleEmailInput = event => this.setState ({email: event.target.value})
    handlePasswordInput = event => this.setState({password: event.target.value})
    handlePasswordConfirmInput = event => this.setState({passwordConfirmation: event.target.value})

    handleOnSubmit = event => {
        event.preventDefault()
        const { state: {name, surname, email, password, passwordConfirmation}, props: {onRegister}} = this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    handleGoBack = event =>{
      event.preventDefault()
      this.props.history.push('/home')
    }

    render(){

        const { handleGoBack, handleOnSubmit, handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput, props: {feedback}} = this

        return (
    
        <section className="register columns">
        <div className="container column is-6">
            <header>
              <h1 class="title">Register</h1>
              <h2 class="subtitle">Enjoy thousands of films and series in a click hit</h2>
            </header>
           <form onSubmit={handleOnSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input onChange={handleNameInput} className="input" type="text" placeholder="Name" />
              </div>
            </div>

              <div className="field">
                  <label className="label">Surname</label>
                  <div className="control">
                    <input onChange={handleSurnameInput} className="input" type="text" placeholder="Surname" />
                  </div>
                </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input onChange={handleEmailInput} className="input" type="email" placeholder="Email"  />
                  <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                  <label className="label">Password</label>
                  <p className="control has-icons-left">
                    <input onChange={handlePasswordInput} className="input" type="password" placeholder="Password" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
              </div>

              <div className="field">
                  <label className="label">Confirm Password</label>
                  <p className="control has-icons-left">
                    <input onChange={handlePasswordConfirmInput} className="input" type="password" placeholder="Confirm Password" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
              </div>

              <div className="button-group">
                  <div className="field">
                      <button className="button is-success">Register</button>
                  </div>
                  <div className="field">
                    <button onClick={handleGoBack} className="button">Go back Home</button>
                  </div>
              </div>
           </form>
           { feedback && <Feedback message={feedback} level="warn" /> }
        </div>
        </section>

        )

    }
}

export default withRouter(Register)