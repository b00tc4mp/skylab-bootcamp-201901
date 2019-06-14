import React, {Component} from 'react'
import logic from '../../logic'
import {withRouter} from 'react-router-dom'
import './index.css'
import feedback from '../../by-plugins/feedback'

class User extends Component{
    state = {results: ''} 
    componentDidMount(){
        try {
            logic.retrieveUser()
                .then(results => {
                    this.setState({ results })
                    console.log(results)
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
            <section className="pad">
            <div className="user">
                
            <div className="user__image">
            {(results !== '') && (<img className="user__image-img" src={results.image} alt={results.name} />)}
            </div>

            <div className="user__content">
            <div className="user__name">
            <label className="user__name-label" >Name:</label>
            <p className="user__name-paragraph"  > {results.name} {results.surname}</p> 
            </div>

            <div className="user__username">
            <label className="user__username-label">Username:</label>
            <p className="user__username-paragraph">{results.userName}</p>
            </div>

            <div className="user__description">
            <label className="user__description-label">Description:</label>
            <p className="user__description-paragraph">{results.description}</p>
            </div>

            <div className="user__age">
            <label className="user__age-label">Age:</label>
            <p className="user__age-paragraph">{results.age}  años</p>
            </div>
            </div>

            <div className="button-primary-action">

                <button  className="user__button user__button-blue"
                    onClick={()  =>  this.props.history.push('/user-modify')}> Modify User
                </button>
                               

            </div>
   
            </div>

            </section>
        )
    }
}

export default withRouter(User)