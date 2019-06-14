import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import Event from '../../plugins/bus'
import './index.css'
import feedback from  '../../plugins/feedback'

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
            .catch( ({message}) => {
                feedback(message , "error")
            }) 
        }
             catch ({message}) {
                feedback(message , "error")
    }
    }
    

    handleListComments = () => {
        const { eventId } = this.props
        try {
            logic.listComments(eventId)
                .then(comments => {
                    this.setState({ comments, eventId , author : comments.author})                    
                })
                .catch(({ message }) => {
                    feedback(message , "error")
                   
                })
        } catch ({ message }) {
            feedback(message , "error")
        }
    }


    deleteComment = (event, eventId) => {
        const { currentTarget: { value } } = event
        try {
            logic.deleteComment(eventId, value)
                .then(() => {

                    const commentsArr = this.state.comments.filter(myComent => {
                        return myComent.id !== value;
                    })

                    commentsArr <= 0 ? this.setState({ comments: [] }) : this.setState({ comments: commentsArr })
                    
                })
                .catch((message) => {
                    feedback(message , "error")
                })
        } catch ({ message }) {
            feedback(message , "error")
        }
    }

    

    render() {
        const { state: { eventId, comments = [], userId }, deleteComment } = this
        return (
            <section className="comment">
                {comments && (comments || []).map(comment => (
                    <div className="comment__card">

                        <div className="comment__card-user" >
                            <Link  className="comment__card-user" type="text" to={`/${comment.commentAuthor.userName}`}>
                                <img className="comment__card-user-img" src={comment.commentAuthor.image} alt={comment.text} /> 
                                <p className="comment__card-user-username" >{comment.commentAuthor.userName}</p>
                            </Link>
                        </div>

                        <div className="comment__card-text" >
                        <p>{comment.text}</p>
                        </div>


                       {(comment.commentAuthor._id === userId) &&  <button  className="comment__card-button"  value={comment.id} onClick={(event) => deleteComment(event, eventId)}>Delete</button>}
                    </div>
                )
                )}
            </section>
        )
    }
}

export default ListComments