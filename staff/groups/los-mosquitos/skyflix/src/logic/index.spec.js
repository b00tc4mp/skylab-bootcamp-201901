import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'
import movieApi from '../data/movie-api';

describe('logic', () => {
    const fullname = 'Peter Parker'
    const subscription = '9.95'
    const app = 'skyflix'
    // const genres = ''
    let email
    const password = '123'
    
    beforeEach(() => {
        email = `peterparker-${Math.random()}@gmail.com`
        
        logic.__userId__ = null
        logic.__userToken__ = null
    })
    
    describe('users', () => {
        describe('login user', () => {
            let id

            beforeEach(() => {
                return userApi.create(email, password, { fullname, subscription, app })
                    .then(response => {
                        id = response.data.id
                    })
            })

            it('should succed on correct data', () => { 
                return logic.loginUser(email, password)
                    .then(() => {
                        const { __userId__, __userToken__ } = logic

                        expect(typeof __userId__).toBe('string')
                        expect(__userId__).toBe(id)
                        expect(__userId__.length).toBeGreaterThan(0)

                        expect(typeof __userToken__).toBe('string')
                        expect(__userToken__.length).toBeGreaterThan(0)

                        const [, payloadB64,] = __userToken__.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)

                        expect(payload.id).toBe(id)

                        expect(logic.isUserLoggedIn).toBeTruthy()

                    })
            })

            it('should fail on non-existing user', () => {
                let fakeEmail = 'nonexisting@email.com'
                return logic.loginUser(fakeEmail, password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe(`user with username \"${fakeEmail}\" does not exist`)
                    })
            })

        })

        describe('retrieve user', () => {
            let id, token
            
            beforeEach(() => {
                return userApi.create(email, password, { fullname, subscription, app })
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

            it('should succed on correct user id and token', () => {
                return logic.retrieveUser()
                    .then(user => {
                        expect(user).toBeDefined()
                        expect(user.fullname).toBe(fullname)
                        expect(user.email).toBe(email)
                        expect(user.subscription).toBe(subscription)
                        expect(user.app).toBe(app)
                        expect(user.password).toBeUndefined()
                    })
            })

            it('should fail on incorrect user id', () => {
                logic.__userId__ = 'fakeId'

                return logic.retrieveUser()
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()
                        expect(error.message).toBe(`token id \"${id}\" does not match user \"${logic.__userId__}\"`)
                    })
            })
        })

        // describe('reegister user', () => {

        // })

        // describe('update genres user', () => {
        //     it('should succed with correct genres', () => {

        //     })
        // }) 

        // describe('logout user user', () =>{
        //     it('should succed and delete id and token user', () =>{

        //     })
        // }) 
    })

    describe('movies', () => {
        describe('search movies', () => {
            it('should succed on correct query', () => {
                return logic.searchMovies('avengers')
                    .then(movies => {
                        const { results } = movies

                        expect(movies).toBeDefined()
                        expect(results instanceof Array).toBeTruthy()
                        expect(results.length).toBeGreaterThan(0)
                    })
            })

            it('should succed on correct query without results', () => {
                return logic.searchMovies('asdfasdfasdf')
                    .then(movies => {
                        const { results } = movies
                        
                        expect(movies).toBeDefined()
                        expect(results instanceof Array).toBeTruthy()
                        expect(results.length).toBe(0)
                    })
            })

            it('should fail if the field is empty ', () => {
                return logic.searchMovies('')
                    .then((response) => {
                        expect(response).toBeDefined()
                        expect(response.errors[0]).toBe('query must be provided')
                    })
            })
        })
        
        describe('retrieve movie', () => {
            it('should succed on correct id', () => {
                let _id = 530
                return logic.retrieveMovie(_id)
                    .then(movie => {
                        const { id, title, overview, poster_path, backdrop_path, genres, release_date, vote_average } = movie

                        expect(id).toBe(_id)
                        expect(typeof id).toBe('number')
                        expect(typeof title).toBe('string')
                        expect(title.length).toBeGreaterThan(0)
                        expect(typeof overview).toBe('string')
                        expect(overview.length).toBeGreaterThan(0)
                        expect(typeof poster_path).toBe('string')
                        expect(poster_path.length).toBeGreaterThan(0)
                        expect(typeof backdrop_path).toBe('string')
                        expect(backdrop_path.length).toBeGreaterThan(0)
                        expect(genres instanceof Object).toBeTruthy()
                        expect(genres.length).toBeGreaterThan(0)
                        expect(typeof release_date).toBe('string')
                        expect(release_date.length).toBeGreaterThan(0)
                        expect(typeof vote_average).toBe('number')
                    })
            })
            it('should fail on invalid id', () => {
                return logic.retrieveMovie(12312411)
                    .then(response => {
                        expect(response).toBeDefined()
                        expect(response.status_message).toBe('The resource you requested could not be found.')
                    })

            })
        })

        describe('toggle movie list', () => {
            let id, token, movieId

            beforeEach(() => {
                movieId = Math.random()
                
                return userApi.create(email, password, { fullname })
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

            it('should succeed adding movie on first time', () => {
                return logic.toggleMovieUserList(movieId)
                    .then(response => expect(response).toBeUndefined())
                    .then(() => userApi.retrieve(id, token))
                    .then(response => {
                        const { data: { movieList } } = response

                        expect(movieList).toBeDefined()
                        expect(movieList instanceof Array).toBeTruthy()
                        expect(movieList.length).toBe(1)
                        expect(movieList[0]).toBe(movieId)
                    })
            })
            
            it('should succeed removing movie on second time', () => {
                return logic.toggleMovieUserList(movieId)
                    .then(() => logic.toggleMovieUserList(movieId))
                    .then(() => userApi.retrieve(id, token))
                    .then(response => {
                        const { data: { movieList } } = response

                        expect(movieList).toBeDefined()
                        expect(movieList instanceof Array).toBeTruthy()
                        expect(movieList.length).toBe(0)
                    })
            })

            it('should fail on null movie id', () => {
                movieId = null

                expect(() => logic.toggleMovieUserList(movieId)).toThrowError(RequirementError, 'id is not optional')
            })
        })

        describe('retrieve movie list', () => {
            let id, token, _movieList

            beforeEach(() => {
                _movieList = []

                return movieApi.searchMovies('avengers')
                    .then(movies => {
                        const { results } = movies

                        for (let i = 0; i < 10; i++) {
                            const randomIndex = Math.floor(Math.random() * results.length)

                            _movieList[i] = results.splice(randomIndex, 1)[0].id
                        }

                        return userApi.create(email, password, { fullname, app, subscription, movieList: _movieList })
                    })
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

            it('should succeed adding fav on first time', () => {
                return logic.retrieveMovieUserList()
                    .then(movies => {
                        
                        movies.forEach(({ id, title, overview, poster_path, genres, release_date, vote_average }) => {
                            const movieList = _movieList.some(movie => movie === id)

                            expect(movieList).toBeTruthy()
                            expect(typeof title).toBe('string')
                            expect(title.length).toBeGreaterThan(0)
                            expect(typeof overview).toBe('string')
                            expect(overview.length).toBeGreaterThan(0)
                            expect(typeof poster_path).toBe('string')
                            expect(poster_path.length).toBeGreaterThan(0)
                            expect(genres instanceof Object).toBeTruthy()
                            expect(typeof release_date).toBe('string')
                            expect(release_date.length).toBeGreaterThan(0)
                            expect(typeof vote_average).toBe('number')
                        })
                    })
            })
        })

        describe('retrive movie genres', () => {
            it('should succed',  () => {
                logic.retrieveMovieGenres()
                    .then(response => {
                        expect(response).toBeDefined()
                        expect(response instanceof Object).toBeTruthy()
                        expect(response.genres instanceof Array).toBeTruthy()
                        expect(response.genres.length).toBe(19)
                    })
            })
        })
    })
})