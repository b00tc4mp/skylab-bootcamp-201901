'use strict'

import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

function Results({ title, results, onItemClick, onToggleFavorite, feedback }) {
    return <section className="results">
        <h3>{title}</h3>
        {feedback && <Feedback message={feedback} level="warn" />}
        <ul>
            {results && results.map(({ id, title, isFavorite }) => <li className="results__item" key={id}><a href="#" onClick={() => onItemClick(id)}>{title}</a> <i className={`${isFavorite? 'fas' : 'far'} fa-heart`} onClick={() => onToggleFavorite(id)}></i></li>)}
        </ul>
    </section>
}

export default Results