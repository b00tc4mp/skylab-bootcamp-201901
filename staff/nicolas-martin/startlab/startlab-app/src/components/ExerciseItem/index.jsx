import React from 'react'

function ExerciseItem({ results: {title, summary, test, id} }) {
    return (
        <div className="exercise-item" key={id}>
            <h3>{title}</h3>
            <p>{summary}</p>
            <p>{test}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}

export default ExerciseItem