'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import MapDisplay from '../MapDisplay'
import SlideShow from '../SlideShow'

import './index.sass'
import logic from '../../logic';

function Home(props) {

        let { journeys } = props
        let [user, setUser] = useState(null)
        let isFavorite

        function getMarkers(journeys) {
                let markers = []
                journeys.forEach(journey => markers.push(journey.route))
                return markers
        }

        async function getUserLogged() {
                try {
                        let userLogged = await logic.retrieveUserLogged()
                        setUser(userLogged)
                } catch (error) {
                        console.error(error)
                }
        }

        async function toggleFavorite(journeyId) {
                try {
                        let userUpdated = await logic.toggleJourneyFavorite(journeyId)
                        setUser(userUpdated)
                } catch (error) {
                        console.error(error)
                }
        }

        useEffect(() => {
                getUserLogged()
        }, [])

        useEffect(() => {
                setUser(user)
        }, [user])


        debugger
        return (<main className="home">
                <div className="journeyHome__map">
                        <MapDisplay seaId={journeys[0].seaId} markers={getMarkers(journeys)} />
                </div>
                <div className='journeyHome__container'>
                        {
                                journeys.map(journey => {
                                        if (user) isFavorite = user.favoriteJourneys.includes(journey.id) ? isFavorite = "danger" : isFavorite = "default"
                                        return (<section className='journeyHome__card'>
                                               
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
                                                        <button onClick={() => toggleFavorite(journey.id)} className={`favorite btn btn-outline-${isFavorite} col-1 fas fa-heart`}></button>
                                                </div>
                                        </section>)
                                })
                        }
                </div>
        </main>)
}

export default withRouter(Home)