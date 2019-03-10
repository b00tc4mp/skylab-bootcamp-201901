import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic';

class FullService extends Component {

    state = {activeService:''}

    componentDidMount () {

        const {props: {service}} = this

        return logic.retrieveService(service)
            .then(service => this.setState({ activeService: service }))
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
            return logic.retrieveService(service)
                .then(service=> this.setState({activeService: service}))
    }


    handleSubmitForm = event=> {
        event.preventDefault()

        const {state: {activeService: {id}} }= this

        return logic.addUserToService(id)
            .then(() => this.props.history.push('/home/inbox'))
    }
    


    render() {

        const { state: { activeService: { title, description, user, submitedUsers, maxUsers, date, place } }, handleSubmitForm } = this

        let formatedDate

        if (date) formatedDate = date.substring(0, 10) + ' ' + date.substring(11, 16)


        return <section className="full-service">
            <h2 className="full__service--title">Title: {title}</h2>
            <p className="full__service--description"> Description: {description}</p>
            <p className="full__service--description">Service provider: {user}</p>
            <p className="full__service--description">Submited users: {submitedUsers}</p>
            <p className="full__service--description">Max users: {maxUsers}</p>
            <p className="full__service--description">Place: {place}</p>
            <p >Upload date and time: {formatedDate}</p>
            <form onSubmit={handleSubmitForm}>
                <button className="full-service__button">Submit to this Service</button>
            </form>
            <form onSubmit={handleSubmitForm}>
                <img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/chat-circle-blue-512.png" alt="#"/>
                <button className="full-service__button">Add a comment</button>
            </form>
        </section>
    }
}
export default withRouter(FullService)