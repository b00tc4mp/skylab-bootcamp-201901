'use strict'

import React, {Component} from 'react'

import './index.sass'

class Comments extends Component {
    state = { text: '' }

    handleTextInput = event => this.setState({ text: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        debugger
        const { state: { text }, props: { onComment } } = this
    
        onComment(undefined ,text)
    }

    handleCommentDeletion = event => {
        event.preventDefault()

        const { state: { text }, props: { onDelete } } = this

        onDelete(text)
    }

    render() {
        const { handleFormSubmit, handleTextInput, handleCommentDeletion, props: { comments } } = this

        return <section>
            <h3>Comments:</h3>
            <form onSubmit={handleFormSubmit} id="commentForm">
                <button>Send</button>
            </form>
            <textarea form="commentForm" rows="5" cols="50" onChange={handleTextInput} placeholder="add a public comment..."></textarea>
            <div>
                {
                    // comments.map(comment => {
                    //     return <div>
                    //         <p>{comment.text}</p>
                    //         <p>{comment.date}</p>
                    //         <button onClick={handleCommentDeletion}>X</button>
                    //     </div>
                    // })
                }
            </div>
        </section>
    }
}

export default Comments