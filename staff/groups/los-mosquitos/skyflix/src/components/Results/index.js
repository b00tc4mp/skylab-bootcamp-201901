import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
// import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

function Results({ items, onItem, onList, list, error }) {
    return <ul>
        <p>{error}</p>
        {
            items.map(({ id, title, image }) => {
                // const isList = list.some(movie => movie.id === id)

                return <li key={id} onClick={() => onItem(id)}>
                    <h2>{title}</h2>
                    {/* FontAwesome */}
                    <img src={image} />
                </li>
            })
        }
    </ul>
}

export default Results

//<FontAwesomeIcon icon={isFav ? faHeartSolid : faHeartRegular} onClick={e => {
//                         e.stopPropagation()
//                         onFav(id)
//                     }} />