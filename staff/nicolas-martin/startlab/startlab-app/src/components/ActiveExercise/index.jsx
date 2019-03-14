import React from 'react'
import ReactMarkdown from 'react-markdown'

function ActiveExercise({ activeExercise: { exercise: { title, summary } } }) {
    return (
        <section className="start__active-exercise">

            <h2 className="start__active-exercise__title">{title}</h2>

            <ReactMarkdown className="start__active-exercise__summary" source={summary} escapeHtml={false} />

        </section>
    )
}

export default ActiveExercise