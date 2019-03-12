import React, { Component } from 'react'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

// App components
import Header from '../Header'
import Home from '../Home'
import Register from '../Register'
import Login from '../Login'
import ExerciseList from '../ExerciseList'
import ExerciseForm from '../ExerciseForm'
import InvitationForm from '../InvitationForm'
import Start from '../Start'
import NotFound from '../NotFound'

import logic from '../../logic'
import InvitationList from '../InvitationList';

class App extends Component {
  state = {
    registerFeedback: null,
    isLoggedIn: logic.isUserLoggedIn,
    loginFeedback: null,
    isAdmin: logic.isAdmin,
    exercisesFeedback: null,
    invitationsFeedback: ''
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

  onExerciseEdit = (id) => this.props.history.push(`/admin/exercise/${id}`)
  onInvitationEdit = (id) => this.props.history.push(`/admin/invitation/${id}`)

  onNew = () => this.props.history.push('/admin/exercise/new')

  handleNew = (message) => {
    this.setState({ exercisesFeedback: message })
    this.props.history.push('/admin/exercises')
  }

  handleNewInvitation = (message) => {
    this.setState({ invitationsFeedback: message })
    this.props.history.push('/admin/invitations')
  }

  onNewInvitation = () => this.props.history.push('/admin/invitation/new')

  onEditInvitation = (id) => this.props.history.push(`/admin/invitation/${id}`)

  onEdit = id => this.props.history.push(`/admin/exercise/${id}`)

  handleStart = () => this.props.history.push('/start')

  render() {
    const { state: { isLoggedIn, isAdmin, registerFeedback, loginFeedback, exercisesFeedback, invitationsFeedback },
      handleRegister,
      handleLogin,
      handleLogout,
      onEdit,
      onNew,
      handleNew,
      onNewInvitation,
      handleStart,
      onEditInvitation,
      handleNewInvitation
    } = this

    return (
      <div className="container">
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogOut={handleLogout} />
        <Switch>
          <Route exact path="/" render={() => <Home onStart={handleStart} />} />
          <Route exact path="/start" component={Start} />

          <Route exact path="/register/" render={() => !isLoggedIn ? <Register onRegister={handleRegister} feedback={registerFeedback} /> : <Redirect to='/' />} /> :
          <Route exact path="/login" render={() => !isLoggedIn ? <Login onLogin={handleLogin} feedback={loginFeedback} /> : <Redirect to='/' />} />

          <Route exact path="/admin/exercises" render={() => isAdmin ? <ExerciseList feedbackNew={exercisesFeedback} handleEdit={onEdit} handleNew={onNew} /> : <Redirect to='/' />} />
          <Route exact path="/admin/exercise/new" render={() => isAdmin ? <ExerciseForm onNew={handleNew} /> : <Redirect to='/' />} />
          <Route exact path="/admin/exercise/:exerciseId" render={props => isAdmin ? <ExerciseForm id={props.match.params.exerciseId} /> : <Redirect to='/' />} />

          <Route exact path="/admin/invitations" render={() => isAdmin ? <InvitationList feedbackNewInvitation={invitationsFeedback} handleEditInvitation={onEditInvitation} handleNewInvitation={onNewInvitation} /> : <Redirect to='/' />} />
          <Route exact path="/admin/invitation/new" render={() => isAdmin ? <InvitationForm onNewInvitation={handleNewInvitation} /> : <Redirect to='/' />} />
          <Route exact path="/admin/invitation/:invitationId" render={props => isAdmin ? <InvitationForm id={props.match.params.invitationId} /> : <Redirect to='/' />} />


          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)




