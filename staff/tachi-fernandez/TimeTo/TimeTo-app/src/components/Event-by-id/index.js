import React, { Component } from 'react'
import logic  from '../../logic'
import {Link} from 'react-router-dom'
import ListComments from '../List-comments'
import CreateComment from '../Create-comment'

import Event from '../../plugins/bus'

class EventById extends Component {
    state ={events : '', eventId : ''}
    componentWillMount(){
        const {match:{params:{eventId = ''}}} = this.props
        try {
            logic.listEventById(eventId)
                .then(events => {
                    this.setState({ events, eventId })
                    console.log(events)
                })
                .catch( ({error}) => {
                    this.setState({ events: null })
                    console.log(error)
                }) 
        } catch ({message}) {
            this.setState({ events: null})
        }
    }

    handleCreateComment = (eventId,text) => {
        try {
            logic.createComment(eventId,text)
            .then( () => {
              Event.$emit('updateComments', [])
              
            })
            .catch(({message}) =>{
              this.setState({registerFeedback: message})
            })
        }catch ({message}){ 
          this.setState({registerFeedback: message})
        }
    }

    toogleEvent(eventId){
        try {
            debugger
            logic.toogleEvent(eventId)
            .then( response => {
                console.log(response)
              alert('Te has unido al evento')
            })
            .catch(({message}) =>{
              this.setState({registerFeedback: message})
            })
        }catch ({message}){ 
          this.setState({registerFeedback: message})
        }
    }




    

    render(){
        const { handleCreateComment , toogleEvent,state:{events}, props:{match:{params:{eventId = ''}}}} = this
        //console.log(events.author)
        console.log(events.category)
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
                    <p>{events.date}</p>
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
                    <button onClick={() => toogleEvent(eventId)}>I'm in</button>
                    </div>
                </div>
                <CreateComment eventId={eventId} onCreateComment={handleCreateComment} />
                <ListComments eventId={eventId} />                  
            </section>
        )
    }
}

export default  EventById