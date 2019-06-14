import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

function Favs({ items, onItem, onFav }) {
    return <ul>
        {
            items.map(({ id, title, image, price }) =>{
                return <li key={id} onClick={() => onItem(id)}>
                    <h2>{title}</h2>
                    <FontAwesomeIcon icon={faHeartSolid} onClick={e => {
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

export default Favs