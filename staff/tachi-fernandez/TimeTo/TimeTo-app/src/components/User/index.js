import React, {Component} from 'react'
import logic from '../../logic'
import {Link} from 'react-router-dom'
import './index.css'

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

   
            </div>

            <div className="user__button">
                    <Link className="user__button-modify" to="/user-modify">Modify User</Link>
                    <Link to="/home" className="user__button-home">Go home</Link>

            </div>
            </section>
        )
    }
}

export default User