import React, { Component } from 'react'
import logic from '../../logic'
import { Link,withRouter } from 'react-router-dom'
import ListComments from '../ListComments'
import CreateComment from '../CreateComment'
import './index.css'
import feedback from  '../../plugins/feedback'
import Event from '../../plugins/bus'

class EventById extends Component {
    state = { events: '', eventId: '', user: null, button: false, y : '',m : '', d : '' , h : '', min: '' , s:'',members : []  }
    componentDidMount() {
        this.listEvents()
    }

    listEvents(){
        const { match: { params: { eventId = '' } } } = this.props
        try {
            logic.listEventById(eventId)
                .then(_events => {
                    this.setState({ events: _events , members: _events.memebrs})
                    const date = new Date(_events.date);
                        this.setState({y: date.getFullYear()} 
                        , {m : date.getMonth() + 1} 
                        , {m : date.getMonth() + 1})
                    return logic.retrieveUser()
                        .then(user => {
                            this.setState({ user }, () => {
                                _events.members.some(member => member._id === user.id) ?
                                 this.setState({ button: true }) : 
                                 this.setState({ button: false })
                                
                            })
                        })

                })
                .catch(({ error }) => {
                    feedback(error , "error")
                })
        } catch ({ message }) {
            feedback(message , "error")
        }
    }

    handleCreateComment = (eventId, text) => {
        try {
            logic.createComment(eventId, text)
                .then(() => {
                    Event.$emit('updateComments', [])

                })
                .catch(({ message }) => {
                    feedback(message , "error")
                })
        } catch ({ message }) {
            feedback(message , "error")
        }
    }

    toogleEvent = (eventId) => {
        try {
            logic.toogleEvent(eventId)
                .then(response => {
                    this.listEvents()
                })
                .catch(({ message }) => {
                    feedback(message , "error")
                })
        } catch ({ message }) {
            feedback(message , "error")
        }
    }

 



    render() {
        const { handleCreateComment, toogleEvent, state: { events, button, y, m, d}, props: { match: { params: { eventId = '' } } } } = this
        
        return (
            <section className="event">
                <div className="event__card" >
                        <div  className="event__card-container"  >
                        {events.category && <img className="event__card-container-img" src={events.category.image} alt={events.title} /> }
                        <p className="event__card-container-category">{events.category && events.category.name}</p>
                        </div>
                    <div className="event__card-title">
                        <h2 className="event__card-title-h2">{events.title}</h2>
                    </div>
                    

                    

                    <div className="event__card-description">
                        <p className="event__card-description-paragraph">{events.description}</p>
                    </div>

                    <div className="event__card-dateAndUbication" >

                        
                        <p className="event__card-dateAndUbication-date"> <i class="fas fa-calendar-alt"></i> Date: {`${y} / ${m} / ${d} `}</p>

                        <p className="event__card-dateAndUbication-city"> <i class="fas fa-city"></i> {events.city}</p>

                        <p className="event__card-dateAndUbication-address"> <i class="fas fa-road"></i> {events.address}</p>

                    </div>


                    <div className="event__card-creathor">
                        <label className="event__card-creathor-label" >By</label>
                            <Link className="event__card-creathor-paragraph" to={`/${events.author && events.author.userName}`} >
                                <p>{events.author && events.author.userName}</p>
                            </Link>
                    </div>
                    
                    </div>

                    <div>
                        <label className="white" >Members:</label>

                        <div className="event__members" >
                        {events.members && (events.members || []).map(member => (
                                <div>
                                <Link type="text" className="event__members-link" to={`/${member.userName}`}>
                                    <div className="event__members-container">
                                    <img className="event__members-container-img" src={member.image} alt={member.name} />
                                    </div>
                                    <div className="event__members-container-username">
                                        <h2>{member.userName}</h2>
                                    </div>
                                </Link>
                                </div>

                                )
                            )}
                        </div>
                        <div>
                            {(button === true) ? <button className="event__members-container-button-enter" onClick={() => toogleEvent(eventId)}>Leave</button> : <button className="event__members-container-button-exit" onClick={() => toogleEvent(eventId)}>Join</button>}
                        </div>
                    </div>
                <CreateComment eventId={eventId} onCreateComment={handleCreateComment} />
                <ListComments eventId={eventId} />
            </section>
        )
    }
}

export default withRouter(EventById)