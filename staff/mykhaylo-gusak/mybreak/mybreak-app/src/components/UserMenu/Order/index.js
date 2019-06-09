import React, { useState, useEffect } from 'react'

function Order({ products, date }) {

    const [total, setTotal] = useState(0)
    debugger
    useEffect(() => {
        let acc = 0
        products && products.map(elem => {
            debugger
            acc += Number(elem.price)
        })
        setTotal(acc)
    }, [total])

    return (
        <div>
            <p>{products.length}</p>
            <p>{total}</p>
            <p>{date}</p>

        </div>
    )
}

export default Order