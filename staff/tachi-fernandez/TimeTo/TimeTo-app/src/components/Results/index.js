import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom' 
import logic from '../../logic'
import Search from '../Search'
import Feedback from '../Feedback'
import './index.css'

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
                    this.showMessageSearch(message)
                }) 
        } catch ({message}) {
            debugger
            this.showMessageSearch(message)
        }
    }

    showMessageSearch = message => {
        this.setState({ searchFeedback: message })
        setTimeout(()=> {
          this.setState({ searchFeedback: null })
        }, 4000)
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
                    this.showMessageSearch(message)
                }) 
        } catch ({message}) {
            this.showMessageSearch(message)
        }
    }

    

    render(){
        const {handleSearch,state:{results,searchFeedback}  } = this
        console.log(results)
        return(
            <section className="results">
            <Search onSearch={handleSearch} />

             {(results || []).map(result => ( 
                 <div className="results__card" >
                <Link className="results__card-link" to={`/event/${result.id}`}> 
                    <img className="results__card-image" src={result.category.image} alt={result.title} />
                    <h2 className="results__card-title">{result.title}</h2>
                </Link>
                 </div>            
            )
            )}
            { searchFeedback && <Feedback message={searchFeedback} level="warn" /> }

            </section>
        )
    }
}

export default Results