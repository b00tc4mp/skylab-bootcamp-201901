import React from 'react'
import literals from './literals'
import './index.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'

function ShoppingCart({ lang, items, onCart, cart, onCheckout, onDeleteCart }) {
    const { title, total, noResults, checkout, remove } = literals[lang]

    debugger
    if (!items || items.length === 0) {
        return <section>
            <h1>{title}</h1>
            <p>{noResults}</p>
        </section>
    }     

    let totalPrice = 0
    items.forEach((item)=>{
        item = Number((item.price).slice(0, (item.price).length - 2)) 
         totalPrice += item 
    })
    totalPrice = totalPrice.toFixed(2)
    

    return <section>
        <h1>{title}</h1>
        <ul>
        {
            items.map(({ id, title, image, price }) =>{
                let cartButton
                if (cart) {
                    cartButton = <FontAwesomeIcon icon={faShoppingCart} onClick={e => {
                                    e.stopPropagation()
                                    onCart(id)
                                }} />
                } else cartButton = ''

                return <li key={id}>
                            <h3>{title}</h3>
                            <img src={image} />
                            <span>{price}</span>
                            {cartButton}
                        </li>
            })
        }
        </ul>
        <h3>{total} {totalPrice}</h3> 
        <button onClick={e => { e.stopPropagation()
                                onCheckout(totalPrice) }
                        }>{checkout}<FontAwesomeIcon icon={faCreditCard} />
        </button>
        <button onClick={e => { e.stopPropagation()
                                onDeleteCart() }
                        }>{remove}
        </button>
   </section>
}

export default ShoppingCart