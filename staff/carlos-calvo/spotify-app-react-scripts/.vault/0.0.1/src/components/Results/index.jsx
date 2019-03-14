'use strict'

import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

function Results({ title, results, onItemClick, feedback }) {
    return <section className="results">
        <h3>{title}</h3>
        {feedback && <Feedback message={feedback} level="warn" />}
        <ul>
            {results && results.map(({ id, title }) => <li className="results__item" key={id} onClick={() => onItemClick(id)}>{title}</li>)}
        </ul>
    </section>
}

export default Results