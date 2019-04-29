import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'
import cocktail from '../data/cocktail-api';
import { italic } from 'ansi-colors';

describe('logic', () => {

    const name = 'Miguel'
    let email
    let password = '1234'


    beforeEach(() => {
        email = `miguel-${Math.random()}@gmail.com`

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
})