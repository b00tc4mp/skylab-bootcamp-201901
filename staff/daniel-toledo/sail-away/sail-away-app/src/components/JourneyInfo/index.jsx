'use strict'

import React, { useState, useEffect } from 'react'
import { withRouter} from 'react-router-dom'

import logic from '../../logic'
import MapDisplay from '../MapDisplay'
import BoatInfo from '../BoatInfo'
import UserCard from '../UserCard';
import Feedback from '../Feedback'

import './index.sass'

function JourneyInfo(props) {

    const { id } = props.match.params
    const [journey, setJourney] = useState(null)
    const [user, setUser] = useState(null)
    const [feedback, setfeedback] = useState('')

    useEffect(() => {
        getJourney(id)
    }, [])

    async function getJourney(id) {
        try {
            const showJourney = await logic.retrieveJourney(id)
            setJourney(showJourney)
            getUser(showJourney.userId)

        } catch (error) {
            setfeedback(error.message)
        }
    }

    async function getUser(id) {
        try {
            const showUser = await logic.retrieveUser(id)
            setUser(showUser)

        } catch (error) {
            setfeedback(error.message)
        }
    }


    return (<main className="infoJourney">
        {!!journey && <div>
            <div className='infoJourney__map'>
                <MapDisplay markers={[journey.route]} seaId={journey.seaId} />
            </div>
            <div className='infoJourney__info'>
                <h2 className='infoJourney__titleJourney'>{journey.title}</h2>

                <h3 className='infoJourney__title'>Sailing days</h3>
                <span className='infoJourney__calendar'>{journey.dates[0].toString().substring(0, 15)} - {journey.dates[1].toString().substring(0, 15)}</span>

                <h3 className='infoJourney__title'>Description</h3>
                <p>{journey.description}</p>

                <h3 className='infoJourney__title'>Captain</h3>

                {!!user && <UserCard users={[user]} />}

                <h3 className='infoJourney__title'>Boat</h3>

                <BoatInfo boat={journey.boat} />

                <div>
                    <h3 className='infoJourney__title-lookingFor'>Looking for</h3>
                    <h3>Talents</h3>
                    <div className='infoJourney__talents'>
                        {
                            journey.lookingFor.talents.map(talent =>
                                <span key={talent} className='btn infoJourney__talent'>{talent}</span>
                            )
                        }
                    </div>
                    <div className='infoJourney__experience'>
                        <h3>Experience</h3>
                        <div className='experience' style={{ width: '200px' }}>
                            <div className='experienceBar' style={{ width: `${Number(journey.lookingFor.experience) / 10000 * 100}%` }}></div>
                        </div>
                    </div>
                    <h3>Language</h3>
                    {
                        journey.lookingFor.languages.map(language =>
                            <span key={language} className='btn infoJourney__language'>{language}</span>
                        )
                    }
                </div>
                {feedback ? <Feedback message={feedback} /> : <div />}
            </div>

        </div>}
    </main>)
}

export default withRouter(JourneyInfo)