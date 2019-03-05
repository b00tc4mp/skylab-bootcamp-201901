'use strict'

/**
 * Google maps API client.
 * 
 * @version 0.0.1
 */
const mapsApi = {
    url: 'https://api.spotify.com/v1',

    async generateMap() {
        await fetch(`https://maps.googleapis.com/maps/api/js?key=AIzaSyAFDTq_HRLGd3dWHf2NLtw8Jv-05efTy7s&callback=initMap`)

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
            })

        }
    }
}
module.exports = spotifyApi