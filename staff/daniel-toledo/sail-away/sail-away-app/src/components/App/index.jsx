'use strict'

import React, { useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Home from '../Home'
import JourneyCreate from '../JourneyCreate'
import JourneyInfo from '../JourneyInfo'
import Nav from '../Nav'
import Landing from '../Landing'
import './index.sass'
import logic from '../../logic';

function App(props) {

    let [journeys, setJourneys] = useState([])
    let [journey, setJourney] = useState([])

    async function handleGoHome() {
        try {
            let { journeys } = await logic.listJourneys()
            setJourneys(journeys)
        } catch (err) {
            console.log(err)
        }
        props.history.push('/home')
    }

    async function handleSearch(query) {

        try {
            let response = await logic.searchBySea(query)
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
            props.history.push(`/journey`)

        } catch (error) {
            console.error(error)
        }
    }

    return (<main className="app">
        <Nav />
        <Route exact path='/' render={() => <Landing search={handleSearch} />} />
        <Route path="/home" render={() => journeys.length ? <Home journeys={journeys} moreInfo={handleMoreInfo} /> : <Redirect to="/" />} />
        <Route path="/create-journey" render={() => <JourneyCreate />} />
        <Route path="/journey" render={() => <JourneyInfo journey={journey} />} />
        <button onClick={handleGoHome}>go Home</button>
        <button onClick={handleGoJourney}>go Journey</button>
    </main>)
}

export default withRouter(App)