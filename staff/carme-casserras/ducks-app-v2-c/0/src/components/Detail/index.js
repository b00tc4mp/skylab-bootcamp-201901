import React from 'react'

function Detail({ item: { title, image, description, price } }) {
    return <section>
        <h2>{title}</h2>
        <img src={image} />
        <p>{description}</p>
        <span>{price}</span>
        <button></button>
    </section>
}

export default Detail