import React, { Component, Fragment } from 'react'
import logic from '../logic'
// import LanguageSelector from './LanguageSelector'
import Landing from './Landing'
import Register from './Register'
// import RegisterOk from './RegisterOk'
// import Login from './Login'
// import Home from './Home'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'


class App extends Component {
  state = { error: null }


  handleRegister = (alias, username, password) => {
    try {
      logic.registerUser(alias, username, password)
        .then(() => this.props.history.push('/login')
        )
        .catch(error =>
          this.setState({ error: error.message })
        )
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  handleLoginNavigation = () => this.props.history.push('/login')

  handleRegisterNavigation = () => this.props.history.push('/register')



  render() {

    const {
      state: { error },
      handleRegisterNavigation,
      handleLoginNavigation,
      handleRegister
    } = this

    return <Fragment>
      <Switch>
        <Route exact path="/" render={() =>
          <Landing onClickRegister={handleRegisterNavigation} onClickLogin={handleLoginNavigation} />
        } />
        <Route path="/register" render={() =>
          <Register onRegister={handleRegister} error={error} />
        } />

        <Redirect to="/" />
      </Switch>
    </Fragment>
  }
}

export default withRouter(App)
