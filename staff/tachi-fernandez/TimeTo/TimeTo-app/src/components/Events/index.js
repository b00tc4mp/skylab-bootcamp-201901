import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import './index.css'

class Events extends Component {
    state = { results: '',y : '',m : '', d : ''  }
    componentDidMount() {
        try {
            logic.retrieveUser()
                .then(results => {
                    this.setState({ results })
                    console.log(results)
                    // const date = new Date(results && results.events.map(_date => {
                    //     return date = _date.date
                    // }));
                    //     this.setState({y: date.getFullYear()});
                    //     this.setState({m : date.getMonth() + 1});
                    //     this.setState({d : date.getDate()});
                })
                .catch(({ error }) => {
                    this.setState({ results: null })
                    console.log(error)
                })
        } catch ({ message }) {
            this.setState({ results: null })
        }
    }

    render() {
        const { results,y,m,d } = this.state
        const { events = [] } = results
        console.log(events)

        return (
            <section className="my-events">
                <Link to="/home">Go home</Link>
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

                                    <p className="my-events__event-dateAndUbication-date">Date: {`${y} / ${m} / ${d} `}</p>

                                    <p className="my-events__event-dateAndUbication-city">{_event.city}</p>

                                    <p className="my-events__event-dateAndUbication-address">{_event.address}</p>

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