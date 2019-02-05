'use strict'

import React, {Component} from 'react'

import './index.sass'
import {withRouter} from 'react-router-dom'
import logic from '../../logic'

class Comments extends Component {
    state = { text: '' }

    handleTextInput = event => this.setState({ text: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        
        if(logic.userLoggedIn){
            const { state: { text }, props: { onComment } } = this
        
            onComment(undefined ,text)
        }else{
            this.props.history.push('/login')
        }

        const {props : {updateComments}} = this

        updateComments()
    }

    handleCommentDeletion = date => {

        const  { props: { onDelete } } = this

        onDelete(date)
    }

    render() {
        const { handleFormSubmit, handleTextInput, handleCommentDeletion, props: { comments, id } } = this

        return <section>
            <h3>Comments:</h3>
            <form onSubmit={handleFormSubmit} id="commentForm">
                <button>Send</button>
            </form>
            <textarea form="commentForm" rows="5" cols="50" onChange={handleTextInput} placeholder="add a public comment..." clearButtonMode="always"></textarea>
            <div>
                {
                    comments.map(({ name, comments }) => {
                        if(comments[id]){
                            return comments[id].map(comment =>  <div key={comment.date}>
                                <p>{name}</p>
                                <p>{comment.text}</p>
                                <p>{comment.date}</p>
                                <button onClick={() => handleCommentDeletion(comment.date)}>X</button>
                            </div>)
                        }
                    })
                }
            </div>
        </section>
    }
}

export default withRouter(Comments)