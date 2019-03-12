import React from 'react'

function ExerciseItem({ results: {title, summary, test, id}, myKey, onEdit, onDelete}) {
    return (
        <div className="itemlist-item" key={myKey}>
            <h3 className="itemlist-item__header title is-4">
            {title}
            </h3>
            <p className="itemlist-item__description">{summary}</p>

            <p className="itemlist-item__test">{test}</p>
            <button className="itemlist-item__button button is-text" onClick={() => onEdit(id)}>edit</button>
            <button className="itemlist-item__button-delete button" onClick={() => onDelete(id)}><i className="material-icons">clear</i></button>
            <hr />
        </div>
    )
}

export default ExerciseItem