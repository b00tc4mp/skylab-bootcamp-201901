import React, {Component} from 'react'
import logic from '../../logic'
import {Link} from 'react-router-dom'

class User extends Component{
    state = {results: ''} 
    componentDidMount(){
        try {
            
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
        // const {results} = this.state
        // const {events = []} = results
        const {state:{results}} = this

        return( 
            <section>
            <div>
            <div>
            <label>Name:</label>
            <p>{results.name}</p> 
            <p>{results.surname}</p>
            </div>

            <div>
            <label>Description:</label>
            <p>{results.description}</p>
            </div>

            <div>
            <label>Age:</label>
            <p>{results.age}</p>
            </div>

            {/* <div>
                {events.map(_event => {
                    return(
                        <div>
                        <label>Title:</label>
                        <p>{_event.title}</p>   
                        </div>
                    )
                })}
            </div> */}

           
            </div>

            <div>
            <Link to="/home" className="user__link-home">Go home</Link>
            <Link to="/user-modify">Modify User</Link>
            </div>  
            </section>
        )
    }
}

export default User