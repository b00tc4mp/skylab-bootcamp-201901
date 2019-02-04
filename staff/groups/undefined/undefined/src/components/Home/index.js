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
            this.setState({ videos: results })
        })
    }

    render() {
        const { handleSearch , state : { videos }} = this
        const compVideos = () => <Results results={videos}/>
        return (
            <section className="home">
                <Search onSearch={handleSearch} />
                <Switch>
                    <Route exact path='/' render={compVideos} />
                    
                    <Route path='/video/:id' render={compVideos} />     
                </Switch>  
            </section >
        )
    }
}
export default Home