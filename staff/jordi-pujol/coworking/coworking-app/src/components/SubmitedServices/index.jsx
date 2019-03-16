import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import logic from '../../logic'
import Service from '../Service'

class SubmitedServices extends Component {

    state = { myServices: [], name: null }

    componentWillMount() {
        let _services = []
        return logic.retrieveUserSubmitedServices()
            .then(services => {
                services.map(service => {
                    if (!service.closed) {
                        _services.push(service)
                    }
                })
            })
            .then(() => this.setState({ myServices: _services }))
    }

    handleServiceClick = id => {

        // const { state: { myServices } } = this

        // const index = myServices.findIndex(service => service.id === id)
        // const _services = myServices
        // _services.splice(index, 1)

        // this.setState({ myServices: _services })
    }

    render() {

        const { state: { myServices }, handleServiceClick } = this

        return <section className="submited">
            <h2 className="title">Submited Services</h2>
            {myServices && myServices.map(service =>
                <Service myservice={null} key={service.id} servicesFor={service} onServiceSelected={handleServiceClick} />)}
        </section>
    }
}

export default SubmitedServices