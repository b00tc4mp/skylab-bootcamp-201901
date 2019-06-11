import React, { useState } from 'react'
import './index.sass'
import ProductSection from './ProductSection'
import Button from '../Button'
import Maps from '../Maps'

function OrderSection({ products, showError, handleAddCard, card, handleAddOrder, newOrder, email }) {
    return (
        <div className='g-Home__order-ctn'>
            <section className='g-Home__order-section'>
                <ProductSection products={products} showError={showError} card={card} handleAddCard={handleAddCard} handleAddOrder={handleAddOrder} newOrder={newOrder} email={email} />
            </section>
        </div>
    );
}

export default OrderSection