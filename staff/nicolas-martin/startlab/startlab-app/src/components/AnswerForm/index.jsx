import React from 'react'

function AnswerForm({ manageSubmit, manageChange, previousAnswer }) {
    return (
        <form onSubmit={manageSubmit}>

            <textarea 
                type="text" 
                className="textarea " 
                value={previousAnswer} 
                placeholder="start coding your solution here..." 
                onChange={manageChange} 
                required 
            />

            <button className="button is-info">Send</button>
        </form>
    )
}

export default AnswerForm