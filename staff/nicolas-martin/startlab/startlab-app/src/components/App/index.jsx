import React, { Component } from 'react'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

// App components
import Header from '../Header/index'
import Home from '../Home/index'
import Register from '../Register/index'
import Login from '../Login/index'
import ExerciseList from '../ExerciseList/index'
import ExerciseForm from '../ExerciseForm/index'
import NotFound from '../NotFound/index'

import logic from '../../logic'

class App extends Component {
  state = {
    registerFeedback: null,
    isLoggedIn: logic.isUserLoggedIn,
    loginFeedback: null,
    isAdmin: logic.isAdmin,
    exercisesFeedback: null
  }

  handleRegister = (name, surname, email, password, passwordConfirmation) => {
    try {
      logic.registerUser(name, surname, email, password, passwordConfirmation)
        .then(() => this.props.history.push('/login'))
        .catch(({ message }) => this.showFeedbackRegister(message))
    } catch ({ message }) {
      this.showFeedbackRegister(message)
    }
  }

  handleLogin = (email, password) => {
    try {
      logic.logInUser(email, password)
        .then(() => {
          this.setState({ loginFeedback: null, isAdmin: logic.isAdmin, isLoggedIn: logic.isUserLoggedIn })
        })
        .catch(({ message }) => this.showFeedbackLogin(message))
    } catch ({ message }) {
      this.showFeedbackLogin(message)
    }
  }

  handleLogout = (event) => {
    event.preventDefault()
    logic.logOutUser()
    this.setState({ isAdmin: false, isLoggedIn: false })
    this.props.history.push('/')
  }

  showFeedbackRegister = (message) => {
    this.setState({ registerFeedback: message })
    setTimeout(() => this.setState({ registerFeedback: null }), 3000)
  }

  showFeedbackLogin = (message) => {
    this.setState({ loginFeedback: message })
    setTimeout(() => this.setState({ loginFeedback: null }), 3000)
  }

  onEdit = (id) => {
    console.log('app - onEdit: ', id)
    this.props.history.push(`/admin/exercise/${id}`)
  }

  render() {
    const { state: { isLoggedIn, isAdmin, registerFeedback, loginFeedback, exercisesFeedback},
      handleRegister,
      handleLogin,
      handleLogout,
      onEdit
    } = this

    return (
      <div className="container">
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogOut={handleLogout} />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/register/" render={() => !isLoggedIn ? <Register onRegister={handleRegister} feedback={registerFeedback} /> : <Redirect to='/' />} /> :
          <Route exact path="/login" render={() => !isLoggedIn ? <Login onLogin={handleLogin} feedback={loginFeedback} /> : <Redirect to='/' />} />

          <Route exact path="/admin/exercises" render={() => isAdmin ? <ExerciseList feedback={exercisesFeedback} handleEdit={onEdit} /> : <Redirect to='/' />} />
          <Route exact path="/admin/exercise/:ExerciseId" render={props => isAdmin ? <ExerciseForm id={props.match.params.ExerciseId} /> : <Redirect to='/' />} />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)




