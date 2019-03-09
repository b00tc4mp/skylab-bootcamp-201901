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


    handleServiceClick = id => {
        console.log(id)
        // hacer llamada con el id
        logic.retrieveService(id)
            .then(service => this.setState({ activeService: service }, this.props.history.push(`/home/inbox/service/${id}`)))
    }

    render() {

        const { state: { services, activeService }, handleServiceClick } = this

        return (<section>
            {services && services.map(service =>
                <Service key={services.id} servicesFor={service} onServiceSelected={handleServiceClick} />
            )}
            <Route path='/home/inbox/service/:service' render={() => <FullService service={activeService} />} />
        </section>)
    }
}

export default withRouter(Inbox)