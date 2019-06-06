import React from 'react'

function ItemDetail({item}) {
    return <>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
    </>
}

export default ItemDetail