import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import ListComments from '../List-comments'
import CreateComment from '../Create-comment'

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
                        this.setState({y: date.getFullYear()});
                        this.setState({m : date.getMonth() + 1});
                        this.setState({d : date.getDate()});
                    return logic.retrieveUser()
                        .then(user => {
                            this.setState({ user }, () => {
                                debugger
                                _events.members.some(member => member._id === user.id) ?
                                 this.setState({ button: true }) : 
                                 this.setState({ button: false })
                                console.log(_events.members.some(member => member._id === user.id))
                            })
                            //values[0].members.some()
                        })

                })
                .catch(({ error }) => {
                    this.setState({ events: null })
                })
        } catch ({ message }) {
            this.setState({ events: null })
        }
    }

    handleCreateComment = (eventId, text) => {
        try {
            logic.createComment(eventId, text)
                .then(() => {
                    Event.$emit('updateComments', [])

                })
                .catch(({ message }) => {
                    this.setState({ registerFeedback: message })
                })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    toogleEvent = (eventId) => {
        // const{state:{button}} = this
        // console.log(event)
        try {
            debugger
            logic.toogleEvent(eventId)
                .then(response => {
                    this.listEvents()
                })
                .catch(({ message }) => {
                    this.setState({ registerFeedback: message })
                })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

 



    render() {
        const { handleCreateComment, toogleEvent, state: { events, button, y, m, d, h, min, s }, props: { match: { params: { eventId = '' } } } } = this
        //console.log(events.author)
        
        return (
            <section>
                <div>
                    <Link to="/home">Go home</Link>
                    <Link to={`/category/${events.category && events.category.id}`}>Go category</Link>
                </div>
                <div>
                        <div>
                        {events.category && <img className="image" src={events.category.image} alt={events.title} /> }
                        </div>
                    <div>
                        <label>Title:</label>
                        <p>{events.title}</p>
                    </div>

                    <div>
                        <label>Creator of the event:</label>
                        <Link to={`/${events.author && events.author.userName}`} >
                            <div>
                                <p>{events.author && events.author.userName}</p>
                            </div>
                        </Link>
                    </div>

                    <div>
                        <label>Description:</label>
                        <p>{events.description}</p>
                    </div>

                    <div>
                        <label>Date:</label>
                        <p>Date: {`${y} / ${m} / ${d} `}</p>
                    </div>

                    <div>
                        <label>City:</label>
                        <p>{events.city}</p>
                    </div>

                    <div>
                        <label>Address:</label>
                        <p>{events.address}</p>
                    </div>

                    <div>
                        <label>Category:</label>
                        <p>{events.category && events.category.name}</p>
                    </div>

                    <div>
                        <label>Members:</label>

                        {events.members && (events.members || []).map(member => (
                            <div>
                                <Link type="text" to={`/${member.userName}/${member._id}`}>
                                    <div>
                                    <img className="image" src={member.image} alt={member.name} />
                                    </div>
                                    <div>
                                        {member.userName}
                                    </div>
                                </Link>
                            </div>
                        )
                        )}

                        <div>
                            {(button === true) ? <button onClick={() => toogleEvent(eventId)}>Salir</button> : <button onClick={() => toogleEvent(eventId)}>Entrar</button>}
                        </div>
                    </div>
                </div>
                <CreateComment eventId={eventId} onCreateComment={handleCreateComment} />
                <ListComments eventId={eventId} />
            </section>
        )
    }
}

export default EventById