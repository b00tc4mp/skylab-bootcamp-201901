import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import Event from '../../plugins/bus'

class ListComments extends Component {
    state = { comments: '', eventId: '', commentId: '' }
    componentDidMount() {
        this.handleListComments()
        Event.$on('updateComments', () => {
            this.handleListComments()
        } )

    }

    handleListComments = () => {
        const { eventId } = this.props
        try {
            logic.listComments(eventId)
                .then(comments => {
                    this.setState({ comments, eventId })
                    console.log(comments)
                })
                .catch(({ error }) => {
                    this.setState({ comments: null })
                    console.log(error)
                })
        } catch ({ message }) {
            this.setState({ comments: null })
        }
    }

    deleteComment = (event, eventId) => {
        const { currentTarget: { value } } = event
        try {
            logic.deleteComment(eventId, value)
                .then(() => {

                    const commentsArr = this.state.comments.filter(_coment => {
                        return _coment.id !== value;
                    })

                    commentsArr <= 0 ? this.setState({ comments: [] }) : this.setState({ comments: commentsArr })
                    
                })
                .catch((error) => {
                    console.log('mierda')
                })
        } catch ({ message }) {
            this.setState({ comments: null })
        }
    }

    render() {
        const { state: { eventId, comments = [] }, deleteComment } = this
        return (
            <section>
                {comments && (comments || []).map(comment => (
                    <div>
                        <p>{comment.text}</p>
                        <p>{comment.date}</p>
                        <Link type="text" to={`/${comment.commentAuthor._id}`}>
                            <div>
                                {comment.commentAuthor.name + ' ' + comment.commentAuthor.surname}
                            </div>
                        </Link>
                        <button value={comment.id} onClick={(event) => deleteComment(event, eventId)}>Delete Comment</button>
                    </div>
                )
                )}
            </section>
        )
    }
}

export default ListComments