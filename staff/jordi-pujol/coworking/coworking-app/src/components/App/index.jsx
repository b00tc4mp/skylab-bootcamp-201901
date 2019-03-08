'use strict'

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import logic from '../../logic'
import Workspace from '../Create-workspace'

class App extends Component {

    handleRegister = (name, surname, email, password, passwordConfirm) => {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => this.props.history.push('/login'))
            .catch((error) => console.log(error)) //print it

    }

    handleLogin = (email, password, link) => {

        if (link) {

            return logic.logInUser(email, password)
                .then(() => logic.verifyNewUserLink(link))
                .then(workspaceId => logic.addUserToWorkspace(workspaceId))
                .then(()=> console.log('SIIIIII'))
                .then(() => this.props.history.push('/home/inbox'))
                .catch((error) => console.log(error)) //print it
        }
        else {
            logic.logInUser(email, password)
                .then(() => this.props.history.push('/home/inbox'))
                .then(()=> console.log('NOOOOOOO'))
                .catch((error) => console.log(error)) //print it
        }
    }

    handleNewWorkspace = (email, password, name) => {
        logic.logInUser(email, password)
            .then(token => logic.createWorkspace(name, token))
            .then(() => this.props.history.push('/home'))
            .catch((error) => console.log(error)) //print it
    }

    render() {

        const { handleLogin, handleRegister, handleNewWorkspace } = this

        return <main className='app'>
            <Route exact path='/register' render={() => <Register onRegister={handleRegister} />} />
            <Route path='/login/:link' render={(props) => <Login onLogin={handleLogin} link={props.match.params.link} />} />
            <Route exact path='/login' render={(props) => <Login onLogin={handleLogin} link={props.match.params.link} />} />
            <Route exact path='/workspace' render={() => <Workspace onNewWorkspace={handleNewWorkspace} />} />
            <Route path='/home' render={() => <Home />} />
        </main>
    }
}

export default withRouter(App)