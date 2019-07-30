import React, { useState } from 'react'
import logic from '../../../../../logic'

import Product from './Product'
import './index.sass'



function Products({ products, subCategoryOfProduct, handleAddCard, card }) {

    return (
        <div className='g-Home__order-section-products-category-subCategory-products'>
            {products &&
                products.map(({ _id, title, price, image, subCategory, category }) => {


                    const selected = card.some(product => product._id === _id)

                    if (subCategory === subCategoryOfProduct) return <Product image={image} titleProduct={title} selected={selected} priceProduct={price} key={_id} click={(e) => {
                        e.preventDefault()
                        handleAddCard(_id)
                    }} />

                })
            }

        </div>



    )
}

export default Products