import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import logic from '../../logic'

class ClosedService extends Component {

    handleCloseService = event => {
        event.preventDefault()

        const { props: { serviceClosed, services: { id } } } = this

        serviceClosed(id)

        return logic.closeService(id)
    }

    render() {

        const { props: { services: { title, time, submitedUsers } }, handleCloseService } = this

        return <section className="closedService">
            <article>
                <h2>Service: {title}</h2>
                <p>- Expected time was {time} mins</p>
                <p>- {submitedUsers.length} person/s bought your service</p>
            </article>
            <form onSubmit={handleCloseService}>
                <button>Request submited user/s to accept time</button>
            </form>
        </section>
    }
}

export default withRouter(ClosedService)