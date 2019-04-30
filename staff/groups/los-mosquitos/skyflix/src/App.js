import React, { Component } from 'react';
import i18n from './common/i18n'
import LanguageSelector from './components/LanguageSelector'
import Landing from './components/Landing'
import logic from './logic';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	state = { lang: i18n.language, visible: 'login', error: null }
  handleLogin = (username, password) => {
    try {
      logic.loginUser(username, password)
        .then(() =>
          logic.retrieveUser()
        )
        .then(user => {
          console.log(user.fullname)
        })
        .catch(error =>
          this.setState({ error: error.message })
        )
    } catch ({ message }) {
      this.setState({ error: message })
    }

	handleLanguageChange = lang => this.setState({ lang: i18n.language = lang }) // NOTE setter runs first, getter runs after (i18n)

	handleRegisterNav = () => this.setState({ visible: 'register' })

    handleLoginNav = () => this.setState({ visible: 'login' })


	render() {
		const {
			state: { lang, visible },
			handleLanguageChange,
			handleLoginNav,
			handleRegisterNav,
      handleLogin
		} = this

		return <>
			<LanguageSelector lang={lang} onLanguageChange={handleLanguageChange}/>
			{visible === 'landing' && <Landing lang={lang} onLogin={handleRegisterNav} onRegister={handleLoginNav}/>}
      {visible === 'login' && <Login lang={lang} onLogin={handleLogin} error={error} />}
		</>
	}
}


export default App
