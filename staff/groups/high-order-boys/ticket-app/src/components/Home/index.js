import React, { Component } from 'react'
import Search from '../Search'
import Results from '../Results'
import logic from '../../logic'




class Home extends Component {
    state = {results: null, searchFeedback: ''}

    handleSearch = (city, startDate, endDate) => {
        try {
            logic.retrieveEvents(city, startDate, endDate)
            .then(data => {
                if (data instanceof Error) this.setState({searchFeedback: data})
                else this.setState({results: data}) 
            })
        } catch(err) {
            console.log(err.message)
        }
    }


    render(){
        const { handleSearch, state: { results } } = this

        return<div className='container'>
            <Search onSearch={ handleSearch }/>
            {results && <Results results = { results } />}
        </div> 
    }
}

export default Home