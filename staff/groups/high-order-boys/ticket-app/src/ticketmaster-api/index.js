'use strict'


const ticketmasterApi  = {
    url: 'https://app.ticketmaster.com/discovery/v2/',

    /**
     * 
     * searchEvents
     * 
     * Search events passing a city name and a optional dates from start and end params
     * 
     * @param {string} query 
     * @param {string} startDate 
     * @param {string} endDate
     * 
     * @returns {Promise} - with all events that satisfies the params 
     */

    searchEvents(query, startDate = null, endDate = null){
        if(typeof query !== 'string') throw TypeError (`${query} introduced is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)


        const queryStart = startDate ? `&startDateTime=${startDate}T14:00:00Z`:''
        const queryEnd = endDate ? `&endDateTime=${endDate}T14:00:00Z`: ''

        return fetch(`${this.url}events.json?apikey=${this.apiKey}&city=${query}${queryStart}${queryEnd}`, {
            method: 'GET'
        })

        .then(response => response.json())
        .then(response => {
            if(response._embedded) return response._embedded.events
            return null
        })
        //.then(response => response)
        //.then(({_embedded: {events}}) => events)
        .catch(error => error) 
    },


    /**
     * SearchEvent
     * 
     * Search for especific event using an Id and return it 
     * 
     * @param {string} id 
     * 
     * @returns {Promise} - returns a promise that conteins an event
     */

    searchEvent(id) {
        if(typeof id !== 'string') throw TypeError(`-->${id}<-- id introduced is not a string`)
        if(!id.trim().length) throw Error('id is empty')

        return fetch(`${this.url}events/${id}?apikey=${this.apiKey}`, {
            method: 'GET'
        })

        .then(response => response.json())
        .then(event => event)
        .catch(error => error)
    }
}

export default ticketmasterApi