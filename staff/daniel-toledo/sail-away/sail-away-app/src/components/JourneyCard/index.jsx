'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import SlideShow from '../SlideShow'

import './index.sass'
import logic from '../../logic';

function JourneyCard(props) {

    let {journeys, edit} = props
    let [favorites, setFavorites] = useState(null)
    let isFavorite

    useEffect(() => {
        getUser()
    },[])

    async function getUser() {
        try {
            let user = await logic.retrieveUserLogged()
            setFavorites(user.favoriteJourneys)

        } catch (error) {
            console.error(error)
        }
    }

    async function toggleJourneyFavorite(journeyId) {
        try {
            let userUpdated = await logic.toggleJourneyFavorite(journeyId)
            setFavorites(userUpdated.favoriteJourneys)
        } catch (error) {
            console.error(error)
        }
    }

    return (<div className='journey-card__container'>
            {journeys &&
                journeys.map(journey => {
                    if (favorites) isFavorite = favorites.includes(journey.id) ? isFavorite = "-red" : isFavorite = ""
                    return (<section className='journey-card__card' key={journey.id}>

                        <div className='journey-card__title'>
                            <h2>{journey.title}</h2>
                            <p>{journey.dates[0].toString().substring(0, 15)}-{journey.dates[1].toString().substring(0, 15)}</p>
                        </div>

                        <div>
                            <SlideShow pictures={journey.boat.pictures} />
                        </div>

                        <div className='journey-card__buttons'>
                            <button onClick={() => props.history.push(`/journey/${journey.id}`)} className='journey-card__button'>more</button>
                            <button onClick={() => props.history.push(`/user/${journey.userId}`)} className='journey-card__button'>capitan</button>
                            {!edit && <button className='journey-card__button'>contact</button>}
                            {edit && < button onClick={() => props.history.push(`/edit-journey/${journey.id}`)} className='journey-card__button'>edit</button>}
                            <button onClick={() => toggleJourneyFavorite(journey.id)} className={`journey-card__favorite${isFavorite} fas fa-heart`}></button>
                        </div>
                    </section>)
                })
            }
        </div>)
}

export default withRouter(JourneyCard)