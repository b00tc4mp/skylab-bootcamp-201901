'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import UserCard from '../UserCard'
import JourneyCard from '../JourneyCard'

import logic from '../../logic'
import './index.sass'

function Favorites(props) {
 
    let [journeyFavorites, setJourneyFavorites] = useState([])
    let [crewFavorites, setCrewFavorites] = useState([])
    
    async function getUserLogged() {
        try {
            let userLogged = await logic.retrieveUserLogged()

            let JourneyFavs = userLogged.favoriteJourneys.map(async j => await logic.retrieveJourney(j))
            Promise.all(JourneyFavs).then(favs => setJourneyFavorites(favs))

            let CrewFavs = userLogged.favoriteCrew.map(async j => await logic.retrieveUser(j))
            Promise.all(CrewFavs).then(favs => setCrewFavorites(favs))

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUserLogged()
    }, [])

    useEffect(() => {
        setJourneyFavorites(journeyFavorites)
        setCrewFavorites(crewFavorites)
        console.log(journeyFavorites, crewFavorites)
    }, [journeyFavorites, crewFavorites])

   
    return (
        <section className="favorites">
            <h3 className='favorites__title'>Users</h3>
            {crewFavorites.length && <UserCard users={crewFavorites}/>}
            <h3 className='favorites__title'>Journyes</h3>
            {journeyFavorites.length && <JourneyCard journeys={journeyFavorites} />}
        </section>)
}

export default withRouter(Favorites)