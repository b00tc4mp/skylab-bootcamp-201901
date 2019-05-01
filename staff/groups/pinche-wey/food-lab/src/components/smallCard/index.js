import React from 'react'
import logic from '../../logic';
import './index.sass'

function SmallCard({ toPaint, onItem }) {
    return <div className="smallCard">
        {
          toPaint && toPaint.map(({ idMeal: id, strMeal: title, strMealThumb: img }) => {
                return <span className="smallCard__container" key={id} onClick={() => onItem(id)}>
                   <div className='smallCard__img'>
                        <img src={img} />
                   </div>
                    <h4 className='smallCard__title' >{title}</h4> 
                </span>
            })
        }
    </div>
}

export default SmallCard