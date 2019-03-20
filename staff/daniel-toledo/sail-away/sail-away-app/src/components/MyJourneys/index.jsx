'use strict'

import React, { useState, useEffect } from 'react'
import {  withRouter} from 'react-router-dom'

import MapDisplay from '../MapDisplay'
import JourneyCard from '../JourneyCard'
import Feedback from '../Feedback'

import logic from '../../logic';

function MyJourneys(props) {

    const [journeys, setJourneys] = useState([])
    const [feedback, setfeedback] = useState('')

    useEffect(() => {
        getJoruneys()
    },[])

    async function getJoruneys() {
        try {
            const userJourneys = await logic.retrieveMyJourneys()
            setJourneys(userJourneys)

        } catch (error) {
            setfeedback(error.message)
        }
    }

    function getMarkers(journeys) {
        let markers = []
        journeys.forEach(journey => markers.push(journey.route))
        return markers
    }

    return (<main className="myJourney">
        {!!journeys.length &&
            <div className="myJourney__map">
                <MapDisplay seaId={'00'} markers={getMarkers(journeys)} />
            </div>
        }
        
        {!!journeys.length && <JourneyCard journeys={journeys} edit={true}/>}
        
        {feedback ? <Feedback message={feedback} /> : <div />}

    </main>)
}

export default withRouter(MyJourneys)