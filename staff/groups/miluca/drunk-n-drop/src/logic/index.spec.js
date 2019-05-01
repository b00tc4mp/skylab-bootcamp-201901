import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'
import cocktail from '../data/cocktail-api';
import { italic } from 'ansi-colors';

describe('logic', () => {
    describe('users', () =>{
        const name = 'miluca'
        let email
        const password = '123'
        let favorites = []
        let creations= []   
           
    
        beforeEach(() => {
            email = `miluca-${Math.random()}@gmail.com`
    
            logic.__userId__ = null
            logic.__userToken__ = null
        })

        describe('login user', () => {
            let id  
            beforeEach(() => 
            userApi.create(email, password)
                .then(response => id = response.data.id) 
            )
    
            it('Should succeed on correct user credential', () =>
                logic.loginUser(email, password)
                .then(() => {
                    const {__userId__, __userToken__} = logic
                    
                    
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
    
            it('Should fail on unexisting user', () => {
                const email= 'unexistinguser@gmail.com'
                logic.loginUser(email, password) 
                    .then (() => {throw Error('Should no reach this point')})
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()
                        expect(error.message).toBe(`user with username \"${email}\" does not exist`)
                    })
            })   
    
            it('Should fail on incorrect password', () => {
                const password='789'
                logic.loginUser(email, password) 
                    .then (() => {throw Error('Should no reach this point')})
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()
                        expect(error.message).toBe(`username and/or password wrong`)
                    })
            })   
            
            it('Should fail on username email', () => {
                const email = undefined
                expect(() => logic.loginUser(email, password)).toThrowError(RequirementError, `username is not optional`)
            })
    
            it('Should fail on null username', () => {
                const email = null
                expect(() => logic.loginUser(email, password)).toThrowError(RequirementError, `username is not optional`)
            })
    
            it('Should fail on empty username', () => {
                const email = ''
                expect(() => logic.loginUser(email, password)).toThrowError(ValueError, `username is empty`)
            })
    
            it('Should fail on blank username', () => {
                const email = `\t   \n`
                expect(() => logic.loginUser(email, password)).toThrowError(ValueError, `username is empty`)
            })
    
            it('Should fail on undefined password', () => {
                const password = undefined
                expect(() => logic.loginUser(email, password)).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('Should fail on null password', () => {
                const password = null
                expect(() => logic.loginUser(email, password)).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('Should fail on empty password', () => {
                const password = ''
                expect(() => logic.loginUser(email, password)).toThrowError(ValueError, `password is empty`)
            })
    
            it('Should fail on blank password', () => {
                const password = `\t   \n`
                expect(() => logic.loginUser(email, password)).toThrowError(ValueError, `password is empty`)
            })
        })

        describe('register user', () => {
    
            it('should succeed on correct user data', () =>
                logic.registerUser(name, email, password)
                .then(response => expect(response).toBeUndefined())
            )
    
            it('should fail on undefined name', () => {
                const name = undefined
                
                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
            })
                
            describe('on alredy existing user', () => {
                beforeEach(() => logic.registerUser(name, email, password))
                
                it('sould fail on retrying to register', () =>
                    logic.registerUser(name, email, password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()
                        
                        expect(error.message).toBe(`user with username \"${email}\" already exists`)
                    })
                )
            })
            it('should fail on null name', () => {
                const name = null
    
                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
            })
    
            it('should fail on empty name', () => {
                const name = ''
                
                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'name is empty')
            })
    
            it('should fail on blank name', () => {
                const name = ' \t    \n'
    
                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'name is empty')
            })
    
            it('should fail on undefined email', () => {
                const email = undefined
    
                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
            })
    
            it('should fail on null email', () => {
                const email = null
    
                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
            })
    
            it('should fail on empty email', () => {
                const email = ''
    
                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
            })
    
            it('should fail on blank email', () => {
                const email = ' \t    \n'
    
                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
            })
    
            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'
    
                expect(() => logic.registerUser(name, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })
    
            it('should fail on undefined password', () => {
                const password = undefined
                
                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `password is not optional`)
            })
            
            it('should fail on null password', () => {
                const password = null
                
                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('should fail on empty password', () => {
                const password = ''
                
                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'password is empty')
            })
    
            it('should fail on blank password', () => {
                const password = ' \t    \n'
    
                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'password is empty')
            })
            
        })
        describe('retrieve user', () => {

            let id, token
    
            beforeEach(() =>
                userApi.create(email, password, {name, favorites, creations}) 
                .then(() => {
                    return userApi.authenticate(email, password)
                })
                .then(response => {
                    id = response.data.id
                    token = response.data.token
                    logic.__userId__ = id
                    logic.__userToken__ = token
                })
            )
    
            it('Should succedd on correct user id and token', () => {
                return logic.retrieveUser()
                .then(user => {
                    expect(typeof user.id).toBe('undefined')
                    expect(user.name).toBe(name)
                    // expect(user.password).toBeUndefined()
                    expect(user.email).toBe(email)
                })
            })
    
            it('Should fail on incorrect id', () => {
                logic.__userId__= '5cb9998f2e59ee0009AAc02c'
                return logic.retrieveUser()
                    .then(() => {throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()
                        expect(error.message).toBe(`token id \"${id}\" does not match user \"${logic.__userId__}\"`)
                    })
            })       
        }) 

        describe('favorite cocktails', ()  =>{
            let id, token, cocktail_id
    
            beforeEach(() => {
                cocktail_id = `${Math.random()}`
    
                return userApi.create(email, password, {name, favorites, creations})
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
    
            it('should add a favorite', () =>
                logic.toggleFavoriteCocktail(cocktail_id)
                .then(response => expect(response).toBeUndefined())
                .then(() => userApi.retrieve(id, token))
                    .then(response => {
                        const { data: { favorites } } = response
                        expect(response.data).toBeDefined()

                        expect(favorites).toBeDefined()
                        expect(favorites instanceof Array).toBeTruthy()
                        expect(favorites.length).toBe(1)
                        expect(favorites[0]).toBe(cocktail_id)
                    })
            )
            it('should delete a favorite if you toggle it again', () =>
                logic.toggleFavoriteCocktail(cocktail_id)
                    .then(() => logic.toggleFavoriteCocktail(cocktail_id))
                        .then(() => userApi.retrieve(id, token))
                            .then(response => {
                                expect(response.data).toBeDefined()
                                const { data: { favorites } } = response

                                expect(favorites).toBeDefined()
                                expect(favorites instanceof Array).toBeTruthy()
                                expect(favorites.length).toBe(0)
                            })
                    )
        })
    
        describe('user log-out', () => {
        
            it('should clear session storage after log out', () => {
    
                logic.logoutUser()
                expect(sessionStorage.length).toBe(0);
    
            })
        })
    })
    describe('Cocktails', () => {
        let email
        const password = '1234'
        
        beforeEach(() => {
            email = `miguel-${Math.random()}@gmail.com`

            logic.__userId__ = null
            logic.__userToken__ = null
        })

        describe('retrieve favorites', () =>{

            let id , token

            beforeEach(()=> {
                

                return cocktail.searchByingredient('lime')
                .then (response => {
                    
                    const {drinks:[{idDrink}]} = response
                 
                    return userApi.create(email,password,{favorites : [idDrink]})
                })
                .then(response => {
                    
                    id= response.data.id
                    return userApi.authenticate(email,password)
                })
                .then(response => {
                    token = response.data.token

                    logic.__userId__ = id
                    logic.__userToken__ = token
                })
            })


            it('should succed retiriving user favorites', () =>
            
            logic.retriveFavorites()
                .then(response => {
                    expect(response instanceof Array).toBeTruthy()

                })           
            )
        }),
        describe('search by category', () => {
            it('Should succed on correct query', () => {
                logic.searchByCategory('Beer')
                .then(cockt => {
                    expect(cockt).toBeDefined()
                    expect(cockt instanceof Array).toBeTruthy()
                    expect(cockt.length).toBe(13)
                    
                })
    
            })
    
        }),
        it('should retrive coktails by glass category', ()=>{

            let glass = 'Cocktail_glass'

                logic.cocktailbyGlass(glass)
                    .then(response => {
                        expect(response instanceof Object).toBeTruthy()
                        expect(response.drinks.length).toBeGreaterThan(0)
                        expect(response.drinks.isDrink).toBe('16108')
                    })

        }),
    
        it('should retrive coktails by Name', ()=>{
            let name = 'margarita'
            logic.cocktailbyName(name)
                .then(response => {
                    expect(response instanceof Object).toBeTruthy()
                    expect(response.drinks.length).toBeGreaterThan(0)
                    expect(response.drinks.isDrink).toBe("11007")
                })
        }),
        it('should retrive coktail detail by ID', ()=>{
            let id = '11007'
                logic.cocktailbyName(id)
                    .then(response => {
                        
                        expect(response instanceof Object).toBeTruthy()
                        expect(response.drinks.length).toBeGreaterThan(0)
                        expect(response.drinks.isDrink).toBe("11007")
                    })

        }), 
        
        it('should list popular cocktails', ()=>{
                logic.popularCocktails()
                    .then(response => {
                       
                        expect(response instanceof Object).toBeTruthy()
                        expect(response.drinks.length).toBeGreaterThan(0)
                        expect(response.drinks.isDrink).toBe("1100")
                    })

        }) 
    })
})