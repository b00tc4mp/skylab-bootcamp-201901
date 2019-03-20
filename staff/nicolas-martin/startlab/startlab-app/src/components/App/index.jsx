import React, { Component } from 'react'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css' 

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
import InvitationList from '../InvitationList'

class App extends Component {
  state = {
    isLoggedIn: logic.isUserLoggedIn,
    isAdmin: logic.isAdmin
  }

  handleRegister = (name, surname, email, password, passwordConfirmation) => {
    try {
      logic.registerUser(name, surname, email, password, passwordConfirmation)
        .then(() => {
          this.emitFeedback('Register sucessfully!', 'success')
          this.props.history.push('/login')
        })
        .catch(({ message }) => this.emitFeedback(message, 'error'))
    } catch ({ message }) {
      this.emitFeedback(message, 'error')
    }
  }

  handleLogin = (email, password) => {
    try {
      logic.logInUser(email, password)
        .then(() => {
          this.emitFeedback('Login sucessfully!', 'success')
          this.setState({ isAdmin: logic.isAdmin, isLoggedIn: logic.isUserLoggedIn })
        })
        .catch(({ message }) => this.emitFeedback(message, 'error'))
    } catch ({ message }) {
      this.emitFeedback(message, 'error')
    }
  }

  emitFeedback = (message, level) => {
    toast.dismiss()
    return toast[level](message, {
      position: 'top-right',
      autoClose: level !== 'error',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  handleLogout = (event) => {
    event.preventDefault()
    logic.logOutUser()
    this.setState({ isAdmin: false, isLoggedIn: false })
    this.props.history.push('/login')
  }

  onExerciseEdit = (id) => this.props.history.push(`/admin/exercise/${id}`)
  onInvitationEdit = (id) => this.props.history.push(`/admin/invitation/${id}`)

  onNew = () => this.props.history.push('/admin/exercise/new')

  handleNew = message => {
    this.emitFeedback(message, 'success')
    this.props.history.push('/admin/exercises')
  }

  handleNewInvitation = message => {
    this.emitFeedback(message, 'success')
    this.props.history.push('/admin/invitations')
  }

  onNewInvitation = () => this.props.history.push('/admin/invitation/new')

  onEditInvitation = (id) => this.props.history.push(`/admin/invitation/${id}`)

  onEdit = id => this.props.history.push(`/admin/exercise/${id}`)

  handleStart = () => this.props.history.push('/start')

  render() {
    const { state: { isLoggedIn, isAdmin },
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
      <div className="app container">
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogOut={handleLogout} />
        <Switch>
          <Route exact path="/" render={() => !isLoggedIn? <Home onStart={handleStart} /> : <Redirect to='/' />} />
          <Route exact path="/start" component={Start} />

          <Route exact path="/register/" render={() => !isLoggedIn ? <Register onRegister={handleRegister} /> : <Redirect to='/' />} />
          <Route exact path="/login" render={() => !isLoggedIn ? <Login onLogin={handleLogin} /> : <Redirect to='/' />} />

          <Route exact path="/admin/exercises" render={() => isAdmin ? <ExerciseList handleEdit={onEdit} handleNew={onNew} /> : <Redirect to='/' />} />
          <Route exact path="/admin/exercise/new" render={() => isAdmin ? <ExerciseForm onNew={handleNew} /> : <Redirect to='/' />} />
          <Route exact path="/admin/exercise/:exerciseId" render={props => isAdmin ? <ExerciseForm id={props.match.params.exerciseId} /> : <Redirect to='/' />} />

          <Route exact path="/admin/invitations" render={() => isAdmin ? <InvitationList handleEditInvitation={onEditInvitation} handleNewInvitation={onNewInvitation} /> : <Redirect to='/' />} />
          <Route exact path="/admin/invitation/new" render={() => isAdmin ? <InvitationForm onNewInvitation={handleNewInvitation} /> : <Redirect to='/' />} />
          <Route exact path="/admin/invitation/:invitationId" render={props => isAdmin ? <InvitationForm id={props.match.params.invitationId} /> : <Redirect to='/' />} />
          <Route component={NotFound} />
        </Switch>
        <ToastContainer />
      </div>
    )
  }
}

export default withRouter(App)




