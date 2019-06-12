import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom'
import styles from './index.css';
import logic from '../../logic'
import { MedicalFields } from '../../components/Medical-fields'
import { EventTypes } from '../../components/Event-types'
import NavBar from '../../components/NavBar'



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
            <div className='body'>
                    <header className='header'>
                        <h3 className="brand"><NavBar /></h3>
                    </header>
                    <div className="wrapper">
                        <section className='queries'>
                            <div className='select'>
                                <MedicalFields selectCategory={handleSelectCategory} />
                            </div>
                            <div className='select'>
                                <EventTypes selectedType={handleSelectType} />
                            </div>
                        </section>

                        <main className='main'>
                            {events && events.map(function (e) {

                                return (
                                    <Link to={`../event/${e._id}`}>

                                        <div className="card">
                                            <img className="card_image" alt='' src='https://www.mckinsey.com/~/media/McKinsey/Business%20Functions/Operations/Our%20Insights/The%20expanding%20role%20of%20design%20in%20creating%20an%20end%20to%20end%20customer%20experience/Expanding-role-of-design-1536x1536-400_Standard.ashx'></img>
                                            <div className="card_description">
                                                <p className="title">{e.title}</p>
                                                <p>{e.location.city}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            )}
                        </main>
                </div>
            </div>
        )
    } else {
        return (
            <Redirect to='/' />
        )
    }
}

