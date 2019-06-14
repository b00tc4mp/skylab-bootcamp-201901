import React from 'react'
import './index.sass'
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

function NavCard({quantity, history}) {

    return (
        <div className='g-ShoppingBasket' onClick={() => history.push('/cart')} >
            <FontAwesomeIcon icon={faShoppingBasket} className='g-ShoppingBasket__icon'  />
            <p className='g-ShoppingBasket__text'> {quantity !== 0 ? quantity : ''}</p>
        </div>
    )
}

export default withRouter(NavCard)