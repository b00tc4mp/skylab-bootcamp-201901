import React, { Component } from 'react'
import {Route , withRouter,Link} from 'react-router-dom'
import Search from '../Search'
import Results from '../Results'
import Categories from '../Categories'
import logic from '../../logic'

class Home extends Component {
    state = { events: null,results: []  }

    handleSearch = query =>{
        try {
            logic.listEventsByQuery(query)
                .then(results => {
                    debugger
                    console.log(results)
                    this.setState({ results })
                    this.props.history.push(`/results/${query}`)               
                })
                .catch( ({error}) => {
                    this.setState({ results: null })
                    console.log(error)
                }) 
        } catch ({message}) {
            this.setState({ results: null})
        }
    }

    render() {
        const {handleSearch , state:{results}} = this
        return (
            <section className="home">
                <h1 className="home__title">Home</h1>
                <Search onSearch={handleSearch} />
                {/* <Route path='/home' component={Categories} /> */}

                {  results.length > 0 ? <Results results={results} /> : <Categories />}
            </section>
        )
    }
}

export default withRouter(Home)