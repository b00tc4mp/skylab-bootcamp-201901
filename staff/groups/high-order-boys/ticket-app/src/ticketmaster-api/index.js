'use strict'

const ticketmasterApi  = {
    apiKey: 'iH8PnL5GTD8FOUAoT5fXDta2iEGW1pmI',
    url: 'https://app.ticketmaster.com/discovery/v2/',

    searchEvents(query){
        return fetch(`${this.url}events.json?apikey=${this.apiKey}&city=${query}`, {
            method: 'GET'
        })

        .then(response => response.json())
        //.then(response => response)
        .then(({_embedded: {events}}) => events)
    }
}

export default ticketmasterApi