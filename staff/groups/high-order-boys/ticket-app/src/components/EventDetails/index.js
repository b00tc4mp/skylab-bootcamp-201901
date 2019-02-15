import React, {Component} from 'react'
import './index.sass'

class EventDetails extends Component {

    render() {
        const {props: {event, onFavourite, isFavourite}} = this

        return <section className="eventResults">
        <div className="block columns is-centered has-text-centered">
            <div className="column">
                <h1 className="eventTitle">{event.name}</h1>
                {event.images && event.images[0].url && <img className="eventImage" src={event.images[0].url} />}
                {event._embedded.attractions[0].externalLinks && event._embedded.attractions[0].externalLinks.facebook && <a href={event._embedded.attractions[0].externalLinks.facebook[0].url} target="_blank"><i class="fab fa-facebook fa-2x"></i></a>}
                {event._embedded.attractions[0].externalLinks && event._embedded.attractions[0].externalLinks.instagram && <a href={event._embedded.attractions[0].externalLinks.instagram[0].url} target="_blank"><i class="fab fa-instagram fa-2x"></i></a>}
                {event._embedded.attractions[0].externalLinks && event._embedded.attractions[0].externalLinks.twitter && <a href={event._embedded.attractions[0].externalLinks.twitter[0].url} target="_blank"><i class="fab fa-twitter fa-2x"></i></a>}
                {event._embedded.attractions[0].externalLinks && event._embedded.attractions[0].externalLinks.youtube && <a href={event._embedded.attractions[0].externalLinks.youtube[0].url} target="_blank"><i className="fab fa-youtube fa-2x"></i></a>}
                {event.dates && event.dates.start && event.dates.start.localDate && <p>{event.dates.start.localDate}</p>}
                {event.dates && event.dates.start && event.dates.start.localTime && <p>{event.dates.start.localTime}</p>}
                {event.priceRanges && event.priceRanges[0].min && <p className="eventMin">{event.priceRanges[0].min} - </p>}
                {event.priceRanges && event.priceRanges[0].max && <p className="eventMin">{event.priceRanges[0].max}</p>}
                {event.priceRanges && event.priceRanges[0].currency && <p className="eventCurrency"> {event.priceRanges[0].currency}</p>}
                {event._embedded && event._embedded.venues && event._embedded.venues[0].name && <p className="venue">{event._embedded.venues[0].name}</p>}
                {event.url && <button onlick="#" className="button is-info is-outlined is-one-third"><a href={event.url} target="_blank">Buy now</a></button>}
                {isFavourite ? <i onClick={()=>onFavourite(event.id)} className="fas fa-heart fa-2x full"></i> : <i onClick={()=>onFavourite(event.id)} className="far fa-heart fa-2x empty"></i>}
            </div>   
        </div>   
        </section>
    }
}

export default EventDetails