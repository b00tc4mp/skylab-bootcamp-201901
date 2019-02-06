import React, {Component, Fragment} from 'react'
import EventDetails from '../EventDetails';
import logic from '../../logic';
import Feedback from '../Feedback';

class Event extends Component {
    state = {event: null, feedback: null}

    componentDidMount() {
        const{ props: {id}} = this
        
        this.handleEventSelected(id)
    }

    componentWillReceiveProps(props) {
        const { id } = props

        this.handleEventSelected(id)
    }

    handleEventSelected = id => {
        try {
            logic.retrieveEvent(id)
                .then(event => this.setState({event}))
        } catch(err) {
            this.setState({feedback: err.message})
        }
     }

    render() {
        const {state: {feedback, event}} = this
        return<Fragment>
            {event && <EventDetails event={event} />}
            {feedback && <Feedback message= {feedback} />}
        </Fragment>
    }
}

export default Event