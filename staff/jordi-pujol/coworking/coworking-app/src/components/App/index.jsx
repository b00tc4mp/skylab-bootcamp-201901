'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

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
                .then(workspaceId => {
                    return logic.addUserToWorkspace(workspaceId)})
                .then(() => this.props.history.push('/home/inbox'))
                .catch((error) => console.log(error)) //print it
        }
        else {
            logic.logInUser(email, password)
                .then(() => this.props.history.push('/home/inbox'))
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
            <Route exact path='/register' render={() => !logic.isUserLoggedIn? <Register onRegister={handleRegister}/> : <Redirect to='/home/inbox'/>} />
            <Route path='/login/:link' render={(props) => !logic.isUserLoggedIn? <Login onLogin={handleLogin} link={props.match.params.link}/> : <Redirect to='/home/inbox'/>} />
            <Route exact path='/login' render={(props) => !logic.isUserLoggedIn? <Login onLogin={handleLogin} link={props.match.params.link}/> : <Redirect to='/home/inbox'/>} />
            <Route exact path='/workspace' render={() => !logic.isUserLoggedIn? <Workspace onNewWorkspace={handleNewWorkspace}/> : <Redirect to='/home/inbox'/>} />
            {/* <Route path='/home' render={()=> <Redirect to='/home/inbox'/>}/>  */}
            <Route path='/home' render={() => logic.isUserLoggedIn? <Home /> : <Redirect to='/login'/>} />
        </main>
    }
}

export default withRouter(App)