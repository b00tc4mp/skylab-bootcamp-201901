'use strict'

import logic from '.'
import skylabInnApi from '../skylab-inn-api'

describe('register user', () => {
    const name = 'Àlex'
    const surname = 'Barba'
    const email = `alex.barba-${Math.random()}@gmail.com`
    const password = `Pass-${Math.random()}`
    const passwordConfirm = password

    it('should succeed on correct data', async() => {
        const id = await logic.registerUser(name, surname, email, password, passwordConfirm)

        expect(id).toBeDefined()
        expect(typeof id === 'string').toBeTruthy()
    })

    it('should fail on duplicate email', () => {
        const _name = 'Àlex'
        const _surname = 'Barba'
        const _email = `alex.barba-${Math.random()}@gmail.com`
        const _password = `Pass-${Math.random()}`
        const _passwordConfirm = _password

        skylabInnApi.registerUser(_name, _surname, _email, _password, _passwordConfirm)
            .then(id => {
                expect(id).toBeDefined()
                expect(typeof id === 'string').toBeTruthy()
            })
            .then(() => logic.registerUser(_name, _surname, _email, _password, _passwordConfirm))
            .catch(error => {
                expect(error).toBeDefined();
                expect(error.message).toBe(`user with email ${_email} already exists`)
            })
    })

    it('should fail when passwords do not match', () =>
        expect(() => logic.registerUser(name, surname, email, password, 'do-not-match')).toThrowError('passwords do not match'))

    it('should fail on empty name', () =>
        expect(() => logic.registerUser('', surname, email, password, passwordConfirm)).toThrowError('name is empty'))

    it('should fail on empty surname', () =>
        expect(() => logic.registerUser(name, '', email, password, passwordConfirm)).toThrowError('surname is empty'))
    
    it('should fail on empty email', () =>
        expect(() => logic.registerUser(name, surname, '', password, passwordConfirm)).toThrowError('email is empty'))
    
    it('should fail on empty password', () =>
        expect(() => logic.registerUser(name, surname, email, '', passwordConfirm)).toThrowError('password is empty'))

    it('should fail on empty password confirmation', () =>
        expect(() => logic.registerUser(name, surname, email, password, '')).toThrowError('password confirmation is empty'))

    it('should fail when name is a number', () =>
        expect(() => logic.registerUser(1, surname, email, password, passwordConfirm)).toThrowError(`1 is not a string`))

    it('should fail when name is an object', () =>
        expect(() => logic.registerUser({}, surname, email, password, passwordConfirm)).toThrowError(`[object Object] is not a string`))
    
    it('should fail when name is an array', () =>
        expect(() => logic.registerUser([1,2,3], surname, email, password, passwordConfirm)).toThrowError(`1,2,3 is not a string`))

    it('should fail when name is a boolean', () =>
        expect(() => logic.registerUser(true, surname, email, password, passwordConfirm)).toThrowError(`true is not a string`))

    it('should fail when surname is a number', () =>
        expect(() => logic.registerUser(name, 1, email, password, passwordConfirm)).toThrowError(`1 is not a string`))

    it('should fail when surname is an object', () =>
        expect(() => logic.registerUser(name, {}, email, password, passwordConfirm)).toThrowError(`[object Object] is not a string`))
    
    it('should fail when surname is an array', () =>
        expect(() => logic.registerUser(name, [1,2,3], email, password, passwordConfirm)).toThrowError(`1,2,3 is not a string`))

    it('should fail when surname is a boolean', () =>
        expect(() => logic.registerUser(name, true, email, password, passwordConfirm)).toThrowError(`true is not a string`))

    it('should fail when email is a number', () =>
        expect(() => logic.registerUser(name, surname, 1, password, passwordConfirm)).toThrowError(`1 is not a string`))

    it('should fail when email is an object', () =>
        expect(() => logic.registerUser(name, surname, {}, password, passwordConfirm)).toThrowError(`[object Object] is not a string`))
    
    it('should fail when email is an array', () =>
        expect(() => logic.registerUser(name, surname, [1,2,3], password, passwordConfirm)).toThrowError(`1,2,3 is not a string`))

    it('should fail when email is a boolean', () =>
        expect(() => logic.registerUser(name, surname, true, password, passwordConfirm)).toThrowError(`true is not a string`))

    it('should fail when password is a number', () =>
        expect(() => logic.registerUser(name, surname, email, 1, passwordConfirm)).toThrowError(`1 is not a string`))

    it('should fail when password is an object', () =>
        expect(() => logic.registerUser(name, surname, email, {}, passwordConfirm)).toThrowError(`[object Object] is not a string`))
    
    it('should fail when password is an array', () =>
        expect(() => logic.registerUser(name, surname, email, [1,2,3], passwordConfirm)).toThrowError(`1,2,3 is not a string`))

    it('should fail when password is a boolean', () =>
        expect(() => logic.registerUser(name, surname, email, true, passwordConfirm)).toThrowError(`true is not a string`))
    
    it('should fail when password confirmation is a number', () =>
        expect(() => logic.registerUser(name, surname, email, password, 1)).toThrowError(`1 is not a string`))

    it('should fail when password confirmation is an object', () =>
        expect(() => logic.registerUser(name, surname, email, password, {})).toThrowError(`[object Object] is not a string`))
    
    it('should fail when password confirmation is an array', () =>
        expect(() => logic.registerUser(name, surname, email, password, [1,2,3])).toThrowError(`1,2,3 is not a string`))

    it('should fail when password confirmation is a boolean', () =>
        expect(() => logic.registerUser(name, surname, email, password, true)).toThrowError(`true is not a string`))
})

describe('authenticate user', () => {
    const name = 'Àlex'
    const surname = 'Barba'
    let email, password, passwordConfirm

    beforeEach(async() => {
        email = `alex.barba-${Math.random()}@gmail.com`
        password = `Pass-${Math.random()}`
        passwordConfirm = password
        return skylabInnApi.registerUser( name, surname, email, password, passwordConfirm)
    })

    it('should succeed on correct data', async() => {
        const token = await logic.logInUser(email, password)

        expect(token).toBeDefined()
        expect(typeof token === 'string').toBeTruthy()
    })

    it('should fail on not registered email', async() => {
        logic.logInUser('not-previously-registered@mail.com', password)
            .catch(error => {
                expect(error).toBeDefined();
                expect(error.message).toBe(`user with email not-previously-registered@mail.com not found`)
            })
    })

    it('should fail on wrong credentials', async() => {
        logic.logInUser(email, 'not-a-matching-password')
            .catch(error => {
                expect(error).toBeDefined();
                expect(error.message).toBe(`wrong credentials`)
            })
    })

    it('should fail on empty email', () =>
    expect(() => logic.logInUser('', password)).toThrowError('email is empty'))

    it('should fail on empty password', () =>
        expect(() => logic.logInUser(email, '')).toThrowError('password is empty'))

    it('should fail when email is a number', () =>
        expect(() => logic.logInUser(1, password)).toThrowError(`1 is not a string`))

    it('should fail when email is an object', () =>
        expect(() => logic.logInUser({}, password)).toThrowError(`[object Object] is not a string`))
    
    it('should fail when email is an array', () =>
        expect(() => logic.logInUser([1,2,3], password)).toThrowError(`1,2,3 is not a string`))

    it('should fail when email is a boolean', () =>
        expect(() => logic.logInUser(true, password)).toThrowError(`true is not a string`))

    it('should fail when password is a number', () =>
        expect(() => logic.logInUser(email, 1)).toThrowError(`1 is not a string`))

    it('should fail when password is an object', () =>
        expect(() => logic.logInUser(email, {})).toThrowError(`[object Object] is not a string`))
    
    it('should fail when password is an array', () =>
        expect(() => logic.logInUser(email, [1,2,3])).toThrowError(`1,2,3 is not a string`))

    it('should fail when password is a boolean', () =>
        expect(() => logic.logInUser(email, true)).toThrowError(`true is not a string`))
})