import React from "react"
import './index.sass'

function ProductPrice({ price }) {
    return(
        <p className='g-Home__order-user-myProducts-myProduct-price'>{price} €</p>
    )
}

export default ProductPrice