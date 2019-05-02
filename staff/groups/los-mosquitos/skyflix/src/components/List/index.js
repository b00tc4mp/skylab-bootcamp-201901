import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import logic from '../../logic'
import './index.sass'

function List({ movieList, onItem }) {


    return (
        <section className="container">
            <h1 className="text-white">Movies that I have to see</h1>
            <ul className="row">
                {
                    movieList.map(({ id, title, poster_path: image }) => {
                        let imagePath
                        imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                        return <li className="movie-cover col-sm-6 col-md-4 col-lg-3" key={id} onClick={() => onItem(id)}>
                            <div className="movie-btn-list">

                                <FontAwesomeIcon icon={faTrashAlt} onClick={e => {
                                    e.stopPropagation()
                                    
                                    logic.removeFromMovieUserList(id)
                                }}
                                />

                            </div>
                            <img src={imagePath} />
                            <h2>{title}</h2>
                        </li>
                    })
                }

            </ul>
        </section>
    )
}

export default List