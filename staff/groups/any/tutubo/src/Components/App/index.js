'use strict'

import React, {Component} from 'react'
import Register from '../Register'
import logic from '../../logic';
import './index.sass'
import Header from '../Header';
import Login from '../Login'

class App extends Component {
    state = { registerVisual: false, loginVisual: false }

    handleRegister = (name, surname, email, password, passswordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passswordConfirmation)
                .then(() => this.setState({registerVisual: false, loginVisual: true}))
                .catch(/* set state of feedback message */)
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleLogin = (email, password) => {
        try {
            logic.loginUser(email, password)
                .then(() => this.setState({loginVisual: false, homeVisual: true}))
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

    handleLoginButton = () => this.setState({loginVisual: true})

    render() {
        const { state: { registerVisual, loginVisual }, handleGoToRegister, handleSearch, handleLogin, handleRegister, handleLoginButton } = this
        return <section>
            <Header handleSearch={handleSearch} onGoToLogin={handleLoginButton}/>
            {loginVisual && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister}/>}
            {registerVisual && <Register onRegister={handleRegister}/>}
        </section>
    }
}

export default App