import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import './index.sass'

function Results({ items, onItem, error, onFav, favs }) {
    return ( 
        <section className="container">
        <ul className="row">
        <p>{error}</p>
        {
            items.map(({ id, title, image }) => {
                const isList = favs.some(movie => movie.id === id)

                return <li className="movie-cover col-sm-6 col-md-4 col-lg-3" key={id} onClick={() => onItem(id)}>
                    <div className="movie-btn-list">
                        <FontAwesomeIcon className="icon" icon={isList ? faThumbsUp : faPlus} onClick={e => {
                            e.stopPropagation()

                            onFav(id)
                        }} />
                    </div>
                    <img src={image} />
                    <h2>{title}</h2>

                </li>
            })
        }
    </ul>
    </section>
    )
}

export default Results

