import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import feedback from  '../../by-plugins/feedback'

class Events extends Component {
    state = { results: '',y : '',m : '', d : ''  }
    componentDidMount() {
        try {
            logic.retrieveUser()
                .then(results => {
                    this.setState({ results })       
                })
                .catch(({ message }) => {
                    feedback(message , "error")
                })
        } catch ({ message }) {
            feedback(message , "error")
        }
    }

    render() {
        const { results } = this.state
        const { events = [] } = results

        return (
            <section className="my-events">
                <div>
                    {(events || []).map(_event => {
                        return (
                            <div className="my-events__event">

                                <div className="my-events__event-img" >
                                    {_event.category && <img className="my-events__event-img-image" src={_event.category.image} alt={_event.title} />}
                                </div>
                                <div className="my-events__event-title">
                                    <h2 className="my-events__event-title-h2">{_event.title}</h2>
                                </div>

                                <div className="my-events__event-description">
                                    <p className="my-events__event-description-paragraph">{_event.description}</p>
                                </div>

                                <div  className="my-events__event-dateAndUbication" >

                                    <p className="my-events__event-dateAndUbication-date"> <i class="fas fa-calendar-alt"></i>  {_event.date && _event.date.substring(0,10)}</p>

                                    <p className="my-events__event-dateAndUbication-city"> <i class="fas fa-city"></i>  {_event.city}</p>

                                    <p className="my-events__event-dateAndUbication-address"> <i class="fas fa-road"></i> {_event.address}</p>

                                </div>

                            </div>
                        )

                    })}
                </div>
            </section>
        )
    }
}

export default Events