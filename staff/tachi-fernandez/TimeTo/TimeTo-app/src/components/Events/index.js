import React, {Component} from 'react'
import logic from '../../logic'
import {Link} from 'react-router-dom'
import './index.css'

class Events extends Component{
    state = {results: ''} 
    componentDidMount(){
        try {
            debugger
            logic.retrieveUser()
                .then(results => {
                    this.setState({ results })
                    console.log(results)
                })
                .catch( ({error}) => {
                    this.setState({ results: null })
                    console.log(error)
                }) 
        } catch ({message}) {
            this.setState({ results: null})
        }
    }

    render(){
        const {results} = this.state
        const {events = []} = results

        return( 
            <section className="my-events">
            <Link to="/home">Go home</Link>
            <div>
                {(events || [] ).map(_event => {
                    return(
                        <div className="my-events__event">

                        <div className="my-events__event-title">
                        <label>Title:</label>
                        <p>{_event.title}</p>   
                        </div>    

                        <div>
                        <label>Description:</label>
                        <p>{_event.description}</p>   
                        </div>

                        <div>
                        <label>Date:</label>
                        <p>{_event.date}</p>   
                        </div>

                        <div>
                        <label>City:</label>
                        <p>{_event.city}</p>   
                        </div>

                        <div>
                        <label>Address:</label>
                        <p>{_event.address}</p>   
                        </div>

                        <div>
                        <label>Category:</label>
                        <p>{_event.category.name}</p>   
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