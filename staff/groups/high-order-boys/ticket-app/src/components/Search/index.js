'use strict'

import React, { Component } from 'react'
import logic from '../../logic';

class Search extends Component {
    state = { city: '', startDate: '', endDate: '' }

    handleSearch = (city, startDate, endDate) => {
        try {
            logic.retrieveEvents(city, startDate, endDate)
            .then(data => console.log(data))
        } catch(err) {
            console.log(err.message)
        }
    }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { city, startDate, endDate }, handleSearch } = this

        handleSearch(city, startDate, endDate)
    }

    render() {
        const { handleFormSubmit, handleInput } = this

        return <section>
            <h2>Search</h2>
            <form onSubmit={ handleFormSubmit }>
                <label>City</label>
                <input type="text" name="city" placeholder="City" onChange={ handleInput } required />
                <label>Start Date</label>
                <input type="date" name="startDate" placeholder="Start Date" onChange={ handleInput } />
                <label>End Date</label>
                <input type="date" name="endDate" placeholder="End Date" onChange={ handleInput } />
                <button>Submit</button>
            </form>
        </section>
    }
}

export default Search 