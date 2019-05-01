import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
// import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

import './index.sass'

function Results({ items: { meals }, onItem }) {

    return <div className="results">
        {
            meals.map(({ idMeal: id, strMeal: title, strMealThumb: img, strArea: area,strCategory: category }) => {
                { title = title.substring(0, Math.min(title.length, 30)); }
                return <div className='results__container' key={id} onClick={() => onItem(id)}>
                    <div className='results__tags-container'>
                       { area && <p  className='results__tags-title'>Area:<span className='results__tags-tags'>{area}</span></p>}
                       { category && <p className='results__tags-title' >Category:<span className='results__tags-tags'>{category}</span></p> }
                    </div>
                    <div className='results__img'>
                        <img src={img} />
                    </div >
                    <h4 className='results__title' >{title}</h4>
                </div>
            })
        }
    </div>
}


export default Results