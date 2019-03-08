import React from 'react'

function AnswerForm({ manageSubmit, manageChange, previousAnswer }) {
    return (
        <form onSubmit={manageSubmit} >
        
            <textarea 
                type="text" 
                value={previousAnswer} 
                placeholder="start coding your solution here..." 
                onChange={manageChange} 
            required />

            <button>SEND</button>
        </form>
    )
}

export default AnswerForm