import React from 'react'
import './index.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

function NavCard({ card, toggle }) {
    return (
        <div className='g-ShoppingBasket'  >
            <FontAwesomeIcon icon={faShoppingBasket} className='g-ShoppingBasket__icon' />
            <p className='g-ShoppingBasket__text'> </p>
        </div>
    )
}

export default NavCard