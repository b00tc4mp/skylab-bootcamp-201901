'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import logic from '../../logic'
import Workspace from '../CreateWorkspace'
import Page404 from '../404'

class App extends Component {

    state = { workspaceFeedback: null }

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

        const { state: { workspaceFeedback }, handleNewWorkspace } = this

        return <main className='app'>
            <Switch>
                <Route exact path='/register' render={() => !logic.isUserLoggedIn ? <Register /> : <Redirect to='/home/inbox' />} />
                <Route path='/login/:link' render={(props) => !logic.isUserLoggedIn ? <Login link={props.match.params.link} /> : <Redirect to='/home/inbox' />} />
                <Route exact path='/login' render={(props) => !logic.isUserLoggedIn ? <Login link={props.match.params.link} /> : <Redirect to='/home/inbox' />} />
                <Route exact path='/workspace' render={() => !logic.isUserLoggedIn ? <Workspace onNewWorkspace={handleNewWorkspace} feedback={workspaceFeedback} /> : <Redirect to='/home/inbox' />} />
                <Route exact path='/' render={() => <Redirect to='/home/inbox' />} />
                <Route path='/home' render={() => logic.isUserLoggedIn ? <Home/> : <Redirect to='/login' />} />
                <Route path='/*' render={() => <Page404 />} />
            </Switch>
        </main>
    }
}

export default withRouter(App)