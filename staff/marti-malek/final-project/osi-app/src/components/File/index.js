import React from 'react'
import './index.sass'

function File({ name, text }) {

    return <section className="file">
        <header className="file__header">{name}</header>
        <section className="file__basic">
            <p className="file__text">{text}</p>
        </section>
    </section>
}

export default File