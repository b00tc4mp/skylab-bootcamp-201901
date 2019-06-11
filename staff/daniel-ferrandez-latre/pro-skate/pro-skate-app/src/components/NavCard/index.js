import React , {useState, useEffect}from 'react'
import './index.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

function NavCard({quantity}) {

    return (
        <div className='g-ShoppingBasket'  >
            <FontAwesomeIcon icon={faShoppingBasket} className='g-ShoppingBasket__icon' />
            <p className='g-ShoppingBasket__text'> {quantity !== 0 ? quantity : ''}</p>
        </div>
    )
}

export default NavCard