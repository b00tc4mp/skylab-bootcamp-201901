'use strict'

require('dotenv').config()

const googleMapsApi = {
    url: 'https://maps.googleapis.com/maps/api/place',

    key: 'key=AIzaSyAUiu1mu4XTzZxHmRObd5LpB_7IBa6ysf0',

    fields: 'fields=photos,url,international_phone_number,opening_hours,website',

    type: 'type=restaurant',

    input: 'input=name',

    maxHeight: 'maxheight=480',

    maxWidth: 'maxwidth=640',

    lat: '41.3903691',

    lng: '2.188351',
    

    /**
     * 
     * @param {string} query 
     */
    searchRestaurants(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        const { url, key, type } = this

        if (query.includes('near me')) {

            return this.geolocation()
                .then(({lat, lng}) => {
                    this.lat = lat.toString()
                    this.lng = lng.toString()

                    return fetch(`${url}/textsearch/json?query=${query}&${type}&location=${lat},${lng}&radius=3000&${key}`, {
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(response => {
                            if (response.status !== 'OK') throw Error('unable to search at this moment')
            
                            return response.results
                        })
                })
        }

        else return fetch(`${url}/textsearch/json?query=${query}&${type}&${key}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
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

        return fetch(`${url}/details/json?placeid=${restaurantId}&${fields}&${key}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.status !== 'OK') throw Error('unable to fetch details at this moment')

                return response.result
            })
    },

    //NOT WORKING!!!!!!!

    /**
     * 
     * @param {string} photoReference 
     */
    resizePhoto(photoReference) {
        if (typeof photoReference !== 'string') throw TypeError(`${photoReference} is not a string`)

        if (!photoReference.trim().length) throw Error('photoReference is empty')

        const { url, key, maxHeight, maxWidth } = this

        return fetch(`${url}/photo?${maxWidth}&${maxHeight}&photoreference=${photoReference}&${key}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (response.statusText !== 'OK') throw Error('unable to fetch details at this moment')

                return response.url
            })
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

    geolocation() {
        const { key } = this

        return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?${key}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
                .then(response => {
                    if (response.error) throw Error('unable to fetch details at this moment')

                    return response.location
                })
    }
}

module.exports = googleMapsApi