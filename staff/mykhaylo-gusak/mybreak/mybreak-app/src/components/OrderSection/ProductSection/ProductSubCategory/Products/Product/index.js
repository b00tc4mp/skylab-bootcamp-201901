import React from 'react'
import ProductTitle from './ProductTitle'
import ProductPrice from './ProductPrice'
import ProductImg from './ProductImg'
import './index.sass'
const cx = require('classnames');

function Product({ image, titleProduct, priceProduct, click, selected }) {

    const className = cx({
        'g-Home__order-section-products-category-subCategory-products-product g-Home__order-section-products-category-subCategory-products-product--selected': selected,
        'g-Home__order-section-products-category-subCategory-products-product': !selected
    })

    return (<>
        <a href='#' onClick={click} className={className}>
            <ProductImg image={image} titleProduct={titleProduct} />
            <ProductTitle titleProduct={titleProduct} />
            <ProductPrice priceProduct={priceProduct} />
        </a>



    </>)
}

export default Product