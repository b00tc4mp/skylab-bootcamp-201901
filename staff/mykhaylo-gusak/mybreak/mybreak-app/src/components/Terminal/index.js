import React, { useState, useEffect } from 'react';
import logic from '../../logic'
import './index.sass'

function Terminal() {

    const [order, setOrder] = useState(false)
    const { pathname } = window.location

    useEffect(async () => {
        const id = pathname.slice(7)
        const response = await logic.retrieveOrderById(id)
        debugger
        setOrder(response)
    }, [])
    
    return (
        <section className='g-terminal'>
            <div className='g-terminal-content'>
                <h1 className='g-terminal-content-title'>Order number: {pathname.slice(7)}</h1>
                <div className='g-terminal-content-products'>
                    {order && order.products.map(({ image, title, price, author }) => {
                        return <article className='g-terminal-content-products-item'>
                            <img src={image} alt={title} />
                            <h2>{title}</h2>
                            <p>{price} €</p>
                        </article>
                    })
                    }
                </div>
            </div>
        </section>
    );
}

export default Terminal



