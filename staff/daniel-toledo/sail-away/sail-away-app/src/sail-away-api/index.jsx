'use strict'

import moment from 'moment'

const sailAwayApi = {

    url: `http://localhost:8000/api`,

    registerUser(name, surname, email, password, passwordConfirm, kind) {
        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm, kind })
        })
            .then(response => response.json())

            .then(({ id, error }) => {

                if (!error) return id

                else throw Error(error)
            })
    },

    authenticateUser(email, password) {
        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(user => {
                if (!user.error) return user

                else throw Error(user.error)
            })

    },

    retrieveUser(token){
        return fetch(`${this.url}/user/`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(user => {
                if (!user.error) return user

                else throw Error(user.error)
            })
    },

    updateUser(token, pictures, name, surname, gender, nationality, birthday, description, boats, talents, experience, languages){
        return fetch(`${this.url}/user/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ pictures, name, surname, gender, nationality, birthday, description, boats, talents, experience, languages })
        })
            .then(response => response.json())
            .then(user => {
                if (!user.error) return user

                else throw Error(user.error)
            })
    },

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

    listJourneys() {
        return fetch(`${this.url}/journeys/`)
            .then(journeys => journeys.json())
            .then(journeys => {
                if (!journeys.error) return journeys

                else throw Error(journeys.error)
            })
    },

    searchBySea(query) {
        return fetch(`${this.url}/search?query=${query}`)
            .then(journeys => journeys.json())
            .then(response => {
                if (!response.error) {
                    response.journey = response.journeys.map(journey => {

                        journey.dates = journey.dates.map(date => moment(date.substring(0, 10)))
                        return journey

                    })

                    return response.journeys
                }
                else throw Error(response.error)
            })
    },

    retrieveJourney(id) {
        return fetch(`${this.url}/journey/${id}`)
            .then(journey => journey.json())
            .then(response => {
                if (!response.error) {
                    response.journey.dates = response.journey.dates.map(date => moment(date.substring(0, 10)))
                    return response.journey
                }

                else throw Error(response.error)
            })
    },

    updateJourney(id, title, seaId, route, dates, description, userId, boat, talents, experience, sailingTitles, languages) {
        debugger
        return fetch(`${this.url}/journey/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, seaId, route, dates, description, userId, boat, talents, experience, sailingTitles, languages })
        })
            .then(journey => journey.json())
            .then(response => {
                if (!response.error) return response.journey

                else throw Error(response.error)
            })
    }
}

export default sailAwayApi