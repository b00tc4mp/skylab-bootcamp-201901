import React from "react"
import ProductImage from './ProductImage'
import ProductPrice from './ProductPrice'
import ProductTitle from './ProductTitle'
import './index.sass'

function MyProduct({ title, price, image, id, handleAddCard }) {

    return (
        <article className='g-Home__order-user-myProducts-myProduct' key={id}>
            <div className='g-Home__order-user-myProducts-myProduct-image'>
                <ProductImage image={image} />
            </div>
            <ProductTitle title={title} />
            <ProductPrice price={price} />
        </article>
    )

}

export default MyProduct