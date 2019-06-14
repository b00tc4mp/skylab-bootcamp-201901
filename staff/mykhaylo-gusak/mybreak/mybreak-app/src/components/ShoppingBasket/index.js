import React from 'react'

import './index.sass'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

function ShoppingBasket({ card, click }) {
    return (
        <div className='g-ShoppingBasket' onClick={click} >
            <FontAwesomeIcon icon={faShoppingBag} className='g-ShoppingBasket__icon' />
            <p className='g-ShoppingBasket__text'> {card.length}</p>
        </div>
    )
}

export default ShoppingBasket