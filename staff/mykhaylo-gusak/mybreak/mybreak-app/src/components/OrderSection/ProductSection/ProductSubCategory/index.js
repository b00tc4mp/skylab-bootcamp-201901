import React from 'react'
import TitleSubCategory from '../../../TitleSubCategory'
import Products from './Products'


function ProductSubCategory({ products, subCategoryOfProduct, categoryOfProduct, handleAddCard, card }) {


    return (
        <div className='g-Home__order-section-products-category-subCategory'>
            <TitleSubCategory subTitle={subCategoryOfProduct} />
            <Products products={products} subCategoryOfProduct={subCategoryOfProduct} categoryOfProduct={categoryOfProduct} handleAddCard={handleAddCard} card={card} />
        </div>

    )
}

export default ProductSubCategory