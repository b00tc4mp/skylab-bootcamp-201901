import React, { useState, Fragment } from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'
import Login from '../Login'
import Register from '../Register'
import Navbar from '../NavBar'
import Landing from '../Landing'
import RestautantResults from '../RestaurantResults'
import EventCategories from '../EventCategories'
import EventsNearMe from '../EventsNearMe'
import EventsMap from '../EventsMap'

export default withRouter (function App() {
    return (
        <Fragment>
            <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to = '/restaurant-results'/> : <Login/>}/>
            <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to = '/restaurant-results'/> : <Register/>}/>
            <Route path="/landing" render={() => logic.isUserLoggedIn ? <Redirect to = '/restaurant-results'/> : <Landing/>}/>
            <Route path="/restaurant-results" render={() => logic.isUserLoggedIn ? <RestautantResults/> : <Redirect to = '/landing'/>}/>
            <Route path="/event-categories" render={() => logic.isUserLoggedIn ? <EventCategories/> : <Redirect to = '/landing'/>}/>
            <Route path="/events-nearme" render={() => logic.isUserLoggedIn ? <EventsNearMe/> : <Redirect to = '/landing'/>}/>
            <Route path="/events-map" render={() => logic.isUserLoggedIn ? <EventsMap/> : <Redirect to = '/landing'/>}/>
        </Fragment>
    )
})

