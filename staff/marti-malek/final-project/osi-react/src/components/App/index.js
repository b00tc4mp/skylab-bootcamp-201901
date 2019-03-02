import React, { Component } from 'react';
import { Route, withRouter, BrowserRouter as Router } from 'react-router-dom'
import './index.sass';
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'

class App extends Component {

  handleGoToLogin = () => {
    this.props.history.push('/login')

  }

  render() {

    const { handleGoToLogin } = this

    return <main className="App">
      <Route exact path="/" render={() => <Landing goToLogin={handleGoToLogin} />}></Route>
      <Route path="/login" render={() => <Login />}></Route>
      <Route path="/register" render={() => <Register />}></Route>
    </main>
  }
}

export default withRouter(App);
