import React from 'react'
import logic from '../../../../../logic'

import Product from './Product'
import './index.sass'



function Products({ products }) {

    const handleAddCard = async (id) => {
        debugger
        await logic.cardUpdate(id)
    }


    return (
        <div className='g-Products'>
            {products &&
                products.map(({ _id, title, price, image }) => {
                    debugger
                    return <Product image={image} titleProduct={title} priceProduct={price} key={_id} click={ (e) => {
                        e.preventDefault()
                        handleAddCard(_id)
                    
                    } }/>

                })
            }

        </div>



    )
}

export default Products