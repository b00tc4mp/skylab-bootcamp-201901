'use strict'

const ticketmasterApi  = {
    apiKey: 'iH8PnL5GTD8FOUAoT5fXDta2iEGW1pmI',
    url: 'https://app.ticketmaster.com/discovery/v2/',
    // startDate: '2019-06-01T14:00:00Z',
    // endDate: '2019-08-01T14:00:00Z',

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
            else throw Error ('there is no results for ' + query)
        })
        //.then(response => response)
        //.then(({_embedded: {events}}) => events)
        .catch(error => error) 
    },

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