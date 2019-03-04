// import osiApi from '../osi-api'
import logic from '.'
import { expect } from 'chai'

describe('logic', () => {
    describe('register user', () => {
        let name = 'm'
        let surname = 'm'
        let email = `m-${Math.random()}@mail.com`
        let password = 'm'
        let passwordConfirm = password
        debugger

        it.only('should succeed on valid data', () =>
            logic.register(name, surname, email, password, passwordConfirm)
                .then(result => {
                    expect(result).to.exist
                    expect(result).to.be.a('string')
                })
        )

        /** NAME */

        it('should fail on object name instead of string', () => {
            name = {}
            expect(() => logic.register(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on boolean name instead of string', () => {
            name = true
            expect(() => logic.register(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on number name instead of string', () => {
            name = 4
            expect(() => logic.register(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on undefined name instead of string', () => {
            name = undefined
            expect(() => logic.register(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on null name instead of string', () => {
            name = null
            expect(() => logic.register(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on error name instead of string', () => {
            name = Error
            expect(() => logic.register(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on date name instead of string', () => {
            name = Date
            expect(() => logic.register(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on array name instead of string', () => {
            name = []
            expect(() => logic.register(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on empty name instead of string', () => {
            name = ''
            expect(() => logic.register(name, surname, email, password, passwordConfirm)).to.throw(Error, `name cannot be empty`)
        })

        /** SURNAME */

        it('should fail on object surname instead of string', () => {
            surname = {}
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on boolean surname instead of string', () => {
            surname = true
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on number surname instead of string', () => {
            surname = 4
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on undefined surname instead of string', () => {
            surname = undefined
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on null surname instead of string', () => {
            surname = null
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on error surname instead of string', () => {
            surname = Error
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on date surname instead of string', () => {
            surname = Date
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on array surname instead of string', () => {
            surname = []
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on empty surname instead of string', () => {
            surname = ''
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(Error, `surname cannot be empty`)
        })

        /** EMAIL */

        it('should fail on object email instead of string', () => {
            email = {}
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on boolean email instead of string', () => {
            email = true
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on number email instead of string', () => {
            email = 4
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on undefined email instead of string', () => {
            email = undefined
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on null email instead of string', () => {
            email = null
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on error email instead of string', () => {
            email = Error
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on date email instead of string', () => {
            email = Date
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on array email instead of string', () => {
            email = []
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on empty email instead of string', () => {
            email = ''
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(Error, `email cannot be empty`)
        })

        /** PASSWORD */

        it('should fail on object password instead of string', () => {
            password = {}
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on boolean password instead of string', () => {
            password = true
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on number password instead of string', () => {
            password = 4
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on undefined password instead of string', () => {
            password = undefined
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on null password instead of string', () => {
            password = null
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on error password instead of string', () => {
            password = Error
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on date password instead of string', () => {
            password = Date
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on array password instead of string', () => {
            password = []
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on empty password instead of string', () => {
            password = ''
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(Error, `password cannot be empty`)
        })

        /** PASSWORD CONFIRM */

        it('should fail on object passwordConfirm instead of string', () => {
            passwordConfirm = {}
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on boolean passwordConfirm instead of string', () => {
            passwordConfirm = true
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on number passwordConfirm instead of string', () => {
            passwordConfirm = 4
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on undefined passwordConfirm instead of string', () => {
            passwordConfirm = undefined
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on null passwordConfirm instead of string', () => {
            passwordConfirm = null
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on error passwordConfirm instead of string', () => {
            passwordConfirm = Error
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on date passwordConfirm instead of string', () => {
            passwordConfirm = Date
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on array passwordConfirm instead of string', () => {
            passwordConfirm = []
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on empty passwordConfirm instead of string', () => {
            passwordConfirm = ''
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(Error, `passwordConfirm cannot be empty`)
        })

        it('should fail on non-valid email instead of string', () => {
            email = `m@mail-${Math.random()}.com`
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .catch(error => expect(error.message).to.equal(`User validation failed: email: ${email} is not a valid email`))
        })

        it('should fail on already existing user', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.registerUser(name, surname, email, password, passwordConfirm))
                .catch(error => expect(error.message).to.equal(`user with email ${email} already exists`))
        )
    })
})