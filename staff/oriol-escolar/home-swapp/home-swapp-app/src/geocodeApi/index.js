'use strict'
import dotenv from 'dotenv'
dotenv.config()

const { GOOGLE_MAPS_API_URL, GOOGLE_MAPS_API_KEY } = process.env
debugger

const geocodeApi = {



    retrievePoint(number, street, city, country) {

        return fetch(`${GOOGLE_MAPS_API_URL}address=${number}+${street},+${city},+${country}&key=${GOOGLE_MAPS_API_KEY}`, {
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