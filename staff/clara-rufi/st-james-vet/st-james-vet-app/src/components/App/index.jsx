import React, { Component, Fragment } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'

import Welcome from '../Welcome'
import Home from '../Home'
import Login from '../Login'
import RegisterOwner from '../RegisterOwner'
import RegisterPet from '../RegisterPet'
import EditOwner from '../EditOwner'
import EditPet from '../EditPet'
import Visit from '../Visit'
import VisitOwner from '../VisitOwner'
import Appointments from '../Appointments';
import logic from '../../logic';


class App extends Component {

    state = { isLoggedIn: logic.isUserLoggedIn, isAdmin: logic.isAdmin, error: null }

    handleLogin = () => this.setState({ isLoggedIn: logic.isUserLoggedIn, isAdmin: logic.isAdmin })

    render() {

        const { state: { isLoggedIn, isAdmin } } = this

        return <Fragment>
            <Route exact path="/" render={() => isLoggedIn ? <Redirect to='home' /> : <Welcome />} />
            <Route path='/welcome' render={() => isLoggedIn ? <Home /> : <Redirect to='/login' />} />
            <Route path='/login' render={() => isLoggedIn ? <Redirect to='/' /> : <Login login={this.handleLogin} />} />
            <Route path='/home' render={() => isLoggedIn ? <Home /> : <Redirect to='/' />} />
            <Route path='/registerOwner' render={() => isAdmin ? <RegisterOwner /> : <Redirect to='/' />} />
            <Route path='/registerPet' render={() => isAdmin ? <RegisterPet /> : <Redirect to='/' />} />

            <Route path='/editOwner' render={() => isAdmin ? <EditOwner /> : <Redirect to='/' />} />
            <Route path='/editPet' render={() => isAdmin ? <EditPet /> : <Redirect to='/' />} />
            <Route path='/visit' render={() => isAdmin ? <Visit /> : <Redirect to='/' />} />
            <Route path='/appointments' render={() => isAdmin ? <Appointments /> : <Redirect to='/' />} />
            <Route path='/visitOwner' render={() => isLoggedIn ? <VisitOwner /> : <Redirect to='/' />} />
        </Fragment>
    }
}

export default withRouter(App)