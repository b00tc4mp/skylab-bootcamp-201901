import React from 'react'

function Cart({ items, onItem }) {
    return <ul>
        {  
            items.map(({ id, title, image, price, qty }) =>{
                let totalLine = price * qty
                return <li key={id} onClick={() => onItem(id)}>
                    <h2>{title}</h2>
                    <img src={image} />
                    <p>{price} x {qty} = {totalLine}</p>
                </li>
                
            })
        }
    {/* <p>Total: {total}</p> */}
    </ul>
}

export default Cart