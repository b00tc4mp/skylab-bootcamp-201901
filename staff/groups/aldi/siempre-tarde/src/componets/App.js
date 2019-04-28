import React, { Component } from 'react'
import i18n from '../common/i18n'
import LanguageSelector from './LanguageSelector'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import logic from '../logic'



class App extends Component {
    state = { lang: i18n.language}

    handleLanguageChange = lang => this.setState({ lang: i18n.language = lang })

    
    handleRegister = (name, surname, username, password, password2) => {
        try {
            logic.registerUser(name, surname, username, password, password2)
                .then(() =>
                    this.setState({ error: null })
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogin = (username, password) => {
        try {
            logic.loginUser(username, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then(user => {
                    this.setState({ error: null })
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }


    render() {
        const {
            state: { lang, error },
            handleLanguageChange,
            handleLogin,
            handleRegister
        } = this



        return <>
            <LanguageSelector lang={lang} onLanguageChange={handleLanguageChange} />
            
            <Landing lang={lang} onRegister={()=>console.log('A')} onLogin={()=>console.log('B')}/>
            
            <Register lang={lang} onRegister={handleRegister} error={error} />

            <Login lang={lang} onLogin={handleLogin} error={error} />
            


        </>
    }

}
export default App