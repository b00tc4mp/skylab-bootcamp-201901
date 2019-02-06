'use strict'
import React, {Component, Fragment} from 'react'
import Results from '../Results'
import Feedback from '../Feedback'
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
            .then(data => {
                if(data) this.setState({events:data, feedback: null})
                else this.setState({events: null, feedback: `no results for ${city}`})
            })
        } catch(err) {
            console.log(err)
        }
    }

    render(){

        const {state:{events, feedback}, props: {onEventDetail} } = this

        return <Fragment>
            {events &&  < Results results = {events} onEventDetail={onEventDetail} />}
            {feedback && < Feedback message={feedback} />}
        </Fragment>
    }

}

export default EventResults