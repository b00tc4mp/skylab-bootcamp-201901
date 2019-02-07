'use strict'

import React, { Component } from 'react'

import './index.sass'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

class Comments extends Component {
    state = { text: '' }

    handleTextInput = event => this.setState({ text: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        if (logic.userLoggedIn) {
            const { state: { text }, props: { onComment, updateComments } } = this

            onComment(text)

            this.setState({ text: '' })
        } else {
            this.props.history.push('/login')
        }

    }

    //#region revisar

    handleCommentDeletion = date => {

        const { props: { onDelete, updateComments } } = this

        onDelete(date)
    }
    //#endregion

    render() {
        const { handleFormSubmit, handleTextInput, handleCommentDeletion, props: { comments, id, mode } } = this

        return <section className="comments">
            <h3 className={`${mode ? 'comments__text comments__text-light' : 'comments__text comments__text-dark'}`}>Comments:</h3>
            <form onSubmit={handleFormSubmit} id="commentForm" className="comments__form">
                <textarea className={`${mode ? 'comments__textarea textarea comments__textarea-light': 'comments__textarea textarea comments__textarea-dark'}`} value={this.state.text} form="commentForm" rows="5" cols="50" onChange={handleTextInput} placeholder="add a public comment..." clearButtonMode="always"></textarea>
                <button className="comments__send button is-link">Send</button>
            </form>
            <div>
                {
                    comments.map(({ name, comments }) => {
                        if (comments[id]) {
                            return comments[id].map(comment => <div key={comment.date}>
                                {/* <p>{name}</p>
                                <p>{comment.text}</p>
                                <p>{comment.date}</p>
                                <button onClick={() => handleCommentDeletion(comment.date)}>X</button> */}
                                <article class="message is-dark eachcomment">
                                    <div class="message-header eachcomment__header">
                                        <p>{name}</p>
                                        <button class="delete" aria-label="delete" onClick={() => handleCommentDeletion(comment.date)}></button>
                                    </div>
                                    <div class="message-body eachcomment__body">
                                        <p className="eachcomment__text">{comment.text}</p>
                                        <p className="eachcomment__date">{comment.date}</p>
                                    </div>
                                </article>
                            </div>)
                        }
                    })
                }
            </div>
        </section>
    }
}

export default withRouter(Comments)