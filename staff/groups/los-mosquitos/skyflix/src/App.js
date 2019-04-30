import React, { Component } from 'react'
import i18n from './common/i18n'
import LanguageSelector from './components/language-selector'
import ChoosePlan from './components/ChoosePlan'
import Register from './components/Register'
import logic from './logic'
//import logo from './logo.svg'
import './App.css'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import userApi from './data/user-api';


class App extends Component {

  state = { lang: i18n.language, plan: null, error: null }

  handleLanguageChange = lang => this.setState({ lang: i18n.language = lang })

  handleRegister = (fullname, email, password, confirmPassword) => {

    try {
      logic.registerUser(fullname, email, password, confirmPassword, this.state.plan)

        .then(() => { this.setstate(this.props.history.push('/signin')) })
        .catch(error => {
          this.setState({ error: error.message })
        })

    } catch (error) {
      this.setState({ error: error.message })
    }


  }


  handleSelectedPlan = (plan) => this.setState({ plan }, () => this.props.history.push('/signup/form'))






  render() {


    return <>
      <LanguageSelector lang={this.state.lang} onLanguageChange={this.handleLanguageChange} />

      <Switch>

        <Route path="/signup/form" render={() => this.state.plan ? <Register lang={this.state.lang} onRegister={this.handleRegister} plan={this.state.plan} error={this.state.error} /> : <Redirect to='/signup' />} />
        <Route path="/signup" render={() => <ChoosePlan lang={this.state.lang} onSelectedPlan={this.handleSelectedPlan} />} />

      </Switch>

    </>
  }

}



export default withRouter(App);
