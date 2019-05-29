require('dotenv').config()
const mongoose = require('mongoose')
const { User, Item } = require('../data/models')
const { LogicError, RequirementError, ValueError, FormatError } = require('../common/errors')
const chai = require('chai')
const { expect } = chai
const logic = require('../logic');
const argon2 = require('argon2')

const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', () => {
    let name, surname, email, password, age

    before( () =>  mongoose.connect(url, { useNewUrlParser: true }))
    after(async () =>  mongoose.disconnect())

    beforeEach(async () => {
        await User.deleteMany();
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        age = `${Math.floor(Math.random() * 100)}`
    })

    describe('user test', () => {
        
        describe('register user', function () {
            this.timeout(10000);

            it('should succeed on correct data', async function () {

                const res = await logic.registerUser(name, surname, email, password, age)
                expect(res).to.be.undefined

                const users = await User.find()

                expect(users).to.exist
                expect(users).to.have.lengthOf(1)

                const [user] = users

                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.exist
                expect(user.age).to.equal(parseInt(age))
                expect(user.cart).to.be.an('array')
                expect(user.wishlist).to.be.an('array')
                expect(user.historic).to.be.an('array')
                expect(await argon2.verify(user.password, password)).to.be.true;
            
            })

            describe('on already existing user', () => {
                beforeEach(() => User.create({ name, surname, email, password, age }))

                it('should fail on retrying to register', async () => {
                    try {
                        await logic.registerUser(name, surname, email, password, age)

                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).not.to.be.undefined
                        expect(error).to.be.instanceOf(LogicError)
                        expect(error.message).to.equal(`user with email "${email}" already exists`)
                    }
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(RequirementError, `name is not optional`)
            })


            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, age)).to.throw(FormatError, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined age', () => {
                const age = undefined

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(RequirementError, `age is not optional`)
            })

            it('should fail on null age', () => {
                const age = null

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(RequirementError, `age is not optional`)
            })

            it('should fail on empty age', () => {
                const age = ''

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(ValueError, 'age is empty')
            })

            it('should fail on blank age', () => {
                const age = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, age)).to.throw(ValueError, 'age is empty')
            })

        })

        describe('authenticate user', () => {
            
            beforeEach(() =>
                logic.registerUser( name, surname, email, password, age )
            
            )

            it('should succeed on correct credentials', async () => {
                
                
                const id = await logic.authenticateUser(email, password)
                expect(id).to.exist
                expect(id).to.be.a('string')
                
                const user = await User.findById(id)
                
                expect(id).to.equal(user.id)
            })

            it('should fail on non-existing user', async () => {
                try {
                    await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).not.to.be.undefined
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with email "${email}" does not exist`)
                }
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.authenticateUser( email, password )).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.authenticateUser( email, password )).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.authenticateUser( email, password )).to.throw(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.authenticateUser( email, password )).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'
                expect(() => logic.authenticateUser( nonEmail, password )).to.throw(FormatError, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.authenticateUser( email, password )).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.authenticateUser( email, password )).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.authenticateUser( email, password )).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.authenticateUser( email, password )).to.throw(ValueError, 'password is empty')
            })

            
        })

        describe('retrieve user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password), age }))

            it('should succeed on correct id from existing user', async () => {
                const _user = await logic.retrieveUser(user.id)
                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)
                expect(_user.age).to.equal(parseInt(age))
                expect(_user.password).to.be.undefined
            })

            it('should fail on undefined id', () => {
                const id = undefined

                expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')
            })

        })

        describe('Update user', () => {
            let user, _user, _id_

            beforeEach(async () => {user = await User.create({ name, surname, email, password: await argon2.hash(password), age })
            _id_ = '5'
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
            age = `${Math.floor(Math.random() * 100)}`
            })

            it('should succeed on correct id from existing user', async () => {
                const isUserUpdated = await logic.updateUser(user.id, {name, surname, email, age})
                _user = await logic.retrieveUser(user.id)
                expect(isUserUpdated).to.be.true
                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)
                expect(_user.age).to.equal(parseInt(age))
            })

            it('should fail on repeated email from existing user', async () => {
                debugger
                try{
                await logic.updateUser(user.id, {email: _user.email})
                }catch( err ){
                    expect(err).to.instanceOf(LogicError)
                    expect(err.message).to.equal('That email is already used')
                }
            })

            it('should fail on undefined id', () => {
                const id = undefined

                expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.updateUser(id, {})).to.throw(ValueError, 'id is empty')
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.updateUser(id, {})).to.throw(ValueError, 'id is empty')
            })

            it('should fail on undefined data', () => {
                const data = undefined

                expect(() => logic.updateUser(_id_, data)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on null data', () => {
                const data = null

                expect(() => logic.updateUser(_id_, data)).to.throw(RequirementError, `data is not optional`)
            })

        })

        describe('Delete User', ()=> {
            let id, _id_
            beforeEach(async () => {
                user = await User.create({ name, surname, email, password: await argon2.hash(password), age })
                id = user.id
                _id_ = '3'
            })

            it('should delete user on correct id', async ()=>{
                const isDeletedUser = await logic.deleteUser(user.id)
                expect(isDeletedUser).to.be.true
                const userDb = await User.findById(id)
                expect(userDb).to.be.null
            })

            it('should fail on unexisting id', async ()=>{
                try{
                    logic.deleteUser(_id_)
                } catch(err) {
                    expect(err).to.instanceOf(LogicError)
                    expect(err.message).to.equal(`This user doesn't exist`)
                }
            })


            it('should fail on undefined id', () => {
                const id = undefined

                expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.updateUser(id, {})).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.updateUser(id, {})).to.throw(ValueError, 'id is empty')
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.updateUser(id, {})).to.throw(ValueError, 'id is empty')
            })
        })
    })


    // describe('add public note', () => {
    //     let user

    //     beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password) }))

    //     it('should succeed for existing user', async () => {
    //         const text = 'Hola, Mundo!'

    //         const res = await logic.addPublicNote(user.id, text)

    //         expect(res).to.be.undefined

    //         const notes = await Note.find()

    //         expect(notes).to.exist
    //         expect(notes).to.have.lengthOf(1)

    //         const [note] = notes

    //         expect(note.text).to.equal(text)
    //         expect(note.author.toString()).to.equal(user.id)
    //     })
    // })

    // describe('retrieve public notes', () => {
    //     let user, notes

    //     beforeEach(async () => {
    //         user = await User.create({ name, surname, email, password: await argon2.hash(password) })

    //         const texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)

    //         notes = []

    //         await Promise.all(texts.map(async text => notes.push(await Note.create({ text, author: user.id }))))
    //     })

    //     it('should succeed for existing user', async () => {
    //         const _notes = await logic.retrievePublicNotes(user.id)

    //         expect(_notes).to.exist
    //         expect(_notes).to.have.lengthOf(notes.length)

    //         _notes.forEach(note => {
    //             expect(note._id).to.be.undefined
    //             expect(note.id).to.exist
    //             expect(note.id).to.be.a('string')

    //             expect(note.text).to.exist
    //             expect(note.text).to.be.a('string')
    //             const _note = notes.find(_note => _note.id === note.id)
    //             expect(note.text).to.equal(_note.text)

    //             expect(note.date).to.exist
    //             expect(note.date).to.be.instanceOf(Date)

    //             expect(note.author).to.be.an('object')
    //             expect(note.author.id).to.be.a('string')
    //             expect(note.author.name).to.be.a('string')
    //         })
    //     })
    // })


    // describe('retrieve all public notes', () => {
    //     let user, user2, notes, notes2

    //     beforeEach(async () => {
    //         user = await User.create({ name, surname, email, password: await argon2.hash(password) })
    //         user2 = await User.create({ name, surname, email: `${Math.random()}-${email}`, password: await argon2.hash(password) })

    //         let texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)

    //         notes = []

    //         await Promise.all(texts.map(async text => notes.push(await Note.create({ text, author: user.id }))))

    //         texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)

    //         notes2 = []

    //         await Promise.all(texts.map(async text => notes2.push(await Note.create({ text, author: user2.id }))))
    //     })

    //     it('should succeed for existing user', async () => {
    //         const _notes = await logic.retrieveAllPublicNotes()

    //         expect(_notes).to.exist
    //         expect(_notes).to.have.lengthOf(notes.length + notes2.length)

    //         _notes.forEach(note => {
    //             expect(note._id).to.be.undefined
    //             expect(note.id).to.exist
    //             expect(note.id).to.be.a('string')

    //             expect(note.text).to.exist
    //             expect(note.text).to.be.a('string')
    //             const _note = notes.find(_note => _note.id === note.id) || notes2.find(_note => _note.id === note.id)
    //             expect(note.text).to.equal(_note.text)

    //             expect(note.date).to.exist
    //             expect(note.date).to.be.instanceOf(Date)

    //             expect(note.author).to.be.an('object')
    //             expect(note.author.id).to.be.a('string')
    //             expect(note.author.name).to.be.a('string')

    //             expect(note.author.id).to.be.oneOf([user.id, user2.id])
    //         })

    //         expect(_notes.reduce((accum, { author }) => {
    //             accum[author.id]++

    //             return accum
    //         }, {
    //                 [user.id]: 0,
    //                 [user2.id]: 0
    //             })).to.deep.equal({
    //                 [user.id]: notes.length,
    //                 [user2.id]: notes2.length
    //             })
    //     })
    // })

    // describe('add private note', () => {
    //     let user

    //     beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password) }))

    //     it('should succeed on existing user', async () => {
    //         const text = 'Hola, Mundo!'

    //         const res = await logic.addPrivateNote(user.id, text)

    //         expect(res).to.be.undefined

    //         // const notes = await Note.find()
    //         const _user = await User.findById(user.id)

    //         const { notes } = _user

    //         expect(notes).to.exist
    //         expect(notes).to.have.lengthOf(1)

    //         const [note] = notes

    //         expect(note._id).to.exist

    //         expect(note.text).to.equal(text)

    //         expect(note.author.toString()).to.equal(user.id)
    //     })
    // })

    // describe('retrieve private notes', () => {
    //     let user

    //     beforeEach(async () => {
    //         user = await User.create({ name, surname, email, password: await argon2.hash(password) })

    //         const texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)

    //         user.notes = texts.map(text => new Note({ text, author: user.id }))

    //         await user.save()
    //     })

    //     it('should succeed for existing user', async () => {
    //         const _notes = await logic.retrievePrivateNotes(user.id)

    //         expect(_notes).to.exist
    //         expect(_notes).to.have.lengthOf(user.notes.length)

    //         _notes.forEach(note => {
    //             expect(note._id).to.be.undefined
    //             expect(note.id).to.exist
    //             expect(note.id).to.be.a('string')

    //             expect(note.text).to.exist
    //             expect(note.text).to.be.a('string')
    //             const _note = user.notes.find(_note => _note.id === note.id)
    //             expect(note.text).to.equal(_note.text)

    //             expect(note.date).to.exist
    //             expect(note.date).to.be.instanceOf(Date)

    //             expect(note.author).to.equal(user.id)
    //         })
    //     })

    // })
})