import React from 'react'
import './index.sass'
function Product({image, title, price }) {
    return (
        <div className='g-product'>
            <img src={image} alt={title} />
            <p>{title}</p>
            <p>{price} €</p>
        </div>
    )
}

export default Product