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
            const { state: { text }, props: { onComment } } = this

            onComment(text)

            this.setState({ text: '' })
        } else {
            this.props.history.push('/login')
        }

    }

    handleCommentDeletion = date => {

        const { props: { onDelete } } = this

        onDelete(date)
    }

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
                                <article class="message is-dark eachcomment">
                                    <div class={`${mode ? 'message-header eachcomment__header eachcomment__header-light' : 'message-header eachcomment__header eachcomment__header-dark'}`}>
                                        <p>{name}</p>
                                        <button class="delete" aria-label="delete" onClick={() => handleCommentDeletion(comment.date)}></button>
                                    </div>
                                    <div class={`${mode ? 'message-body eachcomment__body eachcomment__body-light' : 'message-body eachcomment__body eachcomment__body-dark'}`}>
                                        <p className={`${mode ? 'eachcomment__text eachcomment__text-light' : 'eachcomment__text eachcomment__text-dark'}`}>{comment.text}</p>
                                        <p className={`${mode ? 'eachcomment__date eachcomment__date-light' : 'eachcomment__date eachcomment__date-dark'}`}>{comment.date}</p>
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