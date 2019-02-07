import React, {Component} from 'react'

class EventDetails extends Component {

    render() {
        const {props: {event, onFavourite, isFavourite}} = this

        console.log('eveeent', event)

        return <section>
           <h1>DETAIL {event.name}</h1>
           <button onClick={()=>onFavourite(event.id)}>Add Favourite</button>
           {isFavourite ? <i class="fas fa-thumbs-up"></i> : <i class="fas fa-thumbs-down"></i>}
        </section>
    }
}

export default EventDetails