import React, { Fragment, useState, useEffect } from 'react'
import appLogic from '../../logic'

import './index.scss'

const CinemaModal = ({ onClose, id }) => {

    const [cinema, setCinema] = useState({})
    const [movieInfoState, setMovieInfoState] = useState([])

    const getSessionInfo = async cinema => {
        if (cinema.movieSessions) {
            const movieSessions = await Promise.all(cinema.movieSessions.map(async session =>
                await appLogic.retrieveAllSessions(session)
            ))

            setMovieInfoState(movieSessions.flat())
        }
    }

    useEffect(() => {
        (async () => {
            const cinema = await appLogic.retrieveCinemaInfo(id)
            setCinema(cinema)
            getSessionInfo(cinema)
        })()
    }, [id])

    console.log('movieInfoState', movieInfoState)

    return (
        <Fragment>
            <div className="modal">
                <div className="modal__content">
                    <i className="close-modal" onClick={onClose} />
                    <section className="cinema">
                        <h2 className="cinema__title">{cinema.name}</h2>
                        <ul className="cinema__movies">
                            {!!movieInfoState.length && movieInfoState.map(movie => {
                                return (
                                    <Fragment>
                                        <li className="movie__item" key={'holas'} >
                                            <section>
                                                <img src={movie.movie.img} />
                                                <div>
                                                    <p>{movie.movie.title}</p>
                                                    <p>{movie.movie.info && movie.movie.info.join(', ')}</p>
                                                    <p>{movie.movie.cast}</p>
                                                    <ul className="movie-sessions">
                                                        {movie.sessions && !(movie.sessions[0] === '') && movie.sessions.map(session =>
                                                            <li className="session" key={'holas'} >{session}</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </section>
                                        </li>
                                    </Fragment>
                                )
                            })}
                        </ul>
                    </section>
                    <div className="layer" onClick={onClose}></div>
                </div>
            </div>
        </Fragment>
    )
}

export default CinemaModal
