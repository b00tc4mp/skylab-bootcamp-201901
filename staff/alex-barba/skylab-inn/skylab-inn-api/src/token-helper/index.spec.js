'use strict'

require('dotenv').config()
require('mocha')

const tokenHelper = require('.')
const expect = require('expect')

const { env: { JWT_SECRET } } = process

const jwt = require('jsonwebtoken')

describe('token helper', () => {

    describe('create token', () => {

        it('should succeed on valid data ', () => {
            const userId = `randomUserId-${Math.random()}`

            const token = tokenHelper.createToken(userId)

            expect(token).toBeDefined()

            const { sub } = jwt.verify(token, JWT_SECRET)

            expect(sub).toBe(userId)
            expect(typeof sub === 'string').toBeTruthy()
        })

        it('should failt when userId is a number', () => {
            const userId = 1234

            expect(() => tokenHelper.createToken(userId)).toThrowError(`${userId} should be a string`)
        })

        it('should failt when userId is an array', () => {
            const userId = []

            expect(() => tokenHelper.createToken(userId)).toThrowError(`${userId} should be a string`)
        })

        it('should failt when userId is an object', () => {
            const userId = {}

            expect(() => tokenHelper.createToken(userId)).toThrowError(`${userId} should be a string`)
        })

        it('should failt when userId is a boolean', () => {
            const userId = true

            expect(() => tokenHelper.createToken(userId)).toThrowError(`${userId} should be a string`)
        })

        it('should failt when userId is empty', () => {
            const userId = ''

            expect(() => tokenHelper.createToken(userId)).toThrowError(`userId is empty`)
        })

    })

    describe('verify token', () => {

        it('should succeed on valid token ', () => {
            const userId = `randomUserId-${Math.random()}`

            const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '4h' })
            
            const sub = tokenHelper.verifyToken(token)

            expect(sub).toBe(userId)
            expect(typeof sub === 'string').toBeTruthy()
        })

        it('should failt when sub is not present in token', () => {
            const userId = `randomUserId-${Math.random()}`

            const token = jwt.sign({ sub: '' }, JWT_SECRET, { expiresIn: '4h' })

            expect(() => tokenHelper.verifyToken(token)).toThrowError(`subject not present in token ${token}`)
        })

        it('should failt when token is a number', () => {
            const token = 1234

            expect(() => tokenHelper.verifyToken(token)).toThrowError(`${token} should be a string`)
        })

        it('should failt when token is an array', () => {
            const token = []

            expect(() => tokenHelper.verifyToken(token)).toThrowError(`${token} should be a string`)
        })

        it('should failt when token is an object', () => {
            const token = {}

            expect(() => tokenHelper.verifyToken(token)).toThrowError(`${token} should be a string`)
        })

        it('should failt when token is a boolean', () => {
            const token = true

            expect(() => tokenHelper.verifyToken(token)).toThrowError(`${token} should be a string`)
        })

        it('should failt when token is empty', () => {
            const token = ''

            expect(() => tokenHelper.verifyToken(token)).toThrowError(`token is empty`)
        })

    })

})