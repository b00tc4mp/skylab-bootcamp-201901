'use strict'

import React, {Component} from 'react'
import Register from '../Register'
import logic from '../../logic';
import './index.sass'
import Header from '../Header';

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

    handleSearch = query =>{
        console.log(query)
    }

    render() {
        const { state: { registerVisual }, handleRegister, handleGoToRegister, handleSearch } = this
        return <section>
            <Header handleSearch={handleSearch}/>
            <button onClick={handleGoToRegister}>Register</button>
            {registerVisual && <Register onRegister={handleRegister}/>}
        </section>
    }
}

export default App