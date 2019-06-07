import React from 'react'
import './index.sass'


function ProductPrice({priceProduct}) {


    return (<>
        <div className='g-Home__order-section-products-category-subCategory-products-price'>
            <p >{priceProduct} €</p>
        </div>



    </>)
}

export default ProductPrice