import React from "react"
import ProductImage from './ProductImage'
import ProductPrice from './ProductPrice'
import ProductTitle from './ProductTitle'
import './index.sass'

function MyProduct({ title, price, image }) {

    return (
        <div className='g-Home__order-user-myProducts-myProduct' >
            <div className='g-Home__order-user-myProducts-myProduct-image'>
                <ProductImage image={image} />
            </div>
            <ProductTitle title={title} />
            <ProductPrice price={price} />
        </div>
    )

}

export default MyProduct