import React, { useState, useEffect } from 'react'
import appLogic from '../../logic'

import './index.scss'

const CinemaModal = ({ onClose, id }) => {

    const [cinema, setCinema] = useState({})

    useEffect(() => {
        (async() => {
            const cinemaInfo = await appLogic.retrieveCinemaInfo(id)
            console.log(cinemaInfo)
            setCinema(cinemaInfo)
        })()
    },[id])

    const fecthSessions = () => {
        cinema.movieSessions.map(session => {
            appLogic.retrieveAllSessions(session.id)
        })
    }

    return (
        <div className="modal">
            <div className="modal__content">
                <i className="close-modal" onClick={onClose} />
                <section className="cinema">
                    <h2 className="cinema__title">{cinema.name}</h2>

                    <ul className="cinema__movies">
                        <li className="movie__item">
                            <img />
                            <div>
                                <p>Movie title</p>
                                <p>Movie info</p>
                                <p>Movie cast</p>
                            </div>
                            <i className="show-sessions" />
                            <ul className="movie-sessions">
                                <li className="session"></li>
                            </ul>
                        </li>
                    </ul>
                </section>
                <div className="layer" onClick={onClose}></div>
            </div>
        </div>
    )
}

export default CinemaModal
