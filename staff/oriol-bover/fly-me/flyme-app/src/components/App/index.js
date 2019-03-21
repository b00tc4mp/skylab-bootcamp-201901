import React, { Fragment, useState } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Admin from '../Admin';

function App() {
    const [isDevelopment] = useState(true)

    return (<Fragment>
        <Route exact path="/" component={Landing} />
        <Route path="/login" render={props => logic.isUserLoggedIn ? <Redirect to="/admin" /> : <Login history={props.history} />} />
        <Route path="/register" render={props => logic.isUserLoggedIn ? <Redirect to="/admin" /> : <Register history={props.history} />} />
        <Route path="/admin" render={() => logic.isUserLoggedIn ? <Admin /> : <Redirect to="/login" />} />
    </Fragment>)
}

export default withRouter(App)