'use stric'

const tutuboApi = {

    url : 'https://www.googleapis.com/youtube/v3/',
    key : 'key=AIzaSyAuXWh-zdhVotLyZHfzFnuBUUPOpj0nC8Q',
    part: 'part=snippet',
    videoType : 'type=video',
    maxResults : 'maxResults=20',
    chart: 'chart=mostPopular',

    search(query){

        const {url, part, videoType, key, maxResults} = this

        return fetch(`${url}search?q=${query}&${part}&${videoType}&${maxResults}&${key} `, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                const {items} = response

                if(items.length)return items
                
                throw Error('no results')
            })
    },

    mostPopular(){

        const {url, part, key, maxResults, chart} = this

        return fetch(`${url}videos?${part}&${key}&${chart}&${maxResults} `, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                const {items} = response
                return items
            })
    }
    
}