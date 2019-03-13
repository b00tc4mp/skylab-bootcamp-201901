import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom' 
import logic from '../../logic'
import Search from '../Search'
import Feedback from '../Feedback'

class Results extends Component {
    state = { events: null,results: this.props.results ,searchFeedback:null}


    componentDidMount(){
        debugger
        console.log(this.props)
        const {match:{params:{query}}} = this.props
        try {
            logic.listEventsByQuery(query)
                .then(results => {
                    debugger
                    console.log(results)
                    this.setState({ results })
                })
                .catch( ({message}) => {
                    debugger
                    this.setState({ searchFeedback : message,results: null })
                    console.log(message)
                }) 
        } catch ({message}) {
            debugger
            this.setState({ searchFeedback : message,results: null})
        }
    }

    componentWillReceiveProps({match:{params:{query}}}){
        debugger
        try {
            logic.listEventsByQuery(query)
                .then(results => {
                    debugger
                    console.log(results)
                    this.setState({ results ,searchFeedback:null})
                })
                .catch( ({message}) => {
                    this.setState({searchFeedback : message, results: null })
                    console.log(message)
                }) 
        } catch ({message}) {
            this.setState({searchFeedback : message, results: null})
        }
    }

    

    render(){
        const {handleSearch,state:{results,searchFeedback}  } = this
        console.log(results)
        return(
            <section className="results section columns is-multiline">
            <Link to="/home">Go home</Link>
            <Search onSearch={handleSearch} />
             {(results || []).map(result => (             
                <Link to={`/event/${result.id}`}> 
                    <img className="image" src={result.category.image} alt={result.title} />
                    <h2>{result.title}</h2>
                </Link>
            )
            )}
            { searchFeedback && <Feedback message={searchFeedback} level="warn" /> }

            </section>
        )
    }
}

export default Results