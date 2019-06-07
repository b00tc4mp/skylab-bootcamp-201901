import React, { useState, useRef, useEffect } from 'react'
import './index.sass'
import ProductSubCategory from './ProductSubCategory'
import TitleCategory from '../../TitleCategory'
import Maps from '../../Maps'



function ProductSection({ products, showError, handleAddCard, card }) {

    const orderCategory = useRef()
    const [step, setStep] = useState(0)

    useEffect(() => {
        const element = orderCategory.current
        debugger
        if (element) {
            const elementHeight = element.clientHeight
            debugger
            const movement = (elementHeight * step * -1) + 'px'
            debugger
            element.style = `transform: translate3d(0, ${movement},0)`
        }
    }, [step])

    const handlenNextStep = () => {
        debugger
        if (step < 4) setStep(step + 1)
        debugger
    }


    const handlenPrevStep = () => {
        if (step > 0) setStep(step - 1)
    }

    return (
        <>
            <div>
                <button onClick={handlenPrevStep}>Prev</button>
                <button onClick={handlenNextStep}>Next</button>
            </div>
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
                {showError && <h1>{showError}</h1>}
            </div>
        </>
    )
}

export default ProductSection