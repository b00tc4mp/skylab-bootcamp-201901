import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Service from '../Service'
import FullService from '../FullService'
import logic from '../../logic';
import Feedback from '../Feedback'
import OtherProfile from '../OhtersProfile'
import Search from '../Search'

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

    handleSearch = query => {

        try {
            logic.searchServices(query)
                .then(services => {
                    if (services[0] == null) {
                        this.setState({ feedback: 'no results', services: null })
                    }
                    else {
                        this.setState({ services, feedback: null })
                    }
                })
        }
        catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleViewAll = () => {

        try {
            logic.retrieveUser()
                .then(({ workspace }) => {
                    return logic.retrieveWorkspaceServices(workspace)
                })
                .then(services => this.setState({ services, feedback: null }))
                .catch(({ message }) => this.setState({ feedback: message }))
        }
        catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {

        const { state: { services, feedback }, handleServiceClick, handleSubmitService, handleSearch, handleViewAll } = this

        return (<section className="inbox">
            <div><i className="fas fa-circle red"><p>Active</p></i><i className="fas fa-circle blue"><p>Inactive</p></i><i className="fas fa-circle purple"><p>My service</p></i></div>
            <Search onSearch={handleSearch} onViewAll={handleViewAll} />
            {services && services.map(service => {
                if (!service.closed) {
                    return <Service myservice={null} key={services.id} servicesFor={service} onServiceSelected={handleServiceClick} />
                }
            }
            )}
            <Route exact path='/home/inbox/service/:id' render={(props) => <FullService service={props.match.params.id} onServiceSubmit={handleSubmitService} origin="inbox"/>} />
            <Route exact path='/home/inbox/profile/:username' render={(props) => <OtherProfile username={props.match.params.username} origin="inbox" />} />
            {feedback && <Feedback message={feedback} />}
        </section>)
    }
}

export default withRouter(Inbox)