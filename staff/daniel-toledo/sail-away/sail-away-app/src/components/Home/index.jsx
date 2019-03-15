'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import MapDisplay from '../MapDisplay'

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



        return (<main className="home">
                <div className="journey__map">
                        <MapDisplay seaId={journeys[0].seaId} markers={getMarkers(journeys)} />
                </div>
                <div className='row'>
                        {
                                journeys.map(journey => {
                                        if (user) isFavorite = user.favoriteJourneys.includes(journey.id) ? isFavorite = "danger" : isFavorite = "default"
                                        return (<section className='col-12 col-md-6 col-lg-4'>
                                                <div>
                                                        <button onClick={() => props.history.push(`/journey/${journey.id}`)}>more</button>
                                                        <button onClick={() => props.history.push(`/user/${journey.userId}`)}>capitan</button>
                                                        <button>contact</button>
                                                        <button onClick={() => toggleFavorite(journey.id)} className={`favorite btn btn-outline-${isFavorite} col-1 fas fa-heart`}></button>
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

export default withRouter(Home)