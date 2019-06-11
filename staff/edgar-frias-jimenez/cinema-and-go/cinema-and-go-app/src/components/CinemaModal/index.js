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

    // const getSessionInfo = () => {
    //     cinema.movieSessions.map(session => {
    //         console.log(session)
    //     })
    // }

    // if (cinema) {
    //     getSessionInfo()
    // }

    return (
        <div className="modal">
            <div className="modal__content">
                <i className="close-modal" onClick={onClose} />
                <section className="cinema">
                    <h2 className="cinema__title">{cinema.name}</h2>

                    <ul className="cinema__movies">
                        <li className="movie__item">
                            <section>
                                <img src="https://www.ecartelera.com/carteles/12800/12806/004-th.jpg" />
                                <div>
                                    <p>Aladdín</p>
                                    <p>128 min. | EE.UU. | Música | TP</p>
                                    <p>Mena Massoud, Billy Magnussen, Naomi Scott, Dir. Guy Ritchie</p>
                                    <ul className="movie-sessions">
                                        <li className="session">16:30</li>
                                        <li className="session">18:00</li>
                                        <li className="session">19:15</li>
                                        <li className="session">20:45</li>
                                        <li className="session">22:00</li>
                                    </ul>
                                </div>
                            </section>
                        </li>
                    </ul>
                </section>
                <div className="layer" onClick={onClose}></div>
            </div>
        </div>
    )
}

export default CinemaModal
