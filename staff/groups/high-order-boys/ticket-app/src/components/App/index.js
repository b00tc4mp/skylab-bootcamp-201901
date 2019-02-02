import React, { Component } from 'react'
import './index.sass'
import Login from '../Login'
import logic from '../../logic'

class App extends Component {
    state = { loginFeedback: null, user: { email: '' }}

    handleLogin = (email,password) => {
        try {
            logic.loginUser(email,password)
                .then(user => {
                    this.setState({user})
                })
                .catch(({ message }) => this.setState({ loginFeedback: message }))
        } catch ({message})  {
                this.setState({loginFeedback: message})
            }
        }

    render() {
        const { state: { loginFeedback }, handleLogin } = this

        return <main className = "app">
            < Login onLogin = {handleLogin} feedback = {loginFeedback} />
        </main>
    }
}

export default App