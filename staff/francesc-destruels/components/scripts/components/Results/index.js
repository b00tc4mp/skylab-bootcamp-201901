import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

function Results({ items, onItem, onFav, favs }) {
    return <ul>
        {
            items.map(({ id, title, image, price }) =>{
                const isFav = favs.some(fav => fav.id === id)

                return <li key={id} onClick={() => onItem(id)}>
                    <h2>{title}</h2>
                    <FontAwesomeIcon icon={isFav ? faHeartSolid : faHeartRegular} onClick={e => {
                        e.stopPropagation()

                        onFav(id)
                    }} />
                    <img src={image} />
                    <span>{price}</span>
                </li>
            })
        }
    </ul>
}

export default Results