import validate from '.'
import { ValueError, RequirementError, FormatError } from '../errors'

describe('validate', () => {
    describe('arguments', () => {
        let id = 567
        it('should succed on correct arguments', () => {
            try {
                validate.arguments([{ name: 'id', value: id, type: 'number' }])
                expect(true).toBeTruthy()
            } catch (error) {
                expect(error).toBeUndefined()
            }
        })

        it('should fail on invalid types value', () => {
            expect(() => {
                validate.arguments([{ name: 'id', value: id, type: 'string' }])
            }).toThrowError(TypeError, 'id id is not a string')
        })

        it('should fail on not empty argument', () => {
            id = ''
            expect(() => {
                validate.arguments([{ name: 'id', value: id, type: 'string', notEmpty: true }])
            }).toThrowError(ValueError, 'id is empty')
        })

        it('should fail on not option argument', () => {
            id = undefined
            expect(() => {
                validate.arguments([{ name: 'id', value: id, type: 'number', notEmpty: true, optional: false }])
            }).toThrowError(RequirementError, 'id is not optional')
        })
    })
    describe('email', () => {
        let email = 'email@email.com'
        it('should succed on correct email', () => {
            try {
                validate.email(email)
                expect(true).toBeTruthy()
            } catch (error) {
                expect(error).toBeUndefined()
            }
        })
        it('should fail on invalid email', () => {
            email = 'invalidEmail'
            expect(() => {
                validate.email(email)
            }).toThrowError(FormatError, 'email is not an e-mail')
        })
    })

    describe('url', () => {
        let url = 'http://google.es'
        it('should succed on correct url', () => {
            try {
                validate.url(url)
                expect(true).toBeTruthy()
            } catch (error) {
                expect(error).toBeUndefined()
            }
        })
        it('should fail on invalid url', () => {
            url = 'htp//invalid.es'
            expect(() => {
                validate.url(url)
            }).toThrowError(FormatError, 'url is not a url')
        })
    })

})