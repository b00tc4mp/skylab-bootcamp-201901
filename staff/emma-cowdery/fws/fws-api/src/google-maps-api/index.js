'use strict'

require('dotenv').config()

const googleMapsApi = {
    url: 'https://maps.googleapis.com/maps/api/place',

    key: 'key=AIzaSyAUiu1mu4XTzZxHmRObd5LpB_7IBa6ysf0',

    fields: 'fields=formatted_adress,photos,url,international_phone_number,opening_hours,website,price_level,rating',

    type: 'type=restaurant',

    input: 'input=name',

    /**
     * 
     * @param {string} query 
     */
    searchRestaurants(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        const { url, key, type } = this

        console.log(key)

        return fetch(`${url}/textsearch/json?query=${query}&${type}&${key}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                console.log(response.results)

                if (response.status !== 'OK') throw Error('unable to search at this moment')

                return response.results
            })
    },

    /**
     * 
     * @param {string} restaurantId 
     */
    restaurantDetails(restaurantId) {
        if (typeof restaurantId !== 'string') throw TypeError(`${restaurantId} is not a string`)

        if (!restaurantId.trim().length) throw Error('restaurantId is empty')

        const { url, key, fields } = this

        return (async () => {
            const response = await fetch(`${url}/details/json?placeId=${restaurantId}&${fields}&${key}`)

            if (response.status !== 'OK') throw Error('unable to show restaurant details at this moment')

            return response.results
        })()
    },

    //     /**
    //  * 
    //  * @param {string} query 
    //  */
    // searchRestaurants(query) {
    //     if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

    //     if (!query.trim().length) throw Error('query is empty')

    //     const { url, key, type } = this

    //     console.log(key)

    //     return fetch(`${url}/findplacefromtext/json?input=${query}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&${type}&${key}`, {
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log(response)
    //             console.log(response.results)

    //             if (response.status !== 'OK') throw Error('unable to search at this moment')

    //             return response.results
    //         })
    // },
}

module.exports = googleMapsApi