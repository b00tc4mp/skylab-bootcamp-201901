import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Service from '../Service'
import FullService from '../Full-Service'
import logic from '../../logic';

class Inbox extends Component {

    state = { services: '', activeService: {} }

    componentWillMount() {
        logic.retrieveUser()
            .then(({ workspace }) => {
                return logic.retrieveWorkspaceServices(workspace)
            })
            .then(services => this.setState({ services }))
    }

    handleServiceClick = id => this.props.history.push(`/home/inbox/service/${id}`)

    // handleSubmitService= id => {
    //     return logic.addUserToService(id)
    //         .then(() => this.props.history.push('home/inbox'))
    // }

    render() {

        const { state: { services, activeService }, handleServiceClick, handleSubmitService } = this

        return (<section className="inbox">
            {services && services.map(service =>
                <Service key={services.id} servicesFor={service} onServiceSelected={handleServiceClick} />
            )}
            <Route path='/home/inbox/service/:id' render={(props) => <FullService service={props.match.params.id} onServiceSubmit={handleSubmitService} />} />
        </section>)
    }
}

export default withRouter(Inbox)