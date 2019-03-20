import React, {Component} from 'react'
import { Route, withRouter } from 'react-router-dom'

import logic from '../../logic'
import Service from '../Service'
import FullService from '../FullService'

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

    handleServiceClick = id => this.props.history.push(`/home/myservices/submited/service/${id}`)

    render() {

        const { state: { myServices }, handleServiceClick } = this

        return <section className="submited">
            <h2 className="title">Submited Services</h2>
            {myServices && myServices.map(service =>
                <Service myservice={null} key={service.id} servicesFor={service} onServiceSelected={handleServiceClick} />)}
            <Route exact path='/home/myservices/submited/service/:id' render={(props) => <FullService service={props.match.params.id} origin="submited" />} />
        </section>
    }
}

export default withRouter(SubmitedServices)