import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Search from '../Search'
import logic from '../../logic'
import Results from '../Results'

class Home extends Component {
    state = { videos: null }

    handleSearch = query => {
        console.log('Desde la HOME', query)
        logic.searchVideos(query)
        .then(results => {
            console.log(results)
            this.setState({ videos: results })
        })
    }

    render() {
        const { handleSearch , state : { videos }} = this
        const compVideos = () => <Results results={videos}/>
        const compSearch = () => <Search onSearch={handleSearch} />
        return (
            <section className="home">
                   
                    <Route path='/search/:query' render={compSearch} /> 
                    <Route path='/video/:id' render={compVideos} />  
                    
                    <Route path='/*' render={compVideos} />
                  
            </section >
        )
    }
}
export default Home