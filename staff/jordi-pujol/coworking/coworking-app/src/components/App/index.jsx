'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import logic from '../../logic'
import Workspace from '../Create-workspace'

class App extends Component {

    state = { loginFeedback: null, registerFeedback: null, workspaceFeedback: null }

    handleRegister = (name, surname, email, password, passwordConfirm) => {
        try {
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => this.props.history.push('/login'))
                .catch(({ message }) => this.setState({ registerFeedback: message }))
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }

    }

    handleLogin = (email, password, link) => {

        try {
            if (link) {

                return logic.logInUser(email, password)
                    .then(() => logic.verifyNewUserLink(link))
                    .then(workspaceId => {
                        return logic.addUserToWorkspace(workspaceId)
                    })
                    .then(() => this.props.history.push('/home/inbox'))
                    .catch(({ message }) => this.setState({ loginFeedback: message }))
            }
            else {
                logic.logInUser(email, password)
                    .then(() => this.props.history.push('/home/inbox'))
                    .catch(({ message }) => this.setState({ loginFeedback: message }))
            }
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    handleNewWorkspace = (email, password, name) => {
        try {
            return logic.logInUser(email, password)
                .then(token => logic.createWorkspace(name, token))
                .then(() => this.props.history.push('/home'))
                .catch(({ message }) => this.setState({ workspaceFeedback: message }))
        }
        catch ({ message }) {
            this.setState({ workspaceFeedback: message })
        }
    }

    render() {

        const { state: { loginFeedback, registerFeedback, workspaceFeedback }, handleLogin, handleRegister, handleNewWorkspace } = this

        return <main className='app'>
            <Route exact path='/register' render={() => !logic.isUserLoggedIn ? <Register onRegister={handleRegister} feedback={registerFeedback} /> : <Redirect to='/home/inbox' />} />
            <Route path='/login/:link' render={(props) => !logic.isUserLoggedIn ? <Login onLogin={handleLogin} feedback={loginFeedback} link={props.match.params.link} /> : <Redirect to='/home/inbox' />} />
            <Route exact path='/login' render={(props) => !logic.isUserLoggedIn ? <Login onLogin={handleLogin} feedback={loginFeedback} link={props.match.params.link} /> : <Redirect to='/home/inbox' />} />
            <Route exact path='/workspace' render={() => <Workspace onNewWorkspace={handleNewWorkspace} feedback={workspaceFeedback} />} />
            {/* <Route path='/home' render={()=> <Redirect to='/home/inbox'/>}/>  */}
            <Route path='/home' render={() => logic.isUserLoggedIn? <Home /> : <Redirect to='/login' />} />
        </main>
    }
}

export default withRouter(App)