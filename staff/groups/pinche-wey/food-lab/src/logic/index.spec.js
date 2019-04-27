import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'
import recipeApi from '../data/recipe-api';

describe('logic', () => {
    xdescribe('users', () => { //DONE
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        let confirmEmail
        const password = '123456'
        const confirmPassword = '123456'
        const confirmAge = true
        const confirmConditions = true

        beforeEach(() => {
            confirmEmail = email = `manuelbarzi-${Math.random()}@gmail.com`

            logic.__userId__ = null
            logic.__userToken__ = null
        })

        describe('register user', () => {
            it('should succeed on correct user data', () =>
                logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)
                    .then(response => expect(response).toBeUndefined())
            )

            describe('on already existing user', () => {
                beforeEach(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions))

                it('should fail on retrying to register', () =>
                    logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)
                        .then(() => { throw Error('should not reach this point') })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error instanceof LogicError).toBeTruthy()

                            expect(error.message).toBe(`user with username \"${email}\" already exists`)
                        })
                )
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions))).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined confirmEmail', () => {
                const confirmEmail = undefined

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null confirmEmail', () => {
                const confirmEmail = null

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty confirmEmail', () => {
                const confirmEmail = ''

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank confirmEmail', () => {
                const confirmEmail = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on not matching Email and confirmEmail', () => {
                const confirmEmail = 'pepito@email.com'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, 'Email do not match!')
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on password shorter than 6 digits', () => {
                const confirmPassword = '12345'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, 'Password too short!')
            })

            it('should fail on undefined confirmPassword', () => {
                const confirmPassword = undefined

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null  confirmPassword', () => {
                const confirmPassword = null

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty confirmPassword', () => {
                const confirmPassword = ''

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank confirmPassword', () => {
                const confirmPassword = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on a not boolean value for confirmAge', () => {
                const confirmAge = 'hola'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(TypeError, `confirmAge hola is not a boolean`)
            })

            it('should fail on a not boolean value for confirmConditions', () => {
                const confirmConditions = 'hola'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(TypeError, `confirmConditions hola is not a boolean`)
            })

            it('should fail on a false value for confirmAge', () => {
                const confirmAge = false

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, 'Age is not confirmed!')
            })

            it('should fail on a false value for confirmConditions', () => {
                const confirmConditions = false

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, 'Conditions are not confirmed')
            })

            it('should fail on not matching password and confirmPassword', () => {
                const confirmPassword = '1234567'

                expect(() => logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)).toThrowError(RequirementError, 'Password do not match!')
            })
        })

        describe('login user', () => {
            let id

            beforeEach(() =>
                userApi.create(email, password, { name, surname })
                    .then(response => id = response.data.id)
            )

            it('should succeed on correct user credential', () =>
                logic.loginUser(email, password)
                    .then(() => {
                        const { __userId__, __userToken__ } = logic

                        expect(typeof __userId__).toBe('string')
                        expect(__userId__.length).toBeGreaterThan(0)
                        expect(__userId__).toBe(id)

                        expect(typeof __userToken__).toBe('string')
                        expect(__userToken__.length).toBeGreaterThan(0)

                        const [, payloadB64,] = __userToken__.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)

                        expect(payload.id).toBe(id)

                        expect(logic.isUserLoggedIn).toBeTruthy()
                    })
            )

            it('should fail on non-existing user', () =>
                logic.loginUser(email = 'unexisting-user@mail.com', password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`user with username \"${email}\" does not exist`)
                    })
            )
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

        xdescribe('toggle fav duck', () => {
            let id, token, duckId

            beforeEach(() => {
                duckId = `${Math.random()}`

                return userApi.create(email, password, { name, surname })
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

            it('should succeed adding fav on first time', () =>
                logic.toggleFavDuck(duckId)
                    .then(response => expect(response).toBeUndefined())
                    .then(() => userApi.retrieve(id, token))
                    .then(response => {
                        const { data: { favs } } = response

                        expect(favs).toBeDefined()
                        expect(favs instanceof Array).toBeTruthy()
                        expect(favs.length).toBe(1)
                        expect(favs[0]).toBe(duckId)
                    })
            )

            it('should succeed removing fav on second time', () =>
                logic.toggleFavDuck(duckId)
                    .then(() => logic.toggleFavDuck(duckId))
                    .then(() => userApi.retrieve(id, token))
                    .then(response => {
                        const { data: { favs } } = response

                        expect(favs).toBeDefined()
                        expect(favs instanceof Array).toBeTruthy()
                        expect(favs.length).toBe(0)
                    })
            )

            it('should fail on null duck id', () => {
                duckId = null

                expect(() => logic.toggleFavDuck(duckId)).toThrowError(RequirementError, 'id is not optional')
            })

            // TODO more cases
        })

        xdescribe('retrieve fav ducks', () => {
            let id, token, _favs

            beforeEach(() => {
                _favs = []

                return duckApi.searchDucks('')
                    .then(ducks => {
                        for (let i = 0; i < 10; i++) {
                            const randomIndex = Math.floor(Math.random() * ducks.length)

                            _favs[i] = ducks.splice(randomIndex, 1)[0].id
                        }

                        return userApi.create(email, password, { name, surname, favs: _favs })
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

            it('should succeed adding fav on first time', () =>
                logic.retrieveFavDucks()
                    .then(ducks => {
                        ducks.forEach(({ id, title, imageUrl, description, price }) => {
                            const isFav = _favs.some(fav => fav === id)

                            expect(isFav).toBeTruthy()
                            expect(typeof title).toBe('string')
                            expect(title.length).toBeGreaterThan(0)
                            expect(typeof imageUrl).toBe('string')
                            expect(imageUrl.length).toBeGreaterThan(0)
                            expect(typeof description).toBe('string')
                            expect(description.length).toBeGreaterThan(0)
                            expect(typeof price).toBe('string')
                            expect(price.length).toBeGreaterThan(0)
                        })
                    })
            )
        })
    })

    describe('recipes', () => {
        describe('search recipes', () => { //DONE
            it('should succeed on correct query and selector', () =>
                logic.searchRecipes('tomato', 'filter.php?i=')
                    .then(recipes => {
                        const { meals } = recipes

                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Object).toBeTruthy()

                        expect(meals).toBeDefined()
                        expect(meals instanceof Array).toBeTruthy()
                        expect(meals.length).toBe(6)
                    })
            )

            it('should fail on wrong type query', () => {
                const noTomato = { "No": "No" }

                expect(() => logic.searchRecipes(noTomato, 'filter.php?i=')).toThrowError(TypeError)
            })

            it('should fail on wrong type selector', () => {
                const noTomato = { "No": "No" }

                expect(() => logic.searchRecipes("tomato", noTomato)).toThrowError(TypeError)
            })

            it('should recibe null for empty results on correct query type', () => {
                const noResults = "chiclet"

                logic.searchRecipes(noResults, 'filter.php?i=')
                    .then(recipes => {
                        const { meals } = recipes

                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Object).toBeTruthy()

                        expect(meals).toBeDefined()
                        expect(meals === null).toBeTruthy()
                    })
            })

            it('should fail on wrong selector', () => {
                const wrongSelector = "filter.php?"

                logic.searchRecipes("tomato", wrongSelector)
                    .then(recipes => {

                        expect(recipes).toBeDefined()
                    })
            })
        })

        describe('Randoms', () => { // DONE BUT HTML
            it('should succeed Random pick', () =>
                logic.retrieveRandomRecipes()
                    .then(recipes => {
                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Object).toBeTruthy()
                    })
            )
        })

        describe('detail recipe', () => {
            it('should succeed on correct id', () =>
                logic.retrieveRecipe("52772")
                    .then(recipes => {
                        const { meals } = recipes

                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Object).toBeTruthy()

                        expect(meals).toBeDefined()
                        expect(meals instanceof Array).toBeTruthy()
                    })
            )

            it('should fail on incorrect id', () =>
                logic.retrieveRecipe("5665")
                    .then(recipes => {
                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Object).toBeTruthy()
                    })
            )
        })
    })
})