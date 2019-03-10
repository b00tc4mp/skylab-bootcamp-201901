'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
const users = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('user', () => {
    let client

    before(() =>
        MongoClient.connect(DB_URL, { useNewUrlParser: true })
            .then(_client => {
                client = _client
                users.collection = client.db().collection('users')
            })
    )

    beforeEach(() => users.collection.deleteMany())

    describe('add', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        it('should succeed on correct data', () =>
            users.add(_user)
                .then(id => {
                    expect(id).to.exist
                    expect(id).to.be.a('string')
                    return users.collection.findOne({ _id: ObjectId(id) })
                })
                .then(({ name, surname, email, password }) => {
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )
        
        // const _userArray = [{
        //     name: 'Tachi',
        //     surname: 'Melodin',
        //     email: 'tachito',
        //     password: 'meguhtalagasssolina'
        // }]

        // it('should fail using an array instead of object', () => {
        //     try {
        //         return users.add(_userArray)

        //     } catch (error) {
        //         expect(error).to.exists
        //         expect(error.message).to.equal(`${_userArray} is not an object`)
        //     }
        // })
    })

    describe('findByEmail', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        beforeEach( () => users.collection.insertOne(_user))

        it('should succeed on get user per email', () => { 
            return users.findByEmail(_user.email)
                .then(({ _id, id, name, surname, email, password }) => {
                    expect(id).to.exist
                    expect(_id).not.to.exist

                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        })

        it('should return null on non matching email', () => {
            users.findByEmail('unknown@mail.com')
                .then(res => expect(res).to.be.null)
        })
    })

    describe('findById', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        beforeEach( () => 
            users.collection.insertOne(_user)
              .then( ({ insertedId }) => _user._id = insertedId.toString() )
        
        )

        it('should succeed on get user per id', () => { 
            return users.findById(_user._id)
                .then(({ _id, id, name, surname, email, password }) => {
                    expect(id).to.exist
                    expect(typeof id).to.equal('string')
                    expect(_id).not.to.exist
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        })

        it('should resolve null on non existing id', () => 
            users.findById('5c71253fd90d0322f4e61ba5')
            .then(user => expect(user).to.be.null)
        )
    })

    describe('update', () => {
        const _user = {
            name: `Tachii-${Math.random()}` ,
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        beforeEach( () => 
            users.collection.insertOne(_user)
            .then( ({ insertedId }) => {
                _user.id = insertedId.toString()
            })
        )

        it('should succeed on creates a new field inside an existing user', () => {
            _user.someExtraData = ['hello', 'world']
            return users.update(_user)
                .then( () => users.collection.findOne({ _id: ObjectId(_user.id) }) )
                .then(({ _id, name, surname, email, password, someExtraData }) => {
                    expect(_id.toString()).to.equal(_user.id)
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                    expect(someExtraData).to.deep.equal(_user.someExtraData)
                })
        })

        it('should succeed on update an existing field on user', () => {
            _user.name = 'newName'
            return users.update(_user)
                .then( () => users.collection.findOne({ _id: ObjectId(_user.id) }) )
                .then(({ _id, name, surname, email, password, age }) => {
                    expect(_id.toString()).to.equal(_user.id)
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        })
    })

    after( () => users.collection.deleteMany()
                   .then(() => client.close() 
    ))
})