'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import logic from '../../logic'
import MapDisplay from '../MapDisplay'

import './index.sass'

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
                <MapDisplay markers={[journey.route]} seaId={journey.seaId} />
            </div>

            <h3 className='text-center'>Title</h3>
            <p>{journey.title}</p>

            <h3 className='text-center'>Sailing days</h3>
            <p>{journey.dates[0].toString().substring(0, 15)} - {journey.dates[1].toString().substring(0, 15)}</p>

            <h3 className='text-center'>Description</h3>
            <p>{journey.description}</p>

            <h3 className='text-center'>Captain</h3>

            <h3 className='text-center'>Boat</h3>

            <div>
                <h3 className='text-center'>Looking for</h3>
                <h5>Talents</h5>
                <div>
                    {
                        journey.lookingFor.talents.map(talent=>
                            <span key={talent} className='m-1 btn btn-info'>{talent}</span>
                        )
                    }
                </div>
                <h5>Experience- {journey.lookingFor.experience} </h5>
                    <div className='experience' style={{width:'200px'}}> 
                        <div className='experienceBar' style={{width:`${Number(journey.lookingFor.experience)/10000*100}%`}}></div>
                    </div>
                <h5>Sailing titles</h5>
                <h5>Language</h5>
                {
                        journey.lookingFor.languages.map(language=>
                            <span key={language} className='m-1 btn btn-outline-dark'>{language}</span>
                        )
                    }
            </div>

            <button onClick={() => props.history.push('/home')}>go Back</button>

        </div>}
    </main>)
}

export default withRouter(JourneyInfo)