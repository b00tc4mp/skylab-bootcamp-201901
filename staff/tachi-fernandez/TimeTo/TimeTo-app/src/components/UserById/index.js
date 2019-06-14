import React, {Component} from 'react'
import logic from '../../logic'
import {withRouter} from 'react-router-dom'
import './index.css'
import feedback from '../../plugins/feedback'

class UserById extends Component{
    state = {results: '',userName : ''} 
    componentDidMount(){
        try {
        const {match:{params:{userName}}} = this.props   
            logic.retrieveUserById(userName)

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

        return( 
            <section>
            <div className="user">

            <div className="user__image">
            <img className="user__image-img" src={results.image} alt={results.name} />
            </div>

            <div className="user__content"> 
            
            <div className="user__name">
            <label className="user__name-label">Name:</label>
            <p className="user__name-paragraph">{results.name}  {results.surname}</p> 
            </div>
            

            <div className="user__username">
            <label className="user__username-label">Username:</label>
            <p className="user__username-paragraph">{results.userName}</p>
            </div>

            <div className="user__description" >
            <label className="user__description-label">Description:</label>
            <p className="user__description-paragraph">{results.description}</p>
            </div>

            <div className="user__age">
            <label className="user__age-label">Age:</label>
            <p className="user__age-paragraph">{results.age}</p>
            </div>

            </div>

            </div>

            </section>
        )
    }
}

export default withRouter(UserById)