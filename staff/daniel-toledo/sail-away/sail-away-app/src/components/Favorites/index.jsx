'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import SlideShow from '../SlideShow'

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

            let JourneyFavs =  userLogged.favoriteJourneys.map(async j => await logic.retrieveJourney(j))
            Promise.all(JourneyFavs).then(favs => setJourneyFavorites(favs))

            let CrewFavs =  userLogged.favoriteCrew.map(async j => await logic.retrieveUser(j))
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

    async function toggleJourneyFavorite(journeyId) {
        try {
            let userUpdated = await logic.toggleJourneyFavorite(journeyId)
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
            {user &&
                
                <div className='journeyFavorite__container'>
                    {
                        journeyFavorites.map(journey => {
                            if (user) isFavorite = user.favoriteJourneys.includes(journey.id) ? isFavorite = "danger" : isFavorite = "default"
                            return (<section className='journeyFavorite__card'>

                                <div>
                                    <h2>{journey.title}</h2>
                                    <p>{journey.dates[0].toString().substring(0, 15)}-{journey.dates[1].toString().substring(0, 15)}</p>
                                </div>
                                {/* <div>
                                                 <SlideShow pictures={journey.boat.pictures}/>
                                         </div> */}

                                <div>
                                    <button onClick={() => props.history.push(`/journey/${journey.id}`)}>more</button>
                                    <button onClick={() => props.history.push(`/user/${journey.userId}`)}>capitan</button>
                                    <button>contact</button>
                                    <button onClick={() =>  toggleJourneyFavorite(journey.id)} className={`favorite btn btn-outline-${isFavorite} col-1 fas fa-heart`}></button>
                                </div>
                            </section>)
                        })
                    }
                </div>}
        </section>)
}

export default withRouter(Favorites)