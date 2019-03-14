import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Service from '../Service'
import FullService from '../Full-Service'
import logic from '../../logic';
import Feedback from '../Feedback'

class Inbox extends Component {

    state = { services: '', feedback: null }

    componentWillMount() {
        try {
            logic.retrieveUser()
                .then(({ workspace }) => {
                    return logic.retrieveWorkspaceServices(workspace)
                })
                .then(services => this.setState({ services }))
                .catch(({ message }) => this.setState({ feedback: message }))
        }
        catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleServiceClick = id => this.props.history.push(`/home/inbox/service/${id}`)

    render() {

        const { state: { services, feedback }, handleServiceClick, handleSubmitService } = this

        return (<section className="inbox">
            <div><i class="fas fa-circle blue"><p>Active</p></i><i class="fas fa-circle red"><p>Inactive</p></i><i class="fas fa-circle purple"><p>My service</p></i></div>
            {services && services.map(service => {
                if (service.active) {
                return <Service myservice={null} key={services.id} servicesFor={service} onServiceSelected={handleServiceClick} />} }
            )}
            <Route path='/home/inbox/service/:id' render={(props) => <FullService service={props.match.params.id} onServiceSubmit={handleSubmitService} />} />
            {feedback && <Feedback message={feedback} />}
        </section>)
    }
}

export default withRouter(Inbox)