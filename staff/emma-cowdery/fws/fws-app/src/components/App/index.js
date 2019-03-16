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
import Calendar from '../Calendar'
import Chats from '../Chats'
import RightBar from '../RightBar'
import DropDown from '../DropDown'

export default withRouter (function App() {
    const [showRightBar, setShowRightBar] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <Fragment>
            <Route path="/" render={() => <Redirect to = '/landing'/>}/>
            <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to = '/event-categories'/> : <Login/>}/>
            <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to = '/event-categories'/> : <Register/>}/>
            <Route path="/landing" render={() => logic.isUserLoggedIn ? <Redirect to = '/event-categories'/> : <Landing/>}/>
            <Route path="/restaurant-results" render={() => logic.isUserLoggedIn ? <RestautantResults setShowRightBar={setShowRightBar} setShowDropdown={setShowDropdown}/> : <Redirect to = '/landing'/>}/>
            <Route path="/event-categories" render={() => logic.isUserLoggedIn ? <EventCategories setShowRightBar={setShowRightBar} setShowDropdown={setShowDropdown}/> : <Redirect to = '/landing'/>}/>
            <Route path="/events-nearme" render={() => logic.isUserLoggedIn ? <EventsNearMe setShowRightBar={setShowRightBar} setShowDropdown={setShowDropdown}/> : <Redirect to = '/landing'/>}/>
            <Route path="/events-map" render={() => logic.isUserLoggedIn ? <EventsMap setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/> : <Redirect to = '/landing'/>}/>
            <Route path="/calendar" component={Calendar}/>
            <Route path="/chats" render={() => logic.isUserLoggedIn ? <Chats setShowRightBar={setShowRightBar} setShowDropdown={setShowDropdown}/> : <Redirect to = '/landing'/>}/>
            {showRightBar && <RightBar setShowRightBar={setShowRightBar}/>}
            {showDropdown && <DropDown setShowDropdown={setShowDropdown}/>}
        </Fragment>
    )
})

