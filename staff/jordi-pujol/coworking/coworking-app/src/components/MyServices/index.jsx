import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'

import logic from '../../logic'
import Service from '../Service'
import FullService from '../FullService'

class MyServices extends Component {

    state = { myServices: [], name: null }

    componentWillMount() {
        let _services = []
        return logic.retrieveUserServices()
            .then(services => {
                services.map(service => {
                    if (!service.closed) {
                        _services.push(service)
                    }
                })
            })
            .then(() => this.setState({ myServices: _services }))
    }

    handleServiceClick = id => this.props.history.push(`/home/myownservices/service/${id}`)

    render() {

        const { state: { myServices }, handleServiceClick } = this

        return <section className="myServices">
            <h2 className="title">Services I am offering:</h2>
            {myServices && myServices.map(service =>
                <Service myservice={true} key={service.id} servicesFor={service} onServiceSelected={handleServiceClick} />)}
            <Route exact path='/home/myownservices/service/:id' render={(props) => <FullService service={props.match.params.id} origin="myservices" />} />
        </section>
    }
}

export default withRouter(MyServices)