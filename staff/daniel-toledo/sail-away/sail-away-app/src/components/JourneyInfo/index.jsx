'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import logic from '../../logic'
import MapDisplay from '../MapDisplay'


function JourneyInfo(props) {

    const { id } = props.match.params
    let [journey, setJourney] = useState(null)

    async function getJourney(id) {
        try {
            let showJourney = await logic.retrieveJourney(id)
            setJourney(showJourney) 

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getJourney(id)

    }, [journey])

    return (<main className="journey">
        {journey && <div>
            <h3 className='text-center'>Journey Route</h3>
            <div className='journey__map'>
                <MapDisplay markers={[journey.route]} sea={journey.sea} />
            </div>

            <h3 className='text-center'>Sailing days</h3>
            <p>{journey.dates[0]} - {journey.dates[1]}</p>

            <h3 className='text-center'>Description</h3>
            <p>{journey.description}</p>

            <button onClick={() => props.history.push('/home')}>go Back</button>

        </div>}
    </main>)
}

export default withRouter(JourneyInfo)