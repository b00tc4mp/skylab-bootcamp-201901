
import React, { Component } from 'react'
import logic from './logic'
import i18n from './common/i18n'
import LanguageSelector from './components/language-selector'
import Landing from './components/Landing'
import Login from './components/Login'
import ChoosePlan from './components/ChoosePlan'
import Register from './components/Register'
import logo from './logo.svg'
import './App.css'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import userApi from './data/user-api';


class App extends Component {

  state = { lang: i18n.language, plan: null, error: null }

  handleLanguageChange = lang => this.setState({ lang: i18n.language = lang })

  handleRegister = (fullname, email, password, confirmPassword) => {

    try {
      logic.registerUser(fullname, email, password, confirmPassword, this.state.plan)

        .then(() => { this.setstate(this.props.history.push('/login')) })
        .catch(error => {
          this.setState({ error: error.message })
        })

    } catch (error) {
      this.setState({ error: error.message })
    }
  }

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


  handleSelectedPlan = (plan) => this.setState({ plan }, () => this.props.history.push('/signup/form'))

  handleRegisterNav = () => this.props.history.push('/signup')

  handleLoginNav = () => this.props.history.push('/login')






  render() {
    const {
      state: { lang, error, plan },
      handleLanguageChange,
      handleLoginNav,
      handleRegisterNav,
      handleLogin,
      handleRegister,
      handleSelectedPlan
    } = this


    return <>
      <LanguageSelector lang={lang} onLanguageChange={handleLanguageChange} /> 

      <Switch>
        <Route exact path="/" render={() => <Landing lang={lang} onLogin={handleLoginNav} onRegister={handleRegisterNav} />} />
        <Route path="/signup/form" render={() => plan ? <Register lang={lang} onRegister={handleRegister} plan={plan} error={error} /> : <Redirect to='/signup' />} />
        <Route path="/signup" render={() => <ChoosePlan lang={lang} onSelectedPlan={handleSelectedPlan} />} />
        <Route patch="/login" render={() => <Login lang={lang} onLogin={handleLogin} error={error} />} />

      </Switch>

    </>
  }

}


export default withRouter(App);

