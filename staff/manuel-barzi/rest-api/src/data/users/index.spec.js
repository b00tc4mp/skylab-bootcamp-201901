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
            email: 'tachito@mail.com',
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
    })

    describe('find by email', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito@mail.com',
            password: 'meguhtalagasssolina'
        }

        beforeEach(() => users.collection.insertOne(_user))

        it('should succeed on correct data', () =>
            users.findByEmail(_user.email)
                .then(({ id, _id, name, surname, email, password }) => {
                    expect(id).to.exist
                    expect(id).to.be.a('string')
                    expect(_id).not.to.exist
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )

        it('should resolve null on non matching email', () =>
            users.findByEmail('unknown@mail.com')
                .then(user => expect(user).to.be.null)
        )
    })

    after(() =>
        users.collection.deleteMany()
            .then(() => client.close())
    )
})