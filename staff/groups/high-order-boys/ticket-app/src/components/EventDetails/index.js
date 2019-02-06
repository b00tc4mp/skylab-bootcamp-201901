import React, {Component} from 'react'

class EventDetails extends Component {

    render() {

        const {props: {event}} = this

        return <section>
           <h1>DETAIL {event.name}</h1>
        </section>
    }
}

export default EventDetails