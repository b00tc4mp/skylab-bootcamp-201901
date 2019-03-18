'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import MapDisplay from '../MapDisplay'
import JourneyCard from '../JourneyCard'

import './index.sass'
import logic from '../../logic';

function Home(props) {

        const { seaId } = props.match.params
        let [journeys, setJourneys] = useState(null)

        useEffect(() => {
                handleSearch(seaId)
        }, [seaId])

        async function handleSearch(seaId) {

                try {
                        let response = await logic.searchBySea(seaId)
                        if (!response.length) props.history.push('/no-result')
                        setJourneys(response)

                } catch (error) {
                        props.history.push('/no-result')
                }
        }

        function getMarkers(journeys) {
                let markers = []
                journeys.forEach(journey => markers.push(journey.route))
                return markers
        }

        return (<main className="journeyHome">
                {journeys &&
                        <div>
                                <div className="journeyHome__map">
                                        <MapDisplay seaId={journeys[0].seaId} markers={getMarkers(journeys)} />
                                </div>
                                <JourneyCard journeys={journeys} />
                        </div>
                }
        </main>)
}

export default withRouter(Home)