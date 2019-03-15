'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import MapDisplay from '../MapDisplay'

import logic from '../../logic';

function MyJourneys(props) {

    let [journeys, setJourneys] = useState([])

    useEffect(() => {
        getJoruneys()
        debugger
    }, [journeys])

    async function getJoruneys() {
        try {
            let userJourneys = await logic.retrieveMyJourneys()
            setJourneys(userJourneys)

        } catch (error) {
            console.error(error)
        }
    }

    function getMarkers(journeys) {
        let markers = []
        journeys.forEach(journey => markers.push(journey.route))
        return markers
    }

    return (<main className="home">
        {journeys.length &&
            <div className="journey__map">
                <MapDisplay seaId={'00'} markers={getMarkers(journeys)} />
            </div>
        }
        <div className='row'>
            {
                journeys.map(journey => {
                    return (<section className='col-12 col-md-6 col-lg-4'>
                        <div>
                            <button onClick={() => props.history.push(`/journey/${journey.id}`)}>more</button>
                            <button onClick={() => props.history.push(`/user/${journey.userId}`)}>capitan</button>
                            <button onClick={() =>  props.history.push(`/edit-journey/${journey.id}`)}>edit</button>
                            <button className='fas fa-heart'></button>
                        </div>
                        <div>
                            <h2>Sailing Days</h2>
                            <p>{journey.dates[0].toString().substring(0, 15)}-{journey.dates[1].toString().substring(0, 15)}</p>
                        </div>
                        <div>
                            <p>{journey.description}</p>
                        </div>
                    </section>)
                })
            }
        </div>
    </main>)
}

export default withRouter(MyJourneys)