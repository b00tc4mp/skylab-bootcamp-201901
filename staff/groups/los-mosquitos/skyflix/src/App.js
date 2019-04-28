import React, { Component } from 'react'
import Login from './components/Login'
import i18n from './common/i18n'

class App extends Component {
 
  state = { lang: i18n.language, visible: 'login' }
  handleLogin = (username, password) => {

    //TODO

  }

  render() {
    const {
      state: { lang, visible },
      handleLogin
    } = this
    debugger
    return <>
      {visible === 'login' && <Login lang={lang} onLogin={handleLogin} />}
    </>
  }

}


export default App
