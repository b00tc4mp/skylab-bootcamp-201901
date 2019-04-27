import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

function Detail({ item: { id, title, image, description, price}, onFav, favs }) {
    const isFav = favs.some(fav => fav.id === id)
    
    return <section>
        <h2>{title}</h2>
        <FontAwesomeIcon icon={isFav ? faHeartSolid : faHeartRegular} onClick={e => {
            e.stopPropagation()

            onFav(id)
        }} />
        <img src={image} />
        <p>{description}</p>
        <span>{price}</span>
    </section>
}

export default Detail