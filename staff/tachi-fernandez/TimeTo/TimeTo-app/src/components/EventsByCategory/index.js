import React, { Component } from 'react'
import logic  from '../../logic'
import {Link,Redirect,withRouter} from 'react-router-dom'
import feedback from  '../../plugins/feedback'
import './index.css'

class EventsByCategory extends Component {
    state ={results : ''}
    componentDidMount(){
        const {match:{params:{categoryId = ''}}} = this.props
        try {
            logic.listEventsByCategory(categoryId)
                .then(results => {
                    this.setState({ results })
                })
                .catch( ({message}) => {
                    feedback(message , "error")
                }) 
        } catch ({message}) {
            feedback(message , "error")
        }
    }

    render(){
        const {state:{results}} = this
        return (
            
            <section>
                
                {logic.isUserLoggedIn ? results && (results || []).map(result => (
                <div className="events__card">
                <Link className="events__card-link" to={`/event/${result.id}`}>
                    <img className="events__card-image" src={result.category.image} alt={result.title} />
                    <h2 className="events__card-title" >{result.title}</h2> 
                </Link>
                </div>                
            )
                ) : <Redirect to ='/login-or-register'/> }
            </section>
        )
    }
}

export default  withRouter(EventsByCategory)