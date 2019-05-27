const logic = require('.')
const mongoose = require('mongoose')
const { User, Note } = require('../data/models')
const { LogicError } = require('../common/errors')

describe('logic', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect('mongodb://localhost/note-apx-test', {useNewUrlParser: true})
            
            console.log('connected to database')
        } catch (error) {
            console.log(error)
        }
    })

    const name = 'Bruce'
    let email
    const password = '123'

    beforeEach(async () => {
        await User.deleteMany()
        await Note.deleteMany()

        email = `peter-${Math.random()}@gmail.com`
    })

    describe('users', () => {
        describe('register user', () => {
            it('should success on correct data', async () => {
                await logic.registerUser(name, email, password)

                const user = await User.findOne({email})
                
                expect(user.name).toBe(name)
                expect(user.email).toBe(email)
                expect(user.password).toBe(password)
            })

            it('should fail on already user exists', async () => {
                try {
                    await User.create({name, email, password})
                    await logic.registerUser(name, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe(`user with email ${email} already exists`)
                }
            })
        })

        describe('authenticate user', () => {
            let id

            beforeEach(async () => {
                await User.create({name, email, password})
                const user = await User.findOne({email})
                id = user.id 
            })

            it('should success on correct data', async () => {
                const _id = await logic.authenticateUser(email, password)

                expect(_id).toBe(id)
            })
        })

        describe('retrieve user', () => {
            let id, user

            beforeEach(async () => {
                await User.create({name, email, password})
                user = await User.findOne({email})
                id = user.id 
            })

            it('should success on correct data', async () => {
                const _user = await logic.retrieveUser(id)

                expect(_user.name).toBe(user.name)
                expect(_user.email).toBe(user.email)
                
                expect(_user.notes[0]).toBe(user.notes[0])
            })
        })

        describe('add private notes', () => {
            let id, text

            beforeEach(async () => {
                await User.create({name, email, password})
                const user = await User.findOne({email})
                id = user.id
                text = 'Buy milk!'
            })

            it('should success adding one note', async () => {
                await logic.addPrivateNote(text, id)
                const _user = await User.findById(id)
                const { notes } = _user

                expect(_user.name).toBe(name)
                expect(_user.email).toBe(email)
                expect(_user.password).toBe(password)
                
                expect(notes[0].text).toBe(text)
                expect(notes[0].author.toString()).toBe(id)
            })

            it('should success adding one note', async () => {
                let _text = 'Make hoorrayyyys'

                await logic.addPrivateNote(text, id)
                await logic.addPrivateNote(_text, id)
                const _user = await User.findById(id)
                const { notes } = _user
                
                expect(_user.name).toBe(name)
                expect(_user.email).toBe(email)
                expect(_user.password).toBe(password)
                debugger
                expect(notes[0].text).toBe(text)
                expect(notes[0].author.toString()).toBe(id)
                expect(notes[1].text).toBe(_text)
                expect(notes[1].author.toString()).toBe(id)
            })
        })
    })

    describe('public notes', () => {
        let user, notes, texts
        
        beforeEach(async () => {
            user = await User.create({name, email, password})
            
            texts = new Array(10).fill('note').map(text => `${text}-${Math.random()}`)

            notes = []
                
            texts.forEach(async text => notes.push(await Note.create({text, author: user.id})))
        })

        describe('create note', () => {
            it('should success on correct data', async () => {
                const text = texts[Math.floor(Math.random() * texts.length - 1)]
                
                await logic.addPublicNote(text, user.id)
                
                const _note = await Note.findOne({text})
                
                expect(_note.text).toBe(text)
                expect(_note.author.toString()).toBe(user.id)
            })
        })

        describe('retrieve notes', () => {
            it('should success on correct', async () => {
                await logic.retrievePublicNotes(user.id)
            })
        })

        describe('delete public notes', () => {

        })
    })
    afterAll(() => mongoose.disconnect())
})


