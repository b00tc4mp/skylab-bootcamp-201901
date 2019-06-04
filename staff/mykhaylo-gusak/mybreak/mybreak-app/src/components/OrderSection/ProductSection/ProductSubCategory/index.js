import React from 'react'
import TitleSubCategory from './TitleSubCategory'
import Products from './Products'



function ProductSubCategory({ products }) {
    debugger

    return (
        <div className='g-ProductSubCategory'>
            <TitleSubCategory subTitle={'Beer'} />
            <Products products={products} />
        </div>

    )
}

export default ProductSubCategory