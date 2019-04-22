'use strict'

describe('validate', () => {
    
    let evalString = 'string'
    let evalNumber = 12345
    let evalArray = [1,2,3]
    let evalObject = {1:'a', 2: 'b'}
    let evalFunction = function () {console.log('Hello World!')}

    describe('arguments', () => {
        
        it('should succeed on correct data', () => {

            expect(validate.arguments([
                { name: 'evalString', value: evalString, type: 'string', notEmpty: true },
                { name: 'evalNumber', value: evalNumber, type: 'number', notEmpty: true },
                { name: 'evalArray', value: evalArray, type: 'object', notEmpty: true },
                { name: 'evalObject', value: evalObject, type: 'object', notEmpty: true },
                { name: 'evalFunction', value: evalFunction, type: 'function', notEmpty: true }
            ])).toBe(undefined) 
        })    
        
        it('should fail on undefined argument', () => {
            try {
                evalString = undefined
                validate.arguments([
                    { name: 'evalString', value: evalString, type: 'string', notEmpty: true }
                ])
            } catch (error) {
                expect(error.message).toBe('evalString is not optional')                            
            }
        })   

        it('should fail on null argument', () => {
            try {
                evalString = null
                validate.arguments([
                    { name: 'evalString', value: evalString, type: 'string', notEmpty: true }
                ])
            } catch (error) {
                expect(error.message).toBe('evalString is not optional')                            
            }
        })   

        it('should fail on empty argument', () => {
            try {
                evalString = ''
                validate.arguments([
                    { name: 'evalString', value: evalString, type: 'string', notEmpty: true }
                ])
            } catch (error) {
                expect(error.message).toBe('evalString is empty')                            
            }
        })   

        it('should fail on blank argument', () => {
            try {
                evalString = ' \t    \n'
                validate.arguments([
                    { name: 'evalString', value: evalString, type: 'string', notEmpty: true }
                ])
            } catch (error) {
                expect(error.message).toBe('evalString is empty')                            
            }
        })  

        it('should fail on wrong type of argument', () => {
            try {
                evalString = []
                validate.arguments([
                    { name: 'evalString', value: evalString, type: 'string', notEmpty: true }
                ])
            } catch (error) {
                expect(error.message).toBe('evalString  is not a string')                            
            }
        })  

    })

    describe('email', () => {
        let emailToValidate 

        it('should succeed on correct data', () => {
            emailToValidate = 'pepe.lopez@gmail.com'
            expect(validate.email(emailToValidate)).toBe(undefined)
        })    
        
        it('should fail on invalid email', () => {
            try {
                emailToValidate = 'pepe.lopezgmail.com'
                validate.email(emailToValidate)
            } catch (error) {
                expect(error.message).toBe(`${emailToValidate} is not an e-mail`)                            
            }
        })   

    })

})
