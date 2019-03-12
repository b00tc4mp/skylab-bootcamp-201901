import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic';
import Feedback from '../Feedback'
import Comment from '../Comment'

class FullService extends Component {

    state = { activeService: '', comment: '', comments: [], feedback: null }

    componentDidMount() {

        const { props: { service } } = this

        try {
            logic.retrieveService(service)
                .then(service => this.setState({ activeService: service }))
                .then(() => logic.retrieveWorkspaceComments(service))
                .then(comments => this.setState({ comments }))
                .catch(({ message }) => this.setState({ feedback: message }))
        }
        catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.service !== state.activeService)
            return {
                service: props.service
            }
        return null
    }

    componentDidUpdate(prevProps) {

        const { props: { service } } = this

        if (service !== prevProps.service)
            try {
                logic.retrieveService(service)
                    .then(service => this.setState({ activeService: service }))
                    .then(() => logic.retrieveWorkspaceComments(service))
                    .then(comments => this.setState({ comments }))
                    .then(() => this.setState({feedback: null}))
                    .catch(({ message }) => this.setState({ feedback: message }))
            }
            catch ({ message }) {
                this.setState({ feedback: message })
            }
    }

    handleSubmitForm = event => {
        event.preventDefault()

        const { state: { activeService: { id } } } = this

        try {
            logic.addUserToService(id)
                .then(() => this.props.history.push('/home/inbox'))
                .catch(({ message }) => this.setState({ feedback: message }))
        }
        catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleCommentInput = event => this.setState({ comment: event.target.value })

    handleSubmitComment = event => {
        event.preventDefault()

        const { state: { comment }, props: { service } } = this

        try {
            return logic.createComment(service, comment)
                .then(id => id)
                .then(() => logic.retrieveWorkspaceComments(service))
                .then(comments => this.setState({ comments }))
                .catch(({ message }) => this.setState({ feedback: message }))
        }
        catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleDeleteComment = id => {

        const { props: { service } } = this

        try {
            logic.removeComment(service, id)
                .then(() => logic.retrieveWorkspaceComments(service))
                .then(comments => this.setState({ comments }))
                .catch(({ message }) => this.setState({ feedback: message }))
        }
        catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {

        const { state: { feedback, activeService: { title, description, user, submitedUsers, maxUsers, date, place, time, active }, comments }, handleDeleteComment, handleSubmitForm, handleCommentInput, handleSubmitComment } = this

        let formatedDate

        if (date) formatedDate = date.substring(0, 10) + ' ' + date.substring(11, 16)

        return <section className="full-service">
            <h2 className="full__service--title">Title: {title}</h2>
            <p className="full__service--description"> Description: {description}</p>
            <p className="full__service--description">Service provider: {user}</p>
            <p className="full__service--description">Submited users: {submitedUsers && submitedUsers.length ? submitedUsers.length : '0'}</p>
            <p className="full__service--description">Max users: {maxUsers}</p>
            <p className="full__service--description">Place: {place}</p>
            <p className="full__service--description">Expected service duration: {time} mins</p>
            <p className="full__service--description">Avilable to submit: {active ? 'Yes' : 'No'}</p>
            <p >Upload date and time: {formatedDate}</p>
            <form onSubmit={handleSubmitForm}>
                <button className="full-service__button">Submit to this Service</button>
            </form>
            {comments && comments.map(comment => <Comment onDeleteComment={handleDeleteComment} comment={comment} />)}
            <form onSubmit={handleSubmitComment}>
                <img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/chat-circle-blue-512.png" alt="#" />
                <input placeholder="comment..." onChange={handleCommentInput} />
                <button className="full-service__button">Add a comment</button>
            </form>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}
export default withRouter(FullService)