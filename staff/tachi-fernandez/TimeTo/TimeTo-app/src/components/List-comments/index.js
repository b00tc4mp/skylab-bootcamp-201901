import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import Event from '../../plugins/bus'
import './index.css'

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

    // handleComment = () => {
    //     comments.map(_comment =>{
    //         const date = new Date(_events.date);
    //             this.setState({y: date.getFullYear()});
    //             this.setState({m : date.getMonth() + 1});
    //             this.setState({d : date.getDate()});
    //             this.setState({h: date.getFullYear()});
    //             this.setState({min : date.getMonth() + 1});
    //             this.setState({s : date.getDate()});
    //     })
    // }

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


                       {(comment.commentAuthor._id === userId) &&  <button  className="comment__card-button"  value={comment.id} onClick={(event) => deleteComment(event, eventId)}>Delete Comment</button>}
                    </div>
                )
                )}
            </section>
        )
    }
}

export default ListComments