import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import styles from './index.scss';
import logic from '../../logic'
import NavBar from '../../components/NavBar'
import moment from 'moment'


export function Event({ match }) {

    const [events, setEvents] = useState(null)
    const [response, setResponse] = useState(null)



    useEffect(function () {

        return (async function getEvents() {
            const { id } = match.params
            const _event = await logic.retrieveEvent(id)

            setEvents(_event)

        })()
    }, [])

    const handleSharePost = (event) => {
        debugger
        event.preventDefault()

        const { id } = match.params

        const { text: { value: text }

        } = event.target

        return (async () => {
            try {
                const { data: { message } } = await logic.publishComment(id, text)
                setResponse(message)
            } catch (error) {
                return error
            }
        })()

    }


    if (!!events && logic.isUserLoggedIn) {
        return (
            <div className='body uk-container'>

                <header className='header'>
                    <h3 className="brand"><NavBar /></h3>
                </header>
                <article class="uk-article">

                    <h1 class="uk-article-title"><a class="uk-link-reset" href="">{events.title}</a></h1><br />

                    <p class="uk-article-meta">Published by <a href="#">{events.representant.fullname}</a>, Contact Event Organizer <a href="#">{events.representant.email}</a></p>
                    <br />
                    <img src={events.image} width="550" height="400" />
                    <br />
                    <div className="wrapper">
                        <section className="left">
                            <div className="top">
                                <p class="uk-text-lead">{events.description}</p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                            </div>
                            <div className="bottom">
                                <section className="comments">
                                    <form className="form" onSubmit={handleSharePost}>
                                        <textarea rows="4" cols="120" name="text" placeholder="Please leave leave a question or a doubt about this event"></textarea >
                                        <button class="uk-button uk-button-default">Make a question</button>
                                        <br />

                                    </form>
                                </section>

                                {!!response &&
                                    <div className='message-body'>
                                        <p>{response}</p>
                                    </div>
                                }
                                <section className="comments">
                                    <p class="uk-button uk-button-text" href="#">{events.comments.length} Comments</p>

                                    {events && events.comments.length >= 1 && events.comments.reverse().map(e => {
                                        return (
                                            <article class="uk-comment uk-comment-primary">
                                                <header class="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid>
                                                    <div class="uk-width-auto">
                                                        {
                                                            e.roleAuthor === 'Representant of the event' ? <div><img class="uk-comment-avatar" src="https://www.independent.ie/irish-news/presidential-election/article37384404.ece/9e89f/binary/Gavin%20_Duffy.jpg" width="50" height="50" alt="" /><p>Organization representant</p></div> : <img class="uk-comment-avatar" src="http://franciscoogalde.com/img/user.svg" width="50" height="50" alt="" />

                                                        }
                                                    </div>
                                                    <div class="uk-width-expand">
                                                        <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{e.author}</a></h4>
                                                        <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                                            <li><a href="#">{moment(e.date).format('DD-MM-YYYY  HH:MM a')}</a></li>

                                                        </ul>
                                                    </div>
                                                </header>
                                                <div class="uk-comment-body">
                                                    <p>{e.text}</p>
                                                </div>
                                            </article>
                                        )
                                    })
                                    }
                                </section>
                            </div>

                        </section>
                        <section className="right">
                            <div className="details">
                                <h1>More information:</h1>
                                <div className="info">
                                    <h3>Medical Field and Type</h3>
                                    <p>{events.medicalField.name}</p>
                                    <p>{events.eventType.name}</p>

                                </div>
                                <div className="info">
                                    <h3>Date And Time</h3>
                                    <p>{moment(events.date).format('YYYY-MM-DD   HH:MM a')}</p>
                                </div>
                                <div className="info">
                                    <h3>Location</h3>
                                    <p>{events.location.country}</p>
                                    <p>{events.location.city}</p>
                                    <p>{events.location.address}</p>
                                </div>
                                <div className="info">
                                    <h3>Place still available</h3>
                                    <p>{events.numberTicketsAvailable} </p>
                                </div>
                                <div className="info">
                                    <h3>Price</h3>
                                    <p>{events.price} €</p>
                                </div>
                                <p><button className="button_left">tikets</button></p>
                            </div>
                        </section>
                    </div>
                    <div class="uk-grid-small uk-child-width-auto" uk-grid>
                    </div>

                </article>



            </div>



        )

    } else return null

}