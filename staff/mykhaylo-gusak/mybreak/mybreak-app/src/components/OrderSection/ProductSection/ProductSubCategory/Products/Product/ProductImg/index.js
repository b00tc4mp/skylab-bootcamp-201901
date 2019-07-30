import React from 'react'
import './index.sass'


function ProductImage({ image, titleProduct }) {

    return (
        <div className='g-Home__order-section-products-category-subCategory-products-image'>
            <img  src={image} alt={titleProduct}  />
        </div>
    )
}

export default ProductImage