import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import Search from '../Search'
import User from '../User'
import EventResults from '../EventResults'



class Home extends Component {
    state = {startDate: null, endDate:null}

    handleSearch = (query, startDate, endDate) => {
        this.setState({startDate: startDate, endDate: endDate})
        this.props.history.push(`/home/search/${query}`)
    }

    render(){
        const { location: { pathname } } = this.props
        const isUser = (pathname.includes("home/user"))
        const { handleSearch, state: { startDate,endDate } } = this
        return<div className='container'>
            {!isUser && <Search onSearch={handleSearch} />}
            < Route path='/home/user' component={User} />
            <Route path="/home/search/:query" render={props => <EventResults query={props.match.params.query} startDate={startDate} endDate={endDate} />} />
        </div> 
    }
}

export default withRouter(Home)