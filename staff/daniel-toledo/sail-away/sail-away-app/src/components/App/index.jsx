'use strict'

import React, { useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Home from '../Home'
import Register from '../Register'
import Welcome from '../Welcome'
import ProfileEdit from '../ProfileEdit'
import ProfileInfo from '../ProfileInfo'
import Users from '../Users'
import Login from '../Login'
import JourneyCreate from '../JourneyCreate'
import JourneyInfo from '../JourneyInfo'
import MyJourneys from '../MyJourneys'
import Nav from '../Nav'
import Menu from '../Menu'
import Landing from '../Landing'
import Favorites from '../Favorites'
import Feedback from '../Feedback'
import NoResult from '../NoResult'

import './index.sass'
import logic from '../../logic';

function App(props) {

    let [journeys, setJourneys] = useState([])
    let [journey, setJourney] = useState(null)
    let [menu, setMenu] = useState('close')
    let [feedback, setfeedback] = useState('')

    // async function handleSearch(seaId) {

    //     try {
    //         let response = await logic.searchBySea(seaId)
    //         setJourneys(response)
    //         setfeedback('')
    //         props.history.push('/home')

    //     } catch (error) {
    //         setfeedback(error.message)
    //     }
    // }

    async function handleMoreInfo(id) {

        try {
            const journey = await logic.retrieveJourney(id)
            setJourney(journey)
            props.history.push(`/journey/${id}`)

        } catch (error) {
            console.error(error)
        }
    }

    function handleEditJourney(id) {

        props.history.push(`/edit-journey/${id}`)

    }

    function handleToggleMenu(open) {
        setMenu(open ? 'open' : 'close')
    }

    return (<main className="app">
        <Nav toggleMenu={handleToggleMenu} isLanding={window.location.hash === '#/'} />
        <div className='menuApp'>
            <div className={`menu__${menu} ml-auto`}>
                <Menu />
            </div>
        </div>
        <Route exact path='/' render={() => <Landing  />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/welcome" render={() => <Welcome />} />
        <Route path="/edit-profile" render={() => logic.isUserLoggedIn ? <ProfileEdit initialUser={{}} /> : <Login isNeeded={true} />} />
        <Route path='/user/:id' render={() => <ProfileInfo />} />
        <Route path='/users/' render={() => <Users />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/home/:seaId" render={() => <Home journeys={journeys} moreInfo={handleMoreInfo} editJourney={handleEditJourney} />} />
        <Route path="/no-result" render={() => <NoResult />} />
        {/* <Route path="/home" render={() => journeys.length ? <Home journeys={journeys} moreInfo={handleMoreInfo} editJourney={handleEditJourney} /> : <Redirect to="/" />} /> */}
        <Route path="/create-journey" render={() => logic.isUserLoggedIn ? <JourneyCreate /> : <Login isNeeded={true} />} />
        <Route path="/edit-journey/:id" render={() => logic.isUserLoggedIn ? <JourneyCreate isEdit={true} /> : <Login isNeeded={true} />} />
        <Route path="/my-journeys" render={() => logic.isUserLoggedIn ? <MyJourneys /> : <Login isNeeded={true} />} />
        <Route path="/journey/:id" render={() => <JourneyInfo />} />
        <Route path="/favorites" render={() => logic.isUserLoggedIn ? <Favorites /> : <Login isNeeded={true} />} />
    </main>)
}

export default withRouter(App)