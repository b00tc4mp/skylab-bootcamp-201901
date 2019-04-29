import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
// import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

import './index.sass'

function Results({ items: { meals }, onItem }) {
    
    return <div className="results">
        {
            meals.map(({ idMeal: id, strMeal: title, strMealThumb: img }) => {
                { title = title.substring(0, Math.min(title.length, 30));}
                return <span key={id} onClick={() => onItem(id)}>
                    <img src={img} />
                    <h4>{title}</h4> 
                </span>
            })
        }
    </div>
}


export default Results