import React, { useState, useRef, useEffect } from 'react'
import './index.sass'
import ProductSubCategory from './ProductSubCategory'
import TitleCategory from '../../TitleCategory'
import Maps from '../../Maps'
import StripePayament from '../../StripePayament'
import QrCode from '../../QrCode'
import Button from '../../Button'


function ProductSection({ products, showError, handleAddCard, card, total, email, handlenNextStep, handlenPrevStep }) {

    const orderCategory = useRef()
    // const [step, setStep] = useState(0)

    // useEffect(() => {
    //     const element = orderCategory.current
    //     if (element) {
    //         const elementHeight = element.clientHeight
    //         const movement = (elementHeight * step * -1) + 'px'
    //         element.style = `transform: translate3d(0, ${movement},0)`
    //     }
    // }, [step])

    const handlePurchase = () => {
        //payment
    }

    return (
        <>

            <div className='g-Home__order-section-products' ref={orderCategory} >
                <div className='g-Home__order-section-products-category'>
                    <Maps />
                </div>

                <div className='g-Home__order-section-products-category'>
                    <TitleCategory title={'Drink'} />
                    <ProductSubCategory products={products} categoryOfProduct={'drink'} subCategoryOfProduct={'Coffee'} handleAddCard={handleAddCard} card={card} />
                    <ProductSubCategory products={products} categoryOfProduct={'drink'} subCategoryOfProduct={'Refreshing drinks'} handleAddCard={handleAddCard} card={card} />
                    <ProductSubCategory products={products} categoryOfProduct={'drink'} subCategoryOfProduct={'Water'} handleAddCard={handleAddCard} card={card} />
                </div>
                <div className='g-Home__order-section-products-category'>
                    <TitleCategory title={'Food'} />
                    <ProductSubCategory products={products} categoryOfProduct={'Food'} subCategoryOfProduct={'Fruits'} handleAddCard={handleAddCard} card={card} />
                    <ProductSubCategory products={products} categoryOfProduct={'Food'} subCategoryOfProduct={'Salade'} handleAddCard={handleAddCard} card={card} />
                </div>
                <div className='g-Home__order-section-products-category'>
                    <TitleCategory title={'Bakery'} />
                    <ProductSubCategory products={products} categoryOfProduct={'Bakery'} subCategoryOfProduct={'Bakery'} handleAddCard={handleAddCard} card={card} />
                </div>

                <div className='g-Home__order-section-products-category'>
                    <QrCode text={'Primer qr'}/>
                    <StripePayament onTokenSucces={handlePurchase} email={email} total={total} />
                </div>
            </div>
        </>
    )
}

export default ProductSection