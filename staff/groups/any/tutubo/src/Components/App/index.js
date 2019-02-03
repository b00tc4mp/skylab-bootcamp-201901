'use strict'

import React, {Component} from 'react'

import Register from '../Register'

import './index.sass'
import logic from '../../logic';

class App extends Component {
    state = { registerVisual: false, loginVisual: false}

    handleRegister = (name, surname, email, password, passswordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passswordConfirmation)
                .then(user => {
                    this.setState({registerVisual: false, loginVisual: true})
                })
                .catch(/* set state of feedback message */)
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleGoToRegister = () => {
        this.setState({ registerVisual: true })
    }

    render() {
        const { state: { registerVisual }, handleRegister, handleGoToRegister } = this
        return <section>
            <button onClick={handleGoToRegister}>Register</button>
            {registerVisual && <Register onRegister={handleRegister}/>}
        </section>
    }
}

export default App