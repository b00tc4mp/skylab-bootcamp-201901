import React from 'react'
import './index.sass'
import ProductSubCategory from './ProductSubCategory'
import TitleCategory from './TitleCategory'



function ProductSection({ products, showError }) {

    return (
        <div className='g-ProductSection'>
            <TitleCategory title={'Drink'} />
            {products && <ProductSubCategory products={products} />}
            {showError && <h1>{showError}</h1>}
        </div>)
}

export default ProductSection