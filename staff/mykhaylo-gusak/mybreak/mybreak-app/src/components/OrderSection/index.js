import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import logic from '../../logic/index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bulma/bulma.sass'
import './index.sass'
import ProductSection from './ProductSection'
import Landing from '../../pages/Landing'

const cx = require('classnames')

function OrderSection({ products, showError, handleAddCard, card }) {

    const icons = cx({

    })

    return (<>
        <section className='g-Home__order-section'>
            {products && <ProductSection products={products} showError={showError} handleAddCard={handleAddCard} card={card} />}
        </section>
    </>);
}

export default OrderSection