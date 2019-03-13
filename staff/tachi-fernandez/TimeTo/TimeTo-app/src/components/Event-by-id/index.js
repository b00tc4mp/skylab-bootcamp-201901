import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import ListComments from '../List-comments'
import CreateComment from '../Create-comment'

import Event from '../../plugins/bus'

class EventById extends Component {
    state = { events: '', eventId: '', user: null, button: false, y : '',m : '', d : '' , h : '', min: '' , s:''   }
    componentWillMount() {
        const { match: { params: { eventId = '' } } } = this.props
        try {
            logic.listEventById(eventId)
                .then(_events => {
                    this.setState({ events: _events })
                    const date = new Date(_events.date);
                        this.setState({y: date.getFullYear()});
                        this.setState({m : date.getMonth() + 1});
                        this.setState({d : date.getDate()});
                        this.setState({h : date.getHours()});
                        this.setState({min : date.getMinutes()});
                        this.setState({s : date.getSeconds()});
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

    toogleEvent(eventId) {
        // const{state:{button}} = this
        // console.log(event)
        try {
            debugger
            logic.toogleEvent(eventId)
                .then(response => {
                    // button === true ? alert('saliste de el evento') : 
                    // alert('entraste en el evento')
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
                        <label>Title:</label>
                        <p>{events.title}</p>
                    </div>

                    <div>
                        <label>Creator of the event:</label>
                        <Link to={`/${events.author && events.author._id}`} >
                            <div>
                                <p>{events.author && events.author.name}</p>
                            </div>
                        </Link>
                    </div>

                    <div>
                        <label>Description:</label>
                        <p>{events.description}</p>
                    </div>

                    <div>
                        <label>Date:</label>
                        <p>Date: {`${y} / ${m} / ${d} - ${h}:${min}:${s}`}</p>
                    </div>

                    <div>
                        <label>Ubication:</label>
                        <p>{events.ubication}</p>
                    </div>

                    <div>
                        <label>Category:</label>
                        <p>{events.category && events.category.name}</p>
                    </div>

                    <div>
                        <label>Members:</label>

                        {events.members && (events.members || []).map(member => (
                            <div>
                                <Link type="text" to={`/${member._id}`}>
                                    <div>
                                        {member.name}
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