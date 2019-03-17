'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import MapDisplay from '../MapDisplay'
import JourneyCard from '../JourneyCard'

import './index.sass'
import logic from '../../logic';

function Home(props) {

        let { journeys } = props
   
        function getMarkers(journeys) {
                let markers = []
                journeys.forEach(journey => markers.push(journey.route))
                return markers
        }

        return (<main className="journeyHome">
                <div className="journeyHome__map">
                        <MapDisplay seaId={journeys[0].seaId} markers={getMarkers(journeys)} />
                </div>
                {journeys.length && <JourneyCard journeys={journeys} />}
        </main>)
}

export default withRouter(Home)