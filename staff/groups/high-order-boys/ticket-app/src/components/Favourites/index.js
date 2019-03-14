import React,{Component, Fragment} from 'react'
import Results from '../Results'
class Favourites extends Component {

    handleEventDetail = eventId => {
        this.props.history.push(`/home/event/${eventId}`)
    }

    render() {

        const{props: {events: events }, handleEventDetail} = this

        return <Fragment>
            {events &&  < Results results = {events} onEventDetail={handleEventDetail} />}
        </Fragment>
        
    }
}

export default Favourites