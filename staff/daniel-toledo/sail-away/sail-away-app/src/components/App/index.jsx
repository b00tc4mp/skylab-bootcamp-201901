'use strict'

import React, { useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Home from '../Home'
import Register from '../Register'
import Login from '../Login'
import JourneyCreate from '../JourneyCreate'
import JourneyInfo from '../JourneyInfo'
import JourneyEdit from '../JourneyEdit'
import Nav from '../Nav'
import Menu from '../Menu'
import Landing from '../Landing'
import './index.sass'
import logic from '../../logic';

function App(props) {

    let [journeys, setJourneys] = useState([])
    let [journey, setJourney] = useState(null)
    let [menu, setMenu] = useState('close')

    function handleGoHome() {

        props.history.push('/')
    }

    async function handleSearch(seaId) {
        debugger
        try {
            let response = await logic.searchBySea(seaId)
            setJourneys(response)

            props.history.push('/home')

        } catch (err) {
            console.error(err)
        }
    }

    function handleGoJourney() {
        props.history.push('/create-journey')
    }

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
        <Nav toggleMenu={handleToggleMenu} />
        <div className='menuApp'>
            <div className={`menu__${menu} ml-auto`}>
                <Menu />
            </div>
        </div>
        <Route exact path='/' render={() => <Landing search={handleSearch} />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/home" render={() => journeys.length ? <Home journeys={journeys} moreInfo={handleMoreInfo} editJourney={handleEditJourney} /> : <Redirect to="/" />} />
        <Route path="/create-journey" render={() => <JourneyCreate />} />
        <Route path="/edit-journey/:id" render={() => <JourneyEdit journey={journey} />} />
        <Route path="/journey/:id" render={() => <JourneyInfo journey={journey} />} />
        <button onClick={handleGoHome}>go Home</button>
        <button onClick={handleGoJourney}>create Journey</button>
    </main>)
}

export default withRouter(App)