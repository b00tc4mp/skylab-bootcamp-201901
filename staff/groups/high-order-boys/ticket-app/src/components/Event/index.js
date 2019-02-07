import React, {Component, Fragment} from 'react'
import EventDetails from '../EventDetails';
import logic from '../../logic';
import Feedback from '../Feedback';

class Event extends Component {
    state = {event: null, feedback: null, isFav: false }

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
            logic.checkFavourite(id)
            .then(res => this.setState({isFav: res}))
            .then(() => logic.retrieveEvent(id))
            .then(event => this.setState({event}))
        } catch(err) {
            this.setState({feedback: err.message})
        }
     }

     handleEventFavourite = eventId => {
            logic.toggleFavourite(eventId)
            .then( res => this.setState({isFav: res}))
     }


    render() {
        const {state: {feedback, event, isFav}, handleEventFavourite} = this
        return<Fragment>
            {event && <EventDetails event={event} onFavourite={handleEventFavourite} isFavourite={isFav} />}
            {feedback && <Feedback message= {feedback} />}
        </Fragment>
    }
}

export default Event