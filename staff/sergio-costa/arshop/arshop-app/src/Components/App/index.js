'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import Register from '../Register'
import Login from '../Login'
import './index.sass'

class App extends Component {

    render() {
        return <main className="app">
            <Route path="/register" render={() => <Register/>} />
            <Route path="/login" render={() => <Login />} />
        </main>
    }
}
export default withRouter(App)