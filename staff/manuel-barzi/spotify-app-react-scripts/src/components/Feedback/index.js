import React from 'react'
import './index.sass'

function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>
        <p>{message}</p>
    </section>
}

export default Feedback