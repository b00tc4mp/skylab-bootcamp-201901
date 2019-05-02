import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import './index.sass'

function Results({ items, onItem, error, onFav, favs }) {
    return <ul className="container">
        <p>{error}</p>
        {
            items.map(({ id, title, image }) => {
                const isList = favs.some(movie => movie.id === id)

                return <li className="results" key={id} onClick={() => onItem(id)}>

                    <div>
                        <FontAwesomeIcon icon={isList ? faThumbsUp : faPlus} onClick={e => {
                            e.stopPropagation()

                            onFav(id)
                        }} />
                    </div>

                    <div>
                        <h2 className="text-white">{title}</h2>
                        <img src={image} />
                    </div>
                </li>
            })
        }
    </ul>
}

export default Results

