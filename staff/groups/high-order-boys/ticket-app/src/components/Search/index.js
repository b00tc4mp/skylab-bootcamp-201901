'use strict'

import React, { Component } from 'react'


class Search extends Component {
    state = { city: '', startDate: '', endDate: '' }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { city, startDate, endDate }, props: { onSearch } } = this
        onSearch(city, startDate, endDate)
    }

    render() {
        const { handleFormSubmit, handleInput, state: {city} } = this

        return <section>
            <h2>Search</h2>
            <form onSubmit={ handleFormSubmit }>
                <label>City</label>
                <input type="text" name="city" placeholder="City" onChange={ handleInput } value={city} required />
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