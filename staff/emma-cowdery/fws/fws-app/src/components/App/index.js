import React, { useState, Fragment } from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'
import Login from '../Login'
import Register from '../Register'
import Navbar from '../NavBar'
import Landing from '../Landing'
import RestautantResults from '../RestaurantResults'

export default function App() {
    return (
        <Fragment>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/landing" component={Landing} />
            <Route path="/restaurant-results" component={RestautantResults} />
        </Fragment>
    )
}

