import React , {useState, useEffect}from 'react'
import './index.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

function NavCard({ quantity}) {
    // const [quantity, setQuantity] = useState('')

    // useEffect(    
    //     async ()=> {
        
    //     const quantityItems = await cartItemsQuantity()
    //     setQuantity(quantityItems)
        
    // }, [])

    return (
        <div className='g-ShoppingBasket'  >
            <FontAwesomeIcon icon={faShoppingBasket} className='g-ShoppingBasket__icon' />
            <p className='g-ShoppingBasket__text'> {quantity}</p>
        </div>
    )
}

export default NavCard