import logic from './homeLogic'
import userApi from '../data/user-api'
import { ValueError, RequirementError, LogicError } from '../common/errors';

describe('Home Logic', () => {
    let __city__ = 'Barcelona'

    describe('retrieve weather by city', () => {
        it('should succeed on correct data', () =>
            logic.retrieveWeather(__city__)
            .then(response => {
                expect(response).toBeDefined()
                const [city, weather, icon] = response
                expect(weather).toBeDefined
                expect(typeof weather).toBe('string')
                expect(icon).toBeDefined
                expect(typeof icon).toBe('string')
                expect(city).toBeDefined
                expect(city).toBe(__city__)
            })
        )

        it('should fail on unexisting city', () =>{
            logic.retrieveWeather('abcde')
            .then(() => {})
            .catch(error => {
                expect(error).toBeDefined()
                expect(error instanceof ValueError).toBeTruthy()
                expect(error.message).toBe('city not found')
            })
        })

        it('should fail on undefined city', () => {
            __city__ = undefined
            expect(() => logic.retrieveWeather(__city__)).toThrowError(RequirementError, `city is not optional`)
        })

        it('should fail on null city', () => {
            __city__ = null
            expect(() => logic.retrieveWeather(__city__)).toThrowError(RequirementError, `city is not optional`)
        })

        it('should fail on empty city', () => {
            __city__ = ''
            expect(() => logic.retrieveWeather(__city__)).toThrowError(ValueError, `city is empty`)
        })

        it('should fail on blank city', () => {
            __city__ = ' \t    \n'

            expect(() => logic.retrieveWeather(__city__)).toThrowError(ValueError, 'city is empty')
        })
    })

    describe('search music',() =>{
        const query='Pop'
        it('should succeed on correct data', () =>
            logic.searchMusic(query)
                .then(results =>{
                    expect(results).toBeDefined()
                    expect(results.length).toBe(20)
                    results.forEach(e =>{
                        const{trackName, previewUrl, artWork} = e
                        expect(trackName).toBeDefined
                        expect(typeof trackName).toBe('string')
                        expect(previewUrl).toBeDefined
                        expect(typeof previewUrl).toBe('string')
                        expect(artWork).toBeDefined
                        expect(typeof artWork).toBe('string')
                    })
                })
        )
        it('should return an empty array in case of inexistent query', () => 
            logic.searchMusic('alternativeaold')
                .then(() =>{})
                .catch(error =>{
                    expect(error).toBeDefined()
                    expect(error instanceof Error).toBeTruthy()
                    expect(error.message).toBe('no results found')
                })
        )

        it('should fail on undefined query', () => {
            const query = undefined
            expect(() => logic.searchMusic(query)).toThrowError(RequirementError, `query is not optional`)
        })
        it('should fail on null query', () => {
            const query = null
            expect(() => logic.searchMusic(query)).toThrowError(RequirementError, `query is not optional`)
        })
        it('should fail on empty query', () => {
            const query = ''
            expect(() => logic.searchMusic(query)).toThrowError(ValueError, `query is empty`)
        })
        it('should fail on blank query', () => {
            const query = ' \t    \n'

            expect(() => logic.searchMusic(query)).toThrowError(ValueError, 'query is empty')
        })
    })

    describe('retrieve user preferences', () =>{
        const name = 'uName'
        const surname = 'uSurname'
        let email
        const password = 'password'
        let city = 'Barcelona'
        let app = 'wetunes'
        let preferences = {Thunderstorm: 'Metal', Drizzle: 'Pop', Rain: 'Jazz', Snow: 'Christmas', Clear: 'Urbano Latino', Clouds: 'Rock', Default: 'Tango'}
        let _id = null
        let _token = null

        beforeEach(() => {
            email = `usermail-${Math.random()}@mail.com`

            // logic.__userId__ = null
            // logic.__userToken__ = null

            return userApi.create(email, password, { name, surname,  preferences, city, app})
                    .then((response) =>{
                        _id = response.data.id
                        return userApi.authenticate(email, password)
                    })
                    .then((response) => {
                        const { data:{ id, token} } = response
                        _id = id
                        _token = token
                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
        })

        it('should succed retrieving user preferences', () => {
            logic.retrieveUserPreferences()
                .then( response => {
                    expect(response).toBeDefined()
                    expect(response instanceof Object).toBeTruthy()
                    expect(response).toEqual(preferences)
                })
        })

        it('should fail on incorrect id', () => {
            logic.__userId__ = 'abcde'

            return logic.retrieveUserPreferences()
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof LogicError).toBeTruthy()
                    expect(error.message).toBe(`token id \"${_id}\" does not match user \"${logic.__userId__}\"`)
                })
        })

        it('should fail on incorrect id', () => {
            logic.__userToken__ = 'abcde'

            return logic.retrieveUserPreferences()
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof LogicError).toBeTruthy()

                    expect(error.message).toBe(`invalid token`)
                })
        })

    })
})