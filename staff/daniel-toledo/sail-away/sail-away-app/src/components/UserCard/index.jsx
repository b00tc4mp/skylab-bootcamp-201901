'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import SlideShow from '../SlideShow'

import './index.sass'
import logic from '../../logic';

function JourneyCard(props) {

    let {users} = props
    let [favorites, setFavorites] = useState(null)
    let isFavorite, user

    useEffect(() => {
        getUser()
    },[])

    async function getUser() {
        try {
            user = await logic.retrieveUserLogged()
            setFavorites(user.favoriteCrew)

        } catch (error) {
            console.error(error)
        }
    }

    async function toggleFavorite(crewId) {
        try {
            if (!logic.isUserLoggedIn) props.history.push('/login')
            else  {user = await logic.toggleCrewFavorite(crewId)}
            setFavorites(user.favoriteCrew)
            console.log(user.favoriteCrew)
 
        } catch (error) {
            console.error(error)
        }
    }

    return (<div className='user-card__container'>
            {users &&
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
                            <button className='user-card__button'>contact</button>
                            <button onClick={() => toggleFavorite(user.id)} className={`user-card__favorite${isFavorite} fas fa-heart`}></button>
                        </div>
                    </section>)
                })
            }
        </div>)
}

export default withRouter(JourneyCard)