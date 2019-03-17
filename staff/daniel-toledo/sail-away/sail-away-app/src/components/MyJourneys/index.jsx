'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import MapDisplay from '../MapDisplay'
import SlideShow from '../SlideShow'
import JourneyCard from '../JourneyCard'

import logic from '../../logic';

function MyJourneys(props) {

    let [journeys, setJourneys] = useState([])
    let [favorites, setFavorites] = useState(null)
    let isFavorite

    useEffect(() => {
        getUser()
    },[])
    useEffect(() => {
        getJoruneys()
    }, [journeys])

    async function getJoruneys() {
        try {
            let userJourneys = await logic.retrieveMyJourneys()
            setJourneys(userJourneys)

        } catch (error) {
            console.error(error)
        }
    }

    async function getUser() {
        try {
            let user = await logic.retrieveUserLogged()
            setFavorites(user.favoriteJourneys)

        } catch (error) {
            console.error(error)
        }
    }

    function getMarkers(journeys) {
        let markers = []
        journeys.forEach(journey => markers.push(journey.route))
        return markers
    }


    return (<main className="myJourney">
        {journeys.length &&
            <div className="myJourney__map">
                <MapDisplay seaId={'00'} markers={getMarkers(journeys)} />
            </div>
        }

        {journeys.length && <JourneyCard journeys={journeys} edit={true}/>}
 
    </main>)
}

export default withRouter(MyJourneys)