import React from 'react'

function feedback({message, level}) {
    return <section className={`feedback ${level ? level : ''}`}>
    <p>{message}</p>
    </section>
}