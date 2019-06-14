import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './index.sass'
import literals from './literals'

function Results({lang, items, isResFav, onItem, onFav, favs, onCart, cart }) {
    const { titleFav, noResults } = literals[lang]

    if (!items) {
        return <section>
            <h1>{title}</h1>
            <p>{noResults}</p>
        </section>
    }  

    let title
    if (isResFav)
        title = titleFav
    else title = ''

    return <section>
        <h1>{title}</h1>
        <ul>
        {
            items.map(({ id, title, image, price }) =>{
                const isFav = favs.some(fav => fav.id === id)

                let cartButton
                if (cart) {
                    const isInCart = cart.some(cartItem => cartItem.id === id)
                    cartButton = <FontAwesomeIcon icon={isInCart ? faShoppingCart : faCartPlus} onClick={e => {
                                    e.stopPropagation()
                                    onCart(id)
                                }} />
                } else cartButton = ''

                return <li key={id} onClick={() => onItem(id)}>
                            <h2>{title}</h2>
                            <FontAwesomeIcon icon={isFav ? faHeartSolid : faHeartRegular} onClick={e => {
                                e.stopPropagation()
                                onFav(id)
                            }} />
                            <img src={image} />
                            <span>{price}</span>
                            {cartButton}
                        </li>
            })
        }
        </ul>
    </section>
}

export default Results