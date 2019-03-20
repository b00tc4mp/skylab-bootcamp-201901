'use strict'

import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import SlideShow from '../SlideShow'
import Feedback from '../Feedback'

import './index.sass'
import logic from '../../logic';

function UserCard(props) {

    const { users } = props
    const [favorites, setFavorites] = useState(null)
    const [feedback, setfeedback] = useState('')
    let isFavorite, user

    useEffect(() => {
        getUser()

    }, [])

    async function getUser() {
        try {
            user = await logic.retrieveUserLogged()
            setFavorites(user.favoriteCrew)

        } catch (error) {
            setfeedback(error.message)
        }
    }

    async function toggleFavorite(crewId) {
        try {
            if (!logic.isUserLoggedIn) props.history.push('/login')
            else { user = await logic.toggleCrewFavorite(crewId) }
            setFavorites(user.favoriteCrew)

        } catch (error) {
            setfeedback(error.message)
        }
    }

    return (<div className='user-card__container'>
        {!!users &&
            users.map(user => {
                if (favorites) isFavorite = favorites.includes(user.id) ? isFavorite = "-red" : isFavorite = ""
                return (<section className='user-card__card' key={user.id}>

                    <div className='user-card__title'>
                        <h2>{user.name} {user.surname}</h2>
                    </div>

                    <div>
                        <SlideShow pictures={user.pictures} />
                    </div>

                    <div className='user-card__buttons'>
                        <button onClick={() => props.history.push(`/user/${user.id}`)} className='user-card__button'>more</button>
                        <a href={`mailto:${user.email}`} className='user-card__link'>contact</a>
                        <button onClick={() => toggleFavorite(user.id)} className={`user-card__favorite${isFavorite} fas fa-heart`}></button>
                    </div>
                </section>)
            })
        }
        {feedback ? <Feedback message={feedback} /> : <div />}
    </div>)
}

export default withRouter(UserCard)