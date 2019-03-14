import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import Event from '../../plugins/bus'

class ListComments extends Component {
    state = { comments: '', eventId: '', commentId: '' , author : '',userId : ''}
    componentDidMount() {
        this.handleListComments()
        Event.$on('updateComments', () => {
            this.handleListComments()
        } )
        try{
            logic.retrieveUser()
            .then(result => {
                this.setState({ userId : result.id })
            })
            .catch( ({error}) => {
                this.setState({ results: null })
                console.log(error)
            }) 
        }
             catch ({message}) {
        this.setState({ results: null})
    }
    }
    

    handleListComments = () => {
        const { eventId } = this.props
        const{author} = this.state
        try {
            logic.listComments(eventId)
                .then(comments => {
                    this.setState({ comments, eventId , author : comments.author})
                    console.log(author)
                    console.log(comments)
                    //
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
        const { state: { eventId, comments = [], userId }, deleteComment } = this
        return (
            <section>
                {comments && (comments || []).map(comment => (
                    <div>
                        <p>{comment.text}</p>
                        <p>{comment.date}</p>
                        <Link type="text" to={`/${comment.commentAuthor.userName}`}>
                            <div>
                                {comment.commentAuthor.userName}
                            </div>
                        </Link>
                       {(comment.commentAuthor._id === userId) &&  <button value={comment.id} onClick={(event) => deleteComment(event, eventId)}>Delete Comment</button>}
                    </div>
                )
                )}
            </section>
        )
    }
}

export default ListComments