'use strict'

const sailAwayApi = {

    url: `http://localhost:8000/api`,

    createJourney(route, dates, description) {
        return fetch(`${this.url}/journey/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ route, dates, description })
        })
            .then(response => response.json())
            .then(journey => {
                if (!journey.error) return journey

                else throw Error(journey.error)
            })

    }
}

export default sailAwayApi