import logic from '../logic'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'
import cocktail from '../data/cocktail-api';
import { deepStrictEqual } from 'assert';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

describe('logic', () => {

    describe('users', () => {
        const name = 'Miguel'
        let email
        const password = '1234'


        beforeEach(() => {
            email = `miguel-${Math.random()}@gmail.com`

            logic.__userId__ = null
            logic.__userToken__ = null
        })


        describe('register user', () => {

            it('should succed on correct user data', () =>
                logic.registerUser(name, email, password)
                    .then(response => expect(response).toBeUndefined())
            )

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

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
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
    })
})