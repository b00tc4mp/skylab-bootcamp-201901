import dotenv from 'dotenv'
import mongoose from 'mongoose'
import models from '../data/models'
import { expect } from 'chai'
import logic from '.';
import argon2 from 'argon2'

dotenv.config()

const { User, Note } = models;
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', () => {
    let name, surname, email, password

    before(() => mongoose.connect(url, { useNewUrlParser: true }))

    beforeEach(async () => {
        await User.deleteMany()
        await Note.deleteMany()

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
    })

    describe('register user', () => {
        it('should succeed on correct data', async () => {
            const res = await logic.registerUser(name, surname, email, password)

            expect(res).to.be.undefined

            const users = await User.find()

            expect(users).to.exist
            expect(users).to.have.lengthOf(1)

            const [user] = users

            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)

            expect(user.password).to.exist

            expect(await argon2.verify(user.password, password)).to.be.true
        })
    })

    describe('authenticate user', () => {
        let user

        beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password) }))

        it('should succeed on correct credentials', async () => {
            const id = await logic.authenticateUser(email, password)

            expect(id).to.exist
            expect(id).to.be.a('string')

            expect(id).to.equal(user.id)
        })
    })

    describe('retrieve user', () => {
        let user

        beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password) }))

        it('should succeed on correct id from existing user', async () => {
            const _user = await logic.retrieveUser(user.id)

            expect(_user.id).to.be.undefined
            expect(_user.name).to.equal(name)
            expect(_user.surname).to.equal(surname)
            expect(_user.email).to.equal(email)

            expect(_user.password).to.be.undefined
        })
    })

    describe('add public note', () => {
        let user

        beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password) }))

        it('should succeed for existing user', async () => {
            const text = 'Hola, Mundo!'

            const res = await logic.addPublicNote(user.id, text)

            expect(res).to.be.undefined

            const notes = await Note.find()

            expect(notes).to.exist
            expect(notes.length).to.equal(1)
        })
    })

    after(() => mongoose.disconnect())
})