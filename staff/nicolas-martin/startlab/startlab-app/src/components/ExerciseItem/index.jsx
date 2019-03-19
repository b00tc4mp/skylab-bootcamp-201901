import React from 'react'
const ReactMarkdown = require('react-markdown')

function ExerciseItem({ results: {title, order, summary, id, theme}, myKey, onEdit, onDelete}) {
    return (
        <div className="itemlist-item" key={myKey}>
        
            <div className="itemlist-item__header message-header">
            
                <div className="tags has-addons">
                    <span className="tag">{title}</span>
                </div>

                <div className="itemlist-item__header__buttons">
                    <button className="itemlist-item__header-delete delete" onClick={() => onDelete(id)}></button>
                </div>
            </div>

            <ReactMarkdown 
                className="itemlist-item__summary message-body"
                source={summary}
                escapeHtml={false}
            />

            <div className="itemlist-item__footer">
                <button className="itemlist-item__footer-edit button is-small" onClick={() => onEdit(id)}>edit</button>
                <div className="itemlist-item__footer-theme tags has-addons">
                    <span className="tag">Unit</span>
                    <span className="tag is-warning">{theme}</span>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default ExerciseItem