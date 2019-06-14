'use strict'

import moment from 'moment'

const sailAwayApi = {

    url: `https://afternoon-falls-79254.herokuapp.com/api`,
    // url: 'http://localhost:8000/api',

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

    retrieveUserLogged(token){
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

    retrieveUser(id){
        return fetch(`${this.url}/user/${id}`)
            .then(response => response.json())
            .then(user => {
                if (!user.error) return user

                else throw Error(user.error)
            })
    },

    searchUser(talents, languages){
        return fetch(`${this.url}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ talents, languages })
        })
        .then(response => response.json())
        .then(users => {
            
            if (!users.error) return users

            else throw Error(users.error)
        })
    },

    updateUser(token,  name, surname, gender, nationality, birthday, description, boats, talents, experience, languages){
        return fetch(`${this.url}/user/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({  name, surname, gender, nationality, birthday, description, boats, talents, experience, languages })
        })
            .then(response => response.json())
            .then(user => {
                if (!user.error) return user

                else throw Error(user.error)
            })
    },

    updateBoat(token, boat){
        return fetch(`${this.url}/update-boat/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({boat})
        })
            .then(response => response.json())
            .then(boat => {
                
                if (!boat.error) return boat

                else throw Error(boat.error)
            })
    },

    updatePicture(token, picture){
        
        let formData = new FormData()
        formData.append('image', picture)

        return fetch(`${this.url}/update-picture/`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData
        })
        .then(response => response.json())
        .then(user => {
            
            if (!user.error) return user

            else throw Error(user.error)
        })

    },

    updateBoatPicture(token, picture, boatId){
        
        let formData = new FormData()
        formData.append('image', picture)

        return fetch(`${this.url}/update-picture/${boatId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData
        })
        .then(response => response.json())
        .then(boat => {
            
            if (!boat.error) return boat

            else throw Error(boat.error)
        })

    },


    createJourney(title, seaId, route, dates, description, userId, boat, lookingFor) {
        
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
                    
                    response.journey.dates = (response.journey.dates || []).map(date => moment(date))
                    return response.journey
                }

                else throw Error(response.error)
            })
    },

    retrieveJourneysByUserId(token){
        return fetch(`${this.url}/my-journeys/`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
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

    updateJourney(id, title, seaId, route, dates, description, userId, boat, lookingFor) {
        return fetch(`${this.url}/journey/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, seaId, route, dates, description, userId, boat, lookingFor })
        })
            .then(journey => journey.json())
            .then(response => {
                if (!response.error) return response.journey

                else throw Error(response.error)
            })
    },

    toggleJourneyFavorite(token, journeyId){
        return fetch(`${this.url}/favorite-journey/${journeyId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(journey => journey.json())
            .then(user => {
                if (!user.error) return user

                else throw Error(user.error)
            })
    },

    toggleCrewFavorite(token, crewId){
        
        return fetch(`${this.url}/favorite-crew/${crewId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(journey => journey.json())
            .then(user => {
                
                if (!user.error) return user
    
                else throw Error(user.error)
            })
    
    }
}

export default sailAwayApi