//import React, { useState, useEffect, Fragment }  from 'react';
import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import { AppContext } from '../AppContext'
import logic from '../../logic'



import Header from '../Header'
import Landing from '../Landing'
import Register from '../Register'
import RegisterOk from '../RegisterOk'
import Login from '../Login'
import Home from '../Home'


class App extends Component {
  state = { lang: 'en', visible: null, error: null }

  handleRegisterNavigation = () => this.props.history.push('/register')

  handleLoginNavigation = () => this.props.history.push('/login')

  handleRegister = (name, surname, email, password) => {
    try {
        logic.registerUser(name, surname, email, password)
            .then(() =>
                this.setState({ visible: 'register-ok', error: null })
            )
            .catch(error =>
                this.setState({ error: error.message })
            )
    } catch ({ message }) {
        this.setState({ error: message })
    }
  }


  handleLogin = (email, password) => {
    try {
        logic.loginUser(email, password)
            .then(() =>
                logic.retrieveUser()
            )
            .then(({ name }) => {
                this.setState({ error: null }, () => this.props.history.push('/home'))
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
      handleLanguageChange,
      handleRegisterNavigation,
      handleLoginNavigation,
      handleLogin,
      handleRegister,
      handleLogout
    } = this

    return <>
        <Header lang={lang}/>

        <Switch>
            <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing lang={lang} onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />

            <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> :
                visible !== 'register-ok' ?
                    <Register lang={lang} onRegister={handleRegister} error={error} /> :
                    <RegisterOk lang={lang} onLogin={handleLoginNavigation} />
            } />

            <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login lang={lang} onLogin={handleLogin} error={error} />} />

            <Route path="/home" render={() => logic.isUserLoggedIn ? <Home lang={lang} onLogout={handleLogout} /> : <Redirect to="/" />} />

            <Redirect to="/" />
        </Switch>
    </>
  }
}
  


// function App(props) {

//   const [userLanguage, setUserLanguage] = useState('en')
//   /*
//   useEffect(() => {
//     logic.isUserLoggedIn && logic.retrieveUser()
//         .then(user => setUserLanguage(user.language))
//   }, [userLanguage])
//   */


//   return (
//     <>
//         <AppContext.Provider value={{ userLanguage, setUserLanguage }}>
//           <Header/>
//           <Route exact path="/" render={()=> <Landing />} />
 
          
//         </AppContext.Provider>
//     </>
//   )
// }

export default withRouter(App)
