import React, { useState, useEffect } from 'react'
import appLogic from '../../logic'
import { defaultPosition } from '../../utils'
import './index.scss'

const { REACT_APP_MAPS_KEY } = process.env

const CinemaModal = ({ onClose, id }) => {
    // State
    const [cinema, setCinema] = useState({})
    const [movieInfoState, setMovieInfoState] = useState([])
    const [gmaps, setGmaps] = useState(null)

    // State setter
    const getSessionInfo = async cinema => {
        if (cinema.movieSessions) {
            const movieSessions = await Promise.all(cinema.movieSessions.map(async session =>
                await appLogic.retrieveAllSessions(session)
            ))

            setMovieInfoState(movieSessions.flat())
        }
    }

    // Lifecicle
    useEffect(() => {
        (async () => {
            const cinema = await appLogic.retrieveCinemaInfo(id)
            setCinema(cinema)
            getSessionInfo(cinema)

            // const gmapsTime = async () => {
            //     if(cinema) {
            //         const userPos = defaultPosition().toString()
            //         const cinePos = cinema.location.coordinates.toString()

            //         console.log('userPos', userPos)
            //         console.log('cinePos', cinePos)

            //         await appLogic.getTimeToArrive(userPos, cinePos,REACT_APP_MAPS_KEY)

            //         return setGmaps(gmapsTime)
            //     }
            // }
            // gmapsTime()
        })()
    }, [id])

    // console.log('getUserPosition', defaultPosition())
    // console.log('movieInfoState', movieInfoState)
    // console.log('cinema', cinema)
    console.log('gmaps', gmaps)
    return (
        <div className="modal">
            <div className="modal__content">
                <i className="close-modal" onClick={onClose} />
                <section className="cinema">
                    <h2 className="cinema__title">{cinema.name}</h2>
                    <ul className="cinema__movies">
                        {!!movieInfoState.length && movieInfoState.map(movie => {
                            return (
                                <li className="movie__item" key={movie.movie._id} >
                                    <section>
                                        <img src={movie.movie.img} />
                                        <div>
                                            <p>{movie.movie.title}</p>
                                            <p>{movie.movie.info && movie.movie.info.join(', ')}</p>
                                            <p>{movie.movie.cast}</p>
                                            <ul className="movie-sessions">
                                                {movie.sessions && !(movie.sessions[0] === '') && movie.sessions.map((session, index) =>
                                                    <li className="session" key={`session-${index}`} >{session}</li>
                                                )}
                                            </ul>
                                        </div>
                                    </section>
                                </li>
                            )
                        })}
                    </ul>
                </section>
                <div className="layer" onClick={onClose}></div>
            </div>
        </div>
    )
}

export default CinemaModal
