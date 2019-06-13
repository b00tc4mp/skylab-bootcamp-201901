import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom'
import styles from './index.scss';
import logic from '../../logic'
import { MedicalFields } from '../../components/Medical-fields'
import { EventTypes } from '../../components/Event-types'
import NavBar from '../../components/NavBar'
import moment from 'moment'



export function Home() {

    const [events, setEvents] = useState(null)
    const [category, setCategory] = useState(null)

    useEffect(function () {
        if (logic.isUserLoggedIn) {

            (async function getEvents() {
                const _events = await logic.retrieveEvents()
                setEvents(_events)
            })()
        }
    }, [logic.isUserLoggedIn])


    const handleSelectCategory = async category => {
        setCategory(category)
        const _events = await logic.retrieveEvents(category)
        setEvents(_events)

    }

    const handleSelectType = async type => {
        const _events = await logic.retrieveEvents(category, type)
        setEvents(_events)
    }

    if (logic.isUserLoggedIn) {
        return (
            <div className='body uk-container'>
                <header className='header'>
                    <h3 className="brand"><NavBar /></h3>
                </header>
                <section className='home_top'>
                        <div className='select'>
                            <MedicalFields selectCategory={handleSelectCategory} />
                        </div>

                        <div className='select'>
                            <EventTypes selectedType={handleSelectType} />
                        </div>

                    </section>
                <div className="home_wrapper">

                    <section className="home_main">
                        <div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid-small uk-text-center uk-margin-top" data-uk-grid>

                            {events && events.map(function (e) {
                                return (
                                    <Link to={`../event/${e._id}`}>

                                        <div class="uk-card uk-card-default">
                                            <div class="uk-card-media-top">
                                                <img src={e.image} alt="" />
                                            </div>
                                            <div class="uk-card-body">
                                                <h3 class="uk-card-title">{e.title}</h3>
                                                <p>{e.location.city}, {e.location.country}</p>
                                                <p>{moment(e.date).format('YYYY-MM-DD')}</p>
                                                <br />
                                                <p>{e.numberTicketsAvailable} places are still available</p>
                                            </div>
                                        </div>

                                    </Link>
                                )
                            }
                            )}
                        </div>
                    </section>
                </div>
            </div>
        )
    } else {
        return (
            <Redirect to='/' />
        )
    }
}

