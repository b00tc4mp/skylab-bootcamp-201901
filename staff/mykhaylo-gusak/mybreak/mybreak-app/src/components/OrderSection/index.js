import React, { useState } from 'react'
import './index.sass'
import ProductSection from './ProductSection'

function OrderSection({ products, setNewOrder, showError, handleAddCard, card, handleResetProducts, handleAddOrder, newOrder, email }) {
    return (
        <div className='g-Home__order-ctn'>
            <section className='g-Home__order-section'>
                <ProductSection setNewOrder={setNewOrder} handleResetProducts={handleResetProducts} products={products} showError={showError} card={card} handleAddCard={handleAddCard} handleAddOrder={handleAddOrder} newOrder={newOrder} email={email} />
            </section>
        </div>
    );
}

export default OrderSection