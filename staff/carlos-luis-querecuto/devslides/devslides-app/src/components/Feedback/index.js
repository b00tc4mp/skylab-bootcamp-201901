import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'

function Feedback({ feedback , setFeedback }) {

 
    const handleClose = () => {
        setFeedback(null)
    }

    return (
        feedback && <article class={"message register_feedback " + (feedback.type === 'Success' ? 'is-success' : 'is-danger')}>
            <div class="message-header">
                <p>{feedback.type}</p>
                <button class="delete" onClick={handleClose} aria-label="delete"></button>
            </div>
            {feedback.message && <div class="message-body">
                {feedback.message}
            </div>}
        </article>
    )
}


export default withRouter(Feedback)