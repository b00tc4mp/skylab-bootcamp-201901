'use strict'

/**
 * 
 * Ultra-VGSM API client.
 * 
 * @version 0.0.1
 * 
 */

const ultraVGSMApi = {

    publicKey: 'no-public-key',
    url: 'https://skylabcoders.herokuapp.com/proxy?url=https://api.thegamesdb.net',

    retrieveGame(gameId) {
        if (typeof gameId !== 'string') throw TypeError(`${gameId} is not a string`)

        if (!gameId.trim().length) throw Error('gameId is empty')
        
        if (isNaN(Number(gameId))) throw Error(`${gameId} should be a number`)
        
        if (Number(gameId)<1) throw Error(`${gameId} should be a bigger than 0 number`)

        if (Number(gameId)%1!==0) throw Error(`${gameId} should be an integer number`)

        return fetch(`${this.url}/Games/ByGameID?apikey=${this.publicKey}&id=${gameId}&fields=overview%2Cyoutube&include=boxart%2Cplatform`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                const status = response.status
                if (status) {
                    if (status === 'Success') {
                        const count = response.data.count
                        if (count !== 0) {
                            const { code,
                                status,
                                data: { games }, 
                                include: { boxart }
                                } = response
                            return response
                        }
                        if (count === 0) throw Error(`${gameId} doesn't exist in database`)
                    }
                    else {
                        throw Error(status)
                    }
                }
                throw Error(response.error)
            })
    },

    retrieveImages(gameId) {
        if (typeof gameId !== 'string') throw TypeError(`${gameId} is not a string`)

        if (!gameId.trim().length) throw Error('gameId is empty')
        
        if (isNaN(Number(gameId))) throw Error(`${gameId} should be a number`)
        
        if (Number(gameId)<1) throw Error(`${gameId} should be a bigger than 0 number`)

        if (Number(gameId)%1!==0) throw Error(`${gameId} should be an integer number`)

        return fetch(`${this.url}/Games/Images?apikey=${this.publicKey}&games_id=${gameId}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                const status = response.status
                if (status) {
                    if (status === 'Success') {
                        const count = response.data.count
                        if (count !== 0) {
                            const { code,
                                status,
                                data: { base_url,
                                        images }
                            } = response
                            return response
                        }
                        if (count === 0) throw Error(`${gameId} doesn't exist in database`)
                    }
                    else {
                        throw Error(status)
                    }
                }
                throw Error(response.error)
            })

    }
}


export default ultraVGSMApi