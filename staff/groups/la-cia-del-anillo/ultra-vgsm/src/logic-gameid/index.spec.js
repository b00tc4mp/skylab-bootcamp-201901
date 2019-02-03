'use strict'

import ultraVGSMApi from '.'

const publicKey = 'ec70893446ed73812756c3fc599bb3da6c263807fb2500265d4b675a6855aab8'

beforeEach(() => {
    ultraVGSMApi.publicKey = publicKey
    ultraVGSMApi.url = 'https://skylabcoders.herokuapp.com/proxy?url=https://api.thegamesdb.net'
})

describe('ultra-vgsm api retrieve GAME DATA by GameID', () => {
    
    describe('sync fails', () => { 
        it('should throw error on number gameId', () => {
            const gameId = 23

            expect(typeof gameId).toBe('number')
            expect(() => ultraVGSMApi.retrieveGame(gameId)).toThrowError(`${gameId} is not a string`)
        })

        it('should throw error on array gameId', () => {
            const gameId = [1,2,3]

        expect(gameId.constructor).toBe(Array)
        expect(() => ultraVGSMApi.retrieveGame(gameId)).toThrowError(`${gameId} is not a string`)
        })

        it('should throw error on object gameId', () => {
            const gameId = { hello: 'world' }

            expect(gameId.constructor).toBe(Object)
            expect(() => ultraVGSMApi.retrieveGame(gameId)).toThrowError(`${gameId} is not a string`)   
        })

        it('should throw error on boolean gameId', () => {
            const gameId = false

            expect(typeof gameId).toBe('boolean')
            expect(() => ultraVGSMApi.retrieveGame(gameId)).toThrowError(`${gameId} is not a string`) 
        })

        it('should throw error on function gameId', () => {
            const gameId = () => console.log('hello')

            expect(typeof gameId).toBe('function')
            expect(() => ultraVGSMApi.retrieveGame(gameId)).toThrowError(`${gameId} is not a string`)
        })

        it('should throw error on empty gameId', () => {
            const gameId = ''

            expect(() => ultraVGSMApi.retrieveGame(gameId)).toThrowError('gameId is empty')
        })

        it('should throw error when gameId is not a string number (isNaN(Number(gameId)))', () => {
            const gameId = 'a'
    
            expect(() => ultraVGSMApi.retrieveGame(gameId)).toThrowError(`${gameId} should be a number`)
        })
    
        it('should throw error when gameId is <0', () => {
            const gameId = '0'
    
            expect(() => ultraVGSMApi.retrieveGame(gameId)).toThrowError(`${gameId} should be a bigger than 0 number`)
        })

        it('should throw error when gameId is a float number', () => {
            const gameId = '1.23'

            expect(() => ultraVGSMApi.retrieveGame(gameId)).toThrowError(`${gameId} should be an integer number`)
        })
    })

    describe('async fails', () => {
        it('should throw error when gameId doesn\'t exists on database', () => {
            const gameId = '9823749872394872983'

            return ultraVGSMApi.retrieveGame(gameId)
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).toBe(`${gameId} doesn't exist in database`))
        })
        it('should fail on server down', () => {
            const gameId = '1'
            ultraVGSMApi.url = 'https://skylabcoders.hulioapp.com/proxy?url=https://api.thegamesdb.net'

            return ultraVGSMApi.retrieveGame(gameId)
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).toBe(`Network request failed`))
        })
        it('should fail on non valid API key', () => {
            const gameId = '1'
            ultraVGSMApi.publicKey = 'HULIO'
            
            return ultraVGSMApi.retrieveGame(gameId)
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).toBe(`This route requires and API key and no API key was provided.`))
        })
    })

    describe('success situation', () => {
        it('should succeed on retrieve correct game info', () => {
            const gameId = '1'
            const gameTitle = 'Halo: Combat Evolved'
            
            return ultraVGSMApi.retrieveGame(gameId)
                .then(gameData => {
                    expect(gameData).toBeDefined()
                    expect(gameData.include.platform.data[`${gameId}`].name).toBe('PC')
                    expect(gameData.data.games[0].game_title).toBe(gameTitle)
            })
        })
    })

})


// --------------- RETRIEVE IMAGES ------------------

describe('ultra-vgsm api retrieve IMAGES by GameID', () => {
    
    describe('sync fails', () => { 
        it('should throw error on number gameId', () => {
            const gameId = 23

            expect(typeof gameId).toBe('number')
            expect(() => ultraVGSMApi.retrieveImages(gameId)).toThrowError(`${gameId} is not a string`)
        })

        it('should throw error on array gameId', () => {
            const gameId = [1,2,3]

        expect(gameId.constructor).toBe(Array)
        expect(() => ultraVGSMApi.retrieveImages(gameId)).toThrowError(`${gameId} is not a string`)
        })

        it('should throw error on object gameId', () => {
            const gameId = { hello: 'world' }

            expect(gameId.constructor).toBe(Object)
            expect(() => ultraVGSMApi.retrieveImages(gameId)).toThrowError(`${gameId} is not a string`)   
        })

        it('should throw error on boolean gameId', () => {
            const gameId = false

            expect(typeof gameId).toBe('boolean')
            expect(() => ultraVGSMApi.retrieveImages(gameId)).toThrowError(`${gameId} is not a string`) 
        })

        it('should throw error on function gameId', () => {
            const gameId = () => console.log('hello')

            expect(typeof gameId).toBe('function')
            expect(() => ultraVGSMApi.retrieveImages(gameId)).toThrowError(`${gameId} is not a string`)
        })

        it('should throw error on empty gameId', () => {
            const gameId = ''

            expect(() => ultraVGSMApi.retrieveImages(gameId)).toThrowError('gameId is empty')
        })

        it('should throw error when gameId is not a string number (isNaN(Number(gameId)))', () => {
            const gameId = 'a'
    
            expect(() => ultraVGSMApi.retrieveImages(gameId)).toThrowError(`${gameId} should be a number`)
        })
    
        it('should throw error when gameId is <0', () => {
            const gameId = '0'
    
            expect(() => ultraVGSMApi.retrieveImages(gameId)).toThrowError(`${gameId} should be a bigger than 0 number`)
        })

        it('should throw error when gameId is a float number', () => {
            const gameId = '1.23'

            expect(() => ultraVGSMApi.retrieveImages(gameId)).toThrowError(`${gameId} should be an integer number`)
        })
    })

    describe('async fails', () => {
        it('should throw error when gameId doesn\'t exists on database', () => {
            const gameId = '9823749872394872983'

            return ultraVGSMApi.retrieveImages(gameId)
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).toBe(`${gameId} doesn't exist in database`))
        })
        it('should fail on server down', () => {
            const gameId = '1'
            ultraVGSMApi.url = 'https://skylabcoders.hulioapp.com/proxy?url=https://api.thegamesdb.net'

            return ultraVGSMApi.retrieveImages(gameId)
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).toBe(`Network request failed`))
        })
        it('should fail on non valid API key', () => {
            const gameId = '1'
            ultraVGSMApi.publicKey = 'HULIO'
            
            return ultraVGSMApi.retrieveImages(gameId)
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).toBe(`This route requires and API key and no API key was provided.`))
        })
    })

    describe('success situation', () => {
        it('should succeed on retrieve correct game images', () => {
            const gameId = '1'
                        
            return ultraVGSMApi.retrieveImages(gameId)
                .then(imagesData => {
                    expect(imagesData).toBeDefined()
                    expect(imagesData.data.base_url.original).toBeDefined()
                    expect(imagesData.data.images[`${gameId}`][0].filename).toBeDefined()
                    expect(imagesData.data.images[`${gameId}`][0].resolution).toBe('1920x1080')
            })
        })
    })

})