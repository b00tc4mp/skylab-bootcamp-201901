'use strict'

import React from 'react'

function Results({ title, results, onItemClick, feedback }) {
    return <section className="results">
        <h3>{title}</h3>
        {feedback && <h4 className="results__feedback">{feedback}</h4>}
        <ul>
            {results && results.map(({ id, title }) => <li className="results__item" key={id} onClick={() => onItemClick(id)}>{title}</li>)}
        </ul>
    </section>
}

export default Results