import React, { Component, Fragment } from 'react'
// import logic from '../logic'
// import LanguageSelector from './LanguageSelector'
import Landing from './Landing'
// import Register from './Register'
// import RegisterOk from './RegisterOk'
// import Login from './Login'
// import Home from './Home'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'


class App extends Component {
  state = {}





  render(){

    const {
      handleRegisterNavigation,
      handleLoginNavigation
    } = this

    return <Fragment>

      <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />

      </Fragment>
    }      
}  
      
  export default App
