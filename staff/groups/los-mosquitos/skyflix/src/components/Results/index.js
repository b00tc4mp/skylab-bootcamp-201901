import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'




function Results({ items, onItem, error, onFav, favs }) {
    return <ul>
        <p>{error}</p>
        { 
            items.map(({ id, title, image }) => {
                 const isList = favs.some(movie => movie.id === id)

                return <li key={id} onClick={() => onItem(id)}>
                    <h2>{title}</h2>

                    <div>
                        <FontAwesomeIcon icon={isList ? faThumbsUp : faPlus} onClick={e => {
                            e.stopPropagation()

                            onFav(id)
                        }}/>
                    </div>
                    <img src={image} />
                </li>
            })
        }
    </ul>
}

export default Results

