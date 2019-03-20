'use strict'

import React, { useState, useEffect } from 'react'
import { withRouter} from 'react-router-dom'

import UserCard from '../UserCard'
import JourneyCard from '../JourneyCard'
import Feedback from '../Feedback'

import logic from '../../logic'
import './index.sass'

function Favorites() {
 
    const [journeyFavorites, setJourneyFavorites] = useState([])
    const [crewFavorites, setCrewFavorites] = useState([])
    const [feedback, setfeedback] = useState('')
    
    async function getUserLogged() {
        try {
            const userLogged = await logic.retrieveUserLogged()

            const JourneyFavs = userLogged.favoriteJourneys.map(async j => await logic.retrieveJourney(j))
            Promise.all(JourneyFavs).then(favs => setJourneyFavorites(favs))

            const CrewFavs = userLogged.favoriteCrew.map(async j => await logic.retrieveUser(j))
            Promise.all(CrewFavs).then(favs => setCrewFavorites(favs))

        } catch (error) {
            setfeedback(error.message)
        }
    }

    useEffect(() => {
        getUserLogged()
    }, [])

    useEffect(() => {
        setJourneyFavorites(journeyFavorites)
        setCrewFavorites(crewFavorites)
    }, [journeyFavorites, crewFavorites])

   
    return (
        <section className="favorites">
            <h3 className='favorites__title'>Users</h3>
            {!!crewFavorites.length && <UserCard users={crewFavorites}/>}
            <h3 className='favorites__title'>Journyes</h3>
            {!!journeyFavorites.length && <JourneyCard journeys={journeyFavorites} />}
            {feedback ? <Feedback message={feedback} /> : <div />}
        </section>)
}

export default withRouter(Favorites)