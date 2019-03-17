'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import SlideShow from '../SlideShow'
import JourneyCard from '../JourneyCard'

import logic from '../../logic'
import './index.sass'

function Favorites(props) {
    let [user, setUser] = useState(null)
    let [journeyFavorites, setJourneyFavorites] = useState([])
    let [crewFavorites, setCrewFavorites] = useState([])
    let isFavorite

    async function getUserLogged() {
        try {
            let userLogged = await logic.retrieveUserLogged()

            let JourneyFavs = userLogged.favoriteJourneys.map(async j => await logic.retrieveJourney(j))
            Promise.all(JourneyFavs).then(favs => setJourneyFavorites(favs))

            let CrewFavs = userLogged.favoriteCrew.map(async j => await logic.retrieveUser(j))
            Promise.all(CrewFavs).then(favs => setCrewFavorites(favs))

            setUser(userLogged)

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

    async function toggleCrewFavorite(crewId) {
        try {
            let userUpdated = await logic.toggleCrewFavorite(crewId)
            setUser(userUpdated)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="favorites">
            <h3 className='text-center'>Users</h3>
            {user &&
                <div className='row'>
                    {
                        crewFavorites.map(crew => {
                            if (user) isFavorite = user.favoriteCrew.includes(crew.id) ? isFavorite = "danger" : isFavorite = "default"
                            return (<section className='col-12 col-md-6 col-lg-4' key={crew.id}>
                                <div>
                                    <button onClick={() => props.history.push(`/user/${crew.id}`)}>more</button>
                                    <button>contact</button>

                                    <button onClick={() => toggleCrewFavorite(crew.id)} className={`favorite btn btn-outline-${isFavorite} col-1 fas fa-heart`}></button>
                                </div>
                                <div>
                                    <SlideShow pictures={crew.pictures} />
                                </div>
                                <div>
                                    <p>{crew.name} {crew.surname}</p>
                                </div>
                            </section>)
                        })
                    }
                </div>}
            <h3 className='text-center'>Journyes</h3>
            {journeyFavorites.length && <JourneyCard journeys={journeyFavorites} />}
        </section>)
}

export default withRouter(Favorites)