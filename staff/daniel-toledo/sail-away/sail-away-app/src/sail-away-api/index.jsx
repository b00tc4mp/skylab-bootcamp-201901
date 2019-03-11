'use strict'

const sailAwayApi = {

    url: `http://localhost:8000/api`,

    createJourney(title, seaId, route, dates, description, userId, boat, lookingFor) {
        debugger
        return fetch(`${this.url}/journey/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, seaId, route, dates, description, userId, boat, lookingFor })
        })
            .then(response => response.json())
            .then(journey => {
                if (!journey.error) return journey

                else throw Error(journey.error)
            })

    },

    listJourneys(){
        return fetch(`${this.url}/journeys/`)
            .then(journeys => journeys.json())
            .then(journeys => {
                if (!journeys.error) return journeys

                else throw Error(journeys.error)
            })
    },

    searchBySea(query){
        return fetch(`${this.url}/search?query=${query}`)
        .then(journeys => journeys.json())
        .then(response => {
            if (!response.error) return response.journeys

            else throw Error(response.error)
        })
    },

    retrieveJourney(id){
        return fetch(`${this.url}/journey/${id}`)
        .then(journey => journey.json())
        .then(response => {
            if (!response.error) return response.journey

            else throw Error(response.error)
        })
    },

    updateJourney(id, sea, route, dates, description){
        debugger
        return fetch(`${this.url}/journey/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sea, route, dates, description })
        })
        .then(journey => journey.json())
        .then(response => {
            if (!response.error) return response.journey

            else throw Error(response.error)
        })
    }
}

export default sailAwayApi