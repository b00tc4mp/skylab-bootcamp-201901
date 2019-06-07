import React, { useState } from 'react'
import logic from '../../../logic'
import './index.sass'
import Product from '../../OrderSection/ProductSection/ProductSubCategory/Products/Product/index.js'
import MyProduct from './Myproduct'


function MyProducts({ card, categoryOfProduct, handleAddCard }) {

    return (
        <div className='g-Home__order-user-myProducts' >
            {card &&
                card.map(({ _id, title, price, category , image}) => {
                    if (category === categoryOfProduct) return <MyProduct title={title} price={price} image={image} key={_id} />
                })
            }
        </div>
    )
}

export default MyProducts