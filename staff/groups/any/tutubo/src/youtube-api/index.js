'use stric'

const youtubeApi = {

    url : 'https://www.googleapis.com/youtube/v3/',
    key : 'key=AIzaSyAuXWh-zdhVotLyZHfzFnuBUUPOpj0nC8Q',
    part: 'part=snippet',
    videoType : 'type=video',
    maxResults : 'maxResults=20',
    chart: 'chart=mostPopular',

    /**
     * 
     * @param {string} query 
     * 
     * Searches the youtube api for videos, channels and other related results to the query.
     */
    
    search(query){

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

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
    },

    watchVideo(id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.length) throw Error('failed to load')

        const {url, part, key} = this
        
        return fetch(`${url}videos?id=${id}&${part}&${key}`, {
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

export default youtubeApi