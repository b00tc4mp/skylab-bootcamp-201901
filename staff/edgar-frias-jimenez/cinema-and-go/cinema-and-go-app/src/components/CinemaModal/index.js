import React, { useState, useEffect } from 'react'
import { GlobalContext } from '../../components/GlobalContext'
import appLogic from '../../logic'
import { defaultPosition } from '../../utils'
import './index.scss'

const CinemaModal = ({ onClose, id, onDirectionsService }) => {
    // Globals
    const userPosition = defaultPosition().join()
    const popcornMinutes = 900
    const now = () => {
        const date = new Date;
        const seconds = date.getSeconds()
        const minutes = date.getMinutes() * 60
        const hour = date.getHours() * 3600

        return seconds + minutes + hour
    }


    // State
    const [cinema, setCinema] = useState({})
    const [movieInfoState, setMovieInfoState] = useState([])
    // const [ showSpinner, handleSpinner ] = useState(null)

    // State setter
    const getSessionInfo = async cinema => {
        if (cinema.movieSessions) {

            const cinemaLocation = await appLogic.retrieveTimeToArrive(cinema._id, userPosition, cinema.location.coordinates.join())

            const movieSessions = await Promise.all(cinema.movieSessions.map(async movie =>{
                const currentSessions = await appLogic.retrieveAllSessions(movie)

                currentSessions.forEach(currentSession => {
                    currentSession.sessions.forEach((session, index) => {
                        session = session.replace('.', ':')
                        const a = session.split(':')
                        const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60
                        if(cinemaLocation && session !== ''){
                            currentSession.sessions[index] = {session, state: now()+popcornMinutes+cinemaLocation.duration <= seconds, value: seconds}
                        }
                    })
                })


                return currentSessions
            }))

            setMovieInfoState(movieSessions.flat())
        }
    }

    const directionsService = location => {
        onDirectionsService(location)
    }

    // Lifecicle
    useEffect(() => {
        (async () => {
            const currentCinema = await appLogic.retrieveCinemaInfo(id)

            // const cinemaLocation = await appLogic.retrieveTimeToArrive(currentCinema._id, userPosition, currentCinema.location.coordinates.join())

            setCinema(currentCinema)
            getSessionInfo(currentCinema)

        })()
    }, [id])

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
                                            {console.log(movie.sessions)}
                                            <ul className="movie-sessions">
                                                {(movie.sessions && movie.sessions[0] !== '') && movie.sessions.map((session, index) =>
                                                    <li className={`session ${session.state ? 'green' : 'red'}`}  key={`session-${index}`} onClick={() =>directionsService(cinema.location.coordinates.join())} >{session.session}</li>
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
