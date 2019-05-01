import React from 'react'
import literals from './literals'

function Results({lang, items, onItem }) {

    const {title1, title2, title3, back} = literals[lang]
    return <section>
    <h2>{title1}</h2>
    <button>{back}</button>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>

    </ul>

    </section>
}

export default Results