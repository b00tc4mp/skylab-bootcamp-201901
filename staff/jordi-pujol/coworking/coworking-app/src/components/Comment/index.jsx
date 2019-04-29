import React, { Component } from 'react'
import logic from '../../logic';

class Comment extends Component {

    state = { myComment: null }

    componentWillMount() {

        const { props: { comment } } = this

        try {
            return logic.retrieveUser()
                .then(user => {
                    if (user.userName == comment.user.userName) this.setState({ myComment: comment.user.userName })
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        catch (error) {
            console.error(error)
        }
    }

    handleDeleteComment = event => {
        event.preventDefault()

        const { props: { onDeleteComment, comment: { id } } } = this

        onDeleteComment(id)
    }


    render() {

        const { props: { comment }, state: { myComment }, handleDeleteComment } = this

        return <section className="comment">
            <p>- {comment.text}</p>
            <article>
                <p>{comment.user.userName}</p>
                <p>{comment.date.substring(0, 10) + ' ' + comment.date.substring(11, 16)}</p>
            </article>
            {myComment && <form onSubmit={handleDeleteComment}>
                <button className="delete">delete comment</button>
            </form>}
        </section>
    }

}

export default Comment