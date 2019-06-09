import React, { useState } from 'react'
import './index.sass'
import ProductSection from './ProductSection'
import Button from '../Button'

function OrderSection({ products, showError, handleAddCard, card }) {

    const [step, setStep] = useState(0)

    const handlenNextStep = () => {
        if (step < 4) setStep(step + 1)
    }

    const handlenPrevStep = () => {
        if (step > 0) setStep(step - 1)
    }

    return (
        <div className='g-Home__order-ctn'>
            <Button click={handlenPrevStep} prev={true} primary={true} />
            <section className='g-Home__order-section'>
                {products && <ProductSection products={products} showError={showError} card={card} handleAddCard={handleAddCard} />}
            </section>
            <Button click={handlenNextStep} prev={true} primary={true} />
        </div>
    );
}

export default OrderSection