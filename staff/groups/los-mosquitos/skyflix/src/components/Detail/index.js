import React from 'react'

function Detail({ item: { title, image, description, genres, date, vote} }) {
    return <section>
        <h2>{title}</h2>
        <span>{vote}</span>
        <img src={image} />
        <p>{description}</p>
        <p><span>{genres}</span>|<span>{date}</span></p>
    </section>
}

export default Detail