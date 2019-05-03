import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'

describe('logic', ()=>{
    describe('users', ()=>{
        const name = 'weather'
        const surname = 'itumes'
        let email
        const password = '123'
        const city = 'barcelona'
        const app='wtunes'
        beforeEach(() => {
            email = `weather-${Math.random()}@gmail.com`
            logic.__userId__ = null
            logic.__userToken__ = null
        })
        describe('register user', ()=>{

            it('should succeed on correct user data', () =>
                logic.registerUser(name, surname, email, password , city)
                    .then(response => expect(response).toBeUndefined())
            )
            it('should fail on retrying to register', ()=>{
                logic.registerUser(name, surname, email, password , city)
                    .then(response => expect(response).toBeUndefined())
                    .then (()=>logic.registerUser(name, surname, email, password , city))
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`user with username \"${email}\" already exists`)
                    })
            })
            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, city)).toThrowError(Error, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'password is empty')
            })
            it('should fail on undefined city', () => {
                const city = undefined

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `city is not optional`)
            })

            it('should fail on null city', () => {
                const city = null

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(RequirementError, `city is not optional`)
            })

            it('should fail on empty city', () => {
                const city = ''

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'city is empty')
            })

            it('should fail on blank city', () => {
                const city = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password , city)).toThrowError(ValueError, 'city is empty')
            })

        })
        describe('login user', () => {
            let id

            beforeEach(() =>
                userApi.create(email, password, { name, surname, city})
                    .then(response => id = response.data.id)
            )

            it('should succeed on correct user credential', () =>{
                return logic.loginUser(email, password)
                    .then(() => {
                        const { __userId__, __userToken__ } = logic

                        expect(typeof __userId__).toBe('string')
                        expect(__userId__.length).toBeGreaterThan(0)
                        expect(__userId__).toBe(id)

                        expect(typeof __userToken__).toBe('string')
                        expect(__userToken__.length).toBeGreaterThan(0)

                        expect(logic.isUserLoggedIn).toBeTruthy()
                    })
                })

            it('should fail on non-existing user', () =>{
                const email= 'unexisting-user@mail.com'
                logic.loginUser(email, password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {

                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`user with username \"unexisting-user@mail.com\" does not exist`)
                    })
            })
            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.loginUser(email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.loginUser(email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.loginUser(email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.loginUser(email, password)).toThrowError(ValueError, 'email is empty')
            })
            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.loginUser(email, password)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.loginUser(email, password)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.loginUser(email, password)).toThrowError(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.loginUser(email, password)).toThrowError(ValueError, 'password is empty')
            })
        })
        describe('update user preferences', ()=>{
            let id, token

            beforeEach(() => {
                
                let preferences=[{Snow:'Classical'}, {Rain :'Rock'} ]

                return userApi.create(email, password, { name, surname, preferences, city, app })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
            })
            it('should succeed on correct preferences', ()=>{

                let preferences=[{Rain:'Jazz'}, {Snow:'Tropical'}, {Clouds:'Classical'}]
                
                return logic.updateUserPreferences(preferences)
                .then(response => expect(response).toBeUndefined())
                .then(()=> userApi.retrieve(id,token))
                .then(response=>{
                    const {preferences : _preferences}=response.data
                    expect(_preferences).toBeDefined()
                    expect(_preferences.length).toBe(preferences.length)
                    
                        expect(_preferences).toEqual(preferences)
                    })
            })
            it('should fail on undefined preferences', () => {
                const preferences = undefined

                expect(() => logic.updateUserPreferences(preferences)).toThrowError(RequirementError, `preferences is not optional`)
            })
            it('should fail on null preferences', () => {
                const preferences = null

                expect(() => logic.updateUserPreferences(preferences)).toThrowError(RequirementError, `preferences is not optional`)
            })

            it('should fail on empty preferences', () => {
                const preferences = ''

                expect(() => logic.updateUserPreferences(preferences)).toThrowError(TypeError, 'preferences is empty')
            })

            it('should fail on blank preferences', () => {
                const preferences = ' \t    \n'

                expect(() => logic.updateUserPreferences(preferences)).toThrowError(TypeError, 'preferences is empty')
            })
    
        })
        describe('update user city', ()=>{
            let id, token

            beforeEach(() => {
                
                let preferences=[{Snow:'Classical'}, {Rain :'Rock'} ]

                return userApi.create(email, password, { name, surname, preferences, city, app })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
            })
            it('should succeed on correct data', ()=>{
                const city ='London'
                return logic.updateUserCity(city)
                .then(response => expect(response).toBeUndefined())
                .then(()=> userApi.retrieve(id,token))
                .then(response=>{
                    const { city : _city }=response.data
                    expect(_city).toBeDefined()
                    expect(city).toBe(_city)
                })

            })
            it('should fail on undefined city', () => {
                const city = undefined

                expect(() => logic.updateUserCity(city)).toThrowError(RequirementError, `city is not optional`)
            })
            it('should fail on null city', () => {
                const city = null

                expect(() => logic.updateUserCity(city)).toThrowError(RequirementError, `city is not optional`)
            })

            it('should fail on empty city', () => {
                const city = ''

                expect(() => logic.updateUserCity(city)).toThrowError(Error, 'city is empty')
            })

            it('should fail on blank city', () => {
                const city = ' \t    \n'

                expect(() => logic.updateUserCity(city)).toThrowError(Error, 'city is empty')
            })
            
        })

        describe('retrieve user preferences', () =>{
            let preferences = {Thunderstorm: 'Metal', Drizzle: 'Pop', Rain: 'Jazz', Snow: 'Christmas', Clear: 'Urbano Latino', Clouds: 'Rock', Default: 'Tango'}
            let _id = null

            beforeEach(() => {
                email = `usermail-${Math.random()}@mail.com`

                return userApi.create(email, password, { name, surname,  preferences, city, app})
                        .then((response) =>{
                            _id = response.data.id
                            return userApi.authenticate(email, password)
                        })
                        .then((response) => {
                            const { data:{ id, token} } = response
                            _id = id
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
        describe('retrieve user', () => {
            let id, token

            beforeEach(() =>
                userApi.create(email, password, { name, surname })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
            )

            it('should succeed on correct user id and token', () =>
                logic.retrieveUser()
                    .then(user => {
                        expect(user.id).toBeUndefined()
                        expect(user.name).toBe(name)
                        expect(user.surname).toBe(surname)
                        expect(user.email).toBe(email)
                        expect(user.password).toBeUndefined()
                    })
            )

            it('should fail on incorrect user id', () => {
                logic.__userId__ = '5cb9998f2e59ee0009eac02c'

                return logic.retrieveUser()
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`token id \"${id}\" does not match user \"${logic.__userId__}\"`)
                    })
            })
        })
    })

    describe('Logic Api', () => {
        let __city__ = 'Barcelona'

        describe('retrieve weather by city', () => {
            it('should succeed on correct data', () =>
                logic.retrieveWeather(__city__)
                .then(response => {
                    expect(response).toBeDefined()
                    expect(typeof response).toBe('string')
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
        describe('serach music by prefereces', ()=>{
            const preferences=[{Rain:'Jazz'}, {Snow:'Tropical'}, {Clouds:'Classical'}]
            const weather='Rain'
            it('should succeed on correct data', ()=>{
                logic.searchMusicPreferences(preferences , weather)
                    .then(response =>{
                            expect(response).toBeDefined()
                            expect(response.length).toBe(20)
                    })
            })
        
        it('should fail on undefined weather', () => {
            const weather = undefined
            expect(() => logic.searchMusicPreferences(preferences , weather)).toThrowError(Error, `weather is not optional`)
        })
        it('should fail on null weather', () => {
            const weather = null
            expect(() => logic.searchMusicPreferences(preferences , weather)).toThrowError(Error, `weather is not optional`)
        })
        it('should fail on empty weather', () => {
            const weather = ''
            expect(() => logic.searchMusicPreferences(preferences , weather)).toThrowError(Error, `weather is empty`)
        })
        it('should fail on blank query', () => {
            const weather = ' \t    \n'
            expect(() => logic.searchMusicPreferences(preferences , weather)).toThrowError(Error, 'weather is empty')
        })
        it('should fail on undefined preferences', () => {
            const preferences = undefined
            expect(() => logic.searchMusicPreferences(preferences , weather)).toThrowError(Error, `preferences is not optional`)
        })
        it('should fail on null preferences', () => {
            const preferences = null
            expect(() => logic.searchMusicPreferences(preferences , weather)).toThrowError(Error, `preferences is not optional`)
        })
        it('should fail on empty preferences', () => {
            const preferences = ''
            expect(() => logic.searchMusicPreferences(preferences , weather)).toThrowError(TypeError, `preferences is empty`)
        })
        it('should fail on blank preferences', () => {
            const preferences = ' \t    \n'
            expect(() => logic.searchMusicPreferences(preferences , weather)).toThrowError(TypeError, 'preferences is empty')
        })
    })
    })
})