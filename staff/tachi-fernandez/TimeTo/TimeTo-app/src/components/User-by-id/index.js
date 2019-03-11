import React, {Component} from 'react'
import logic from '../../logic'
import {Link,withRouter} from 'react-router-dom'

class UserById extends Component{
    state = {results: '',userId : ''} 
    componentDidMount(){
        try {
            debugger
        const {match:{params:{userId}}} = this.props   
        debugger         
            logic.retrieveUserById(userId)

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

        return( 
            <section>
                <h2>Hola</h2>
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


            </div>

            <div>
            <Link to="/home" className="user__link-home">Go home</Link>
            </div>  
            </section>
        )
    }
}

export default withRouter(UserById)