import React, { useState, useEffect } from 'react'
import Product from './Product'
import './index.sass'

function Order({ products, date }) {

    const [total, setTotal] = useState(0)
    useEffect(() => {
        let acc = 0
        products && products.map(elem => {
            acc += Number(elem.price)
        })
        setTotal(acc)
    }, [total])

    return (
        <div className='g-order'>
            <div className='g-order__prev'>
                <p>Products: {products.length}</p>
                <p>Total: {total.toFixed(2)} €</p>
            </div>
            <div className='g-order__extra'>
                {products.map(({ image, title, price }) => {
                    return <Product image={image} title={title} price={price} />
                })}
            </div>
        </div>
    )
}

export default Order