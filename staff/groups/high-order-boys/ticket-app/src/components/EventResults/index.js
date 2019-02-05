'use strict'
import React, {Component} from 'react'
import Results from '../Results'
import logic from '../../logic'


class EventResults extends Component{

    state = {events: null, feedback: null}

    componentDidMount() {
        const { props: { query } } = this

        this.handleSearch(query)
    }

    componentWillReceiveProps(props) {           
        const { query } = props

        this.handleSearch(query)
    }

    handleSearch = (city) => {
        const {props: {startDate, endDate}} = this
        
        try {
            logic.retrieveEvents(city, startDate, endDate)
            .then(data => this.setState({events: data}))
            .catch(err => console.log('errors from eventResult',err))
        } catch(err) {
            console.log(err.message)
        }
    }

    render(){

        const {state:{events} } = this

        return < Results results = {events} />
    }

}

export default EventResults