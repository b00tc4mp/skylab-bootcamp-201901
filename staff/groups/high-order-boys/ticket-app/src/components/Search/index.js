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

        return <section className="search">
            <div className="block searchPanel">
                <div className="columns is-centered has-text-centered">
                    <div className="column">
                        <form className="columns is-centered" onSubmit={ handleFormSubmit }>
                            <div className="control column is-3">
                                <input className="input" type="text" name="city" placeholder="City" onChange={ handleInput } value={city} required />
                            </div>    
                            <div className="control column is-3">
                                <input className="input dateInputHack" type="date" name="startDate" placeholder="Start Date" onChange={ handleInput } />
                            </div>
                            <div className="control column is-3">
                                <input className="input dateInputHack1" type="date" name="endDate" placeholder="End Date" onChange={ handleInput } />
                            </div>
                            <div className="column is-3">    
                                <button className="button is-fullwidth is-warning is-outlined">Submit</button>
                            </div>    
                        </form>
                    </div>
                </div>
            </div>    
        </section>
    }
}

export default Search 