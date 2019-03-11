import React, {Component} from 'react'
import logic from '../../logic'
import {Link} from 'react-router-dom'

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
        //const {state:{results}} = this

        return( 
            <section>
            <Link to="/home">Go home</Link>
            <div>
                {(events || [] ).map(_event => {
                    return(
                        <div>

                        <div>
                        <label>Title:</label>
                        <p>{_event.title}</p>   
                        </div>    

                        <div>
                        <label>Description:</label>
                        <p>{_event.description}</p>   
                        </div>

                        <div>
                        <label>Ubication:</label>
                        <p>{_event.ubication}</p>   
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