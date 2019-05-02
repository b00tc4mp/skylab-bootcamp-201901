import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import './index.sass'

function Results({ items: { meals }, onItem, wanted, done }) {

    return <div className="results">
    <div>
    <   h2 className='results__cont-title'>Searing results</h2>
    </div>
        {
            meals.map(({ idMeal: id, strMeal: title, strMealThumb: img, strArea: area, strCategory: category }) => {
                { title = title.substring(0, Math.min(title.length, 30)); }
                return <div className='results__container' key={id} onClick={() => onItem(id)}>
                    <div className='results__tags-container'>
                       { area && <p  className='results__tags-title'><span className='results__tags-tags'>{area}</span></p>}
                       { category && <p className='results__tags-title' ><span className='results__tags-tags'>{category}</span></p> }
                       { wanted && wanted.indexOf(id) !== -1 && <FontAwesomeIcon icon={faUtensils} />}
                       { done && done.indexOf(id) !== -1 && <FontAwesomeIcon icon={faStar} />}
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