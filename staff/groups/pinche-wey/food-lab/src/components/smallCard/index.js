import React from 'react'
import logic from '../../logic';

function SmallCard({ toPaint, onItem }) {
    return <div className="results">
        {
          toPaint && toPaint.map(({ idMeal: id, strMeal: title, strMealThumb: img }) => {
                return <span key={id} onClick={() => onItem(id)}>
                    <img src={img} />
                    <h4>{title}</h4> 
                </span>
            })
        }
    </div>
}

export default SmallCard