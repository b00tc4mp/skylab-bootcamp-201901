import React from 'react'
import ProductTitle from './ProductTitle'
import ProductPrice from './ProductPrice'
import ProductImg from './ProductImg'
import './index.sass'


function Product({ image, titleProduct, priceProduct, click }) {

    debugger
    return (<>
        <a href='#' onClick={click} className='g-Product'>
            <ProductImg image={image} titleProduct={titleProduct} />
            <ProductTitle titleProduct={titleProduct} />
            <ProductPrice priceProduct={priceProduct} />
        </a>



    </>)
}

export default Product