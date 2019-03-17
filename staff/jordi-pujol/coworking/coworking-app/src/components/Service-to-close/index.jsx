import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic';
import ClosedService from '../ClosedService'

class ServiceClosed extends Component {

    state = { myServices: [], name: null }

    componentWillMount() {
        let _services = []
        return logic.retrieveUserServices()
            .then(services => {
                services.map(service => {
                    if (!service.active && !service.closed) {
                        _services.push(service)
                    }
                })
            })
            .then(() => this.setState({ myServices: _services }))
    }

    handleClosedService = id => {

        const { state: { myServices } } = this

        const index = myServices.findIndex(service => service.id === id)
        const _services = myServices
        _services.splice(index, 1)

        this.setState({ myServices: _services })
    }

    render() {

        const { state: { myServices }, handleClosedService } = this

        return <section className="servicetoclose">
            <h2>Services to close</h2>
            <div className="servicestoclose">
                {myServices && myServices.map(service =>
                    <ClosedService services={service} serviceClosed={handleClosedService} />)}
            </div>
        </section>
    }
}

export default withRouter(ServiceClosed)