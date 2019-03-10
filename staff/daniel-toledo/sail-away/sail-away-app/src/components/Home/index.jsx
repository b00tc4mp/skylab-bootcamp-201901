'use strict'

import React, { Component } from 'react'

import MapDisplay from '../MapDisplay'

import './index.sass'
import logic from '../../logic';

function Home(props) {

        let { journeys, moreInfo, editJourney } = props

        function getMarkers(journeys) {
                let markers = []
                journeys.forEach(journey => markers.push(journey.route))
                return markers
        }

        return (<main className="home">
                <div className="journey__map">
                        <MapDisplay sea={journeys[0].sea} markers={getMarkers(journeys)} />
                </div>
                <div className='row'>
                        {
                                journeys.map(journey => {
                                        return (<section className='col-12 col-md-6 col-lg-4'>
                                                <div>
                                                        <button onClick={() => moreInfo(journey.id)}>more</button>
                                                        <button>capitan</button>
                                                        <button>contact</button>
                                                        <button onClick={() => editJourney(journey.id)}>edit</button>
                                                        <button className='fas fa-heart'></button>
                                                </div>
                                                <div>
                                                        <h2>Sailing Days</h2>
                                                        <p>{journey.dates[0]}-{journey.dates[1]}</p>
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

export default Home