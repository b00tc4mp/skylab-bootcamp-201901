import React, {Component} from 'react'
import logic from './logic'
import Register from './components/Register'

import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

import './index.sass'

class App extends Component {

  state = { visible: null, error: null, name: null }


  handleRegister(name, email, password) {
    try {
      logic.registerUser(name, email, password)
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


  render() {
    const {
      state: { error, name},
      handleRegister
    } = this

    return <>
    <Switch>
      {/* <Route path="/register" render={() => <Register onRegister={handleRegister} />} /> */}
      <Route exact path='/register' component={Register} />
      </Switch>
    </> 

  }

}
    export default withRouter(App);
