import dotenv from 'dotenv'
import mongoose from 'mongoose'
import models from '../data/models'
import { expect } from 'chai'
import logic from '.';

dotenv.config()

const { User, Note } = models;
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', () => {
    let userData

    before(() => mongoose.connect(url, { useNewUrlParser: true }))

    beforeEach(async () => {
        await User.deleteMany()
        await Note.deleteMany()

        userData = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@mail.com`,
            password: `password-${Math.random()}`
        }
    })

    describe('add public note', () => {
        let user

        beforeEach(async () => user = await User.create(userData))

        it('should succeed for existing user', async () => {
            const text = 'Hola, Mundo!'
            
            debugger

            await logic.addPublicNote(user.id, text)

            const notes = await Note.find()

            expect(notes).to.exist
            expect(notes.length).to.equal(1)
        })
    })

    after(() => mongoose.disconnect())
})