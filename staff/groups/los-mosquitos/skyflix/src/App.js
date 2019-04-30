import React, { Component } from 'react'
import Login from './components/Login'
import i18n from './common/i18n'
import logic from './logic';

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

  }

  render() {
    const {
      state: { lang, visible, error },
      handleLogin
    } = this
    return <>
      {visible === 'login' && <Login lang={lang} onLogin={handleLogin} error={error} />}
    </>
  }

}


export default App
