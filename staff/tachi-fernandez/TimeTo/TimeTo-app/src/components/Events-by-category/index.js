import React, { Component } from 'react'
import logic  from '../../logic'
import {Link,Redirect} from 'react-router-dom'
import RedirectLoginOrRegister from '../Redirect-Login-or-Register';

class EventsByCategory extends Component {
    state ={results : ''}
    componentDidMount(){
        const {match:{params:{categoryId = ''}}} = this.props
        try {
            logic.listEventsByCategory(categoryId)
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
        const {state:{results}} = this
        return (
            
            <section>
                <div>
                <Link to="/home">Go home</Link>
                </div>
                {logic.isUserLoggedIn ? results && (results || []).map(result => (             
                <Link to={`/event/${result.id}`}>
                    <img className="image" src={result.category.image} alt={result.title} />
                    <h2>{result.title}</h2> 
                </Link>
            )
                ) : <Redirect to ='/login-or-register'/> }
            </section>
        )
    }
}

export default  EventsByCategory