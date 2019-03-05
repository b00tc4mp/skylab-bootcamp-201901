import React from 'react'

function ExerciseItem({ results: {title, summary, test, id}, myKey, onEdit, onDelete}) {
    return (
        <div className="exercise-item" key={myKey}>
            <h3>{title}</h3>
            <details>{summary}</details>
            <p>{test}</p>
            <button onClick={() => onEdit(id)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
            <hr />
        </div>
    )
}

export default ExerciseItem