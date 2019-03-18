'use strict'
import dotenv from 'dotenv'
dotenv.config()

const { REACT_APP_GOOGLE_MAPS_API_URL, REACT_APP_GOOGLE_MAPS_API_KEY } = process.env


const geocodeApi = {



    retrievePoint(number, street, city, country) {


        if (typeof number !== 'string') throw TypeError(`${number} is not a string`)
        if (typeof street !== 'string') throw TypeError(`${street} is not a string`)
        if (typeof city !== 'string') throw TypeError(`${city} is not a string`)
        if (typeof country !== 'string') throw TypeError(`${country} is not a string`)



        return fetch(`https://cors-anywhere.herokuapp.com/${REACT_APP_GOOGLE_MAPS_API_URL}address=${number}+${street},+${city},+${country}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`, {
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                if (response.statusText !== 'OK'){

                    throw Error(response.statusText)

                }
                    
                    return response.json()
                

            }).then(response=>{
                response = response.results[0].geometry.location
                return response

            })
    },



}

export default geocodeApi