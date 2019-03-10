'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'

import Register from '../Register'
import Login from '../Login'
import LandingPage from '../LandingPage'
import Header from '../Header'
import Aside from '../Aside'

class App extends Component {

    isLoginOrRegister = () => {
        const pathname = this.props.location.pathname
        return (
            pathname.includes('login') || pathname.includes('register')
        )
    }

    render() {
        return <main className="app">
            {!this.isLoginOrRegister() && <Header/>}
            {/* <Aside></Aside> */}
            <Route exact path="/register" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Register/>} />
            <Route exact path="/login" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Login />} />
            <Route exact path="/" render={() => <LandingPage />}/>
        </main>
    }
}
export default withRouter(App)