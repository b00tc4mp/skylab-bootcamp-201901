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
                    .then(() => this.setState({ feedback: null }))
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

    handleCloseModal = event => {
        this.props.history.push('/home/inbox')
    }

    render() {

        const { state: { feedback, activeService: { title, description, user, submitedUsers, maxUsers, date, place, time, active }, comments }, handleDeleteComment, handleSubmitForm, handleCommentInput, handleSubmitComment, handleCloseModal } = this

        let formatedDate

        if (date) formatedDate = date.substring(0, 10) + ' ' + date.substring(11, 16)

        return <section className="fullservice">
            <div className="fullservice__content">
                <div className="full__content--info">
                    <h2 className="fullservice__content--title">Service: {title}</h2>
                    <p className="fullservice__content--item"> Description: {description}</p>
                    <p className="fullservice__content--item">Service provider: {user}</p>
                    <p className="fullservice__content--item">Submited users: {submitedUsers && submitedUsers.length ? submitedUsers.length : '0'}</p>
                    <p className="fullservice__content--item">Max users: {maxUsers}</p>
                    <p className="fullservice__content--item">Place: {place}</p>
                    <p className="fullservice__content--item">Expected service duration: {time} mins</p>
                    <p className="fullservice__content--item">Avilable to submit: {active ? 'Yes' : 'No'}</p>
                    <p >Upload date and time: {formatedDate}</p>
                    <form onSubmit={handleSubmitForm}>
                        <button className="fullservice__button">Submit to this Service</button>
                    </form>
                    {feedback && <Feedback message={feedback} />}
                </div>
                <div className="full__content--comments">
                    <section>
                    <h2>Comments</h2>
                    <i onClick={handleCloseModal} className="fas fa-window-close fa-2x"></i>
                    </section>
                    {comments && comments.map(comment => <Comment onDeleteComment={handleDeleteComment} comment={comment} />)}
                    <form onSubmit={handleSubmitComment}>
                        <input placeholder="comment..." onChange={handleCommentInput} />
                        <button className="full-service__button">Add new comment</button>
                        {/* <i class="fas fa-comment"></i> */}
                    </form>
                </div>
            </div>
        </section>
    }
}
export default withRouter(FullService)