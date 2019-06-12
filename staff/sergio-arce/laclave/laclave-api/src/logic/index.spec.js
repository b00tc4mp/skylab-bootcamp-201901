const { expect } = require('chai')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const tokenHelper = require('../routes/middleware/token-helper')
const logic = require('../logic')

const { User } = require('../models')


describe('logic', () => {

    before(() => mongoose.connect('mongodb://localhost/laclave-test', { useNewUrlParser: true }))

    describe('registerUser', () => {
        describe('registerUser - CORRECT', () => {

            it('should thrown an error when user already exist', () => {
                const name = 'sergio'
                const username = 'sergio'
                const email = `sergio${Math.random()}@sergio.com`
                const password = '123456'

                return logic.registerUser(name, username, email, password)
                        .then(userId => {
                           
                            return User.findOne({email})
                                    .then(user => {
                                        expect(user.name).to.equal(name)
                                        expect(user.username).to.equal(username)
                                        expect(user.email).to.equal(email)
                                        return bcrypt.compare(password, user.password)
                                            .then(match => expect(match).to.be.true)
                                    })
                        })
                        .catch(error => expect(error).to.be.undefined)
 
            })
            
        })

        describe('registerUser - ERRORS', () => {

            
            it('should thrown an error if user already exists', () => {

                const name = 'sergio'
                const username = 'sergio'
                const email = `sergio${Math.random()}@sergio.com`
                const password = '123456'

                return User.create({ name, username, email, password })
                        .then(userCreated => 
                            logic.registerUser(name, username, email, password)
                                .then(userId => {
                                    expect(userId).to.be.undefined
                                })
                                .catch(({ message }) => {
                                    expect(message).to.equal(`user already exists`)
                                })
                        )

            })

            it('should throw an error when the name is an array', () => {
                const name = []
                const username = 'michael'
                const email = 'sergio@gmail.com'
                const password = `123`

                expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'name is not a string')

            })

            it('should throw an error when the name is empty', () => {
                const name = ''
                const username = 'michael'
                const email = 'sergio@gmail.com'
                const password = `123`

                expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'name is empty')

            })

            it('should throw an error when the username is an array', () => {
                const name = 'sergio'
                const username = []
                const email = 'sergio@gmail.com'
                const password = `123`

                expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'username is not a string')

            })

            it('should throw an error when the username is empty', () => {
                const name = 'sergio'
                const username = ''
                const email = 'sergio@gmail.com'
                const password = `123`

                expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'username is empty')

            })

            it('should throw an error when the email is an array', () => {
                const name = 'sergio'
                const username = 'arce'
                const email = []
                const password = `123`

                expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'email is not a string')

            })

            it('should throw an error when the email is empty', () => {
                const name = 'sergio'
                const username = 'arce'
                const email = ''
                const password = `123`

                expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'email is empty')

            })

            it('should throw an error when the password is an array', () => {
                const name = 'sergio'
                const username = 'arce'
                const email = 'sergio@gmail.com'
                const password = []

                expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'password is not a string')

            })

            it('should throw an error when the password is empty', () => {
                const name = 'sergio'
                const username = 'arce'
                const email = 'sergio@gmail.com'
                const password = ''

                expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'password is empty')

            })

        })
    })

    describe('loginUser', () => {

        describe('loginUser - CORRECT', () => { 
            it('should succeed on correct credentials', () => {
                const name = 'sergio'
                const username = 'sergio'
                const email = `sergio${Math.random()}@sergio.com`
                const password = '123123123123'

                return bcrypt.hash(password, 10)
                    .then(hash => {
                        return User.create({ name, username, email, password: hash })
                            .then(userCreated => {
                                
                                return logic.loginUser(userCreated.email, password)
                                    .then(res => {
                                        expect(res).to.exist
                                        // expect(res.id).to.exist
                                        expect(res.token).to.exist
                                    })
                                    
                            })
                    })
            })


        })

        describe('loginUser - ERRORS', () => {

            it('should thrown an error when the user not exists', () => {

                const email = 'xxxx@xxxx.com'
                const password = '11111111'

                            return logic.loginUser(email, password)
                                .then()
                                .catch(error => {
                                    expect(error.message).to.equal('user not exists')
                                })
            })

            it('should throw an error when password is wrong', () => {

                const name = 'sergio'
                const username = 'sergio'
                const email = `sergio${Math.random()}@sergio.com`
                const password = '123123123123'

                return bcrypt.hash(password, 10)
                    .then(hash => {
                        return User.create({ name, username, email, password: hash })
                            .then(userCreated => {
                                
                                return logic.loginUser(userCreated.email, '123123123123aa')
                                    .then()
                                    .catch(error => {
                                        expect(error.message).to.equal('wrong credentials')
                                    })
                            })
                    })
            })

            
            it('should throw an error when the email is an array', () => {
                
                const email = []
                const password = '1233'

                expect(() => logic.loginUser(email, password)).to.throw(Error, 'email is not a string')
            })

            it('should throw an error when the email is empty', () => {
                
                const email = ''
                const password = '1233'

                expect(() => logic.loginUser(email, password)).to.throw(Error, 'email is empty')
            })

            it('should throw an error when the password is an array', () => {

                const email = 'sergio@gmai.com'
                const password = []

                expect(() => logic.loginUser(email, password)).to.throw(Error, 'password is not a string')
            })


            it('should throw an error when the password is empty', () => {
                
                const email = 'sergio@gmai.com'
                const password = ''

                expect(() => logic.loginUser(email, password)).to.throw(Error, 'password is empty')
            })






        })


    })

    describe('retrieveUser', () => {

        describe('retrieveUser - ERRORS', () => {

            it('should throw an error when the user not exists ', () => {

                const userId = '5ce159c70ef8035d9e86079d'

                return logic.retrieveUser(userId)
                    .then()
                    .catch(error => expect(error.message).to.equal('user not exists'))

            })

            it('should throw an error when the userId is an array', () => {

                const userId = []

                expect(() => logic.retrieveUser(userId)).to.throw(Error, 'is not a string')

            })

            it('should throw an error when the userId is a empty', () => {

                const userId = ''

                expect(() => logic.retrieveUser(userId)).to.throw(Error, 'userId is empty')
            })
        })
    })

    describe('updateUser', () => {


        it('should throw an error when the user not found', () => {
            const userId = '5cefbe0a5077690727cd6d88'
            const userData = {
                name: 'sergio',
                surname: 'arce'    
            }
            return logic.updateUser(userId, userData)

                    .then(result => expect(result).to.be.undefined)
                    .catch(error => {
                        expect(typeof error.message).to.equal('string')
                    })
        })


        it('should throw an error when the userId is an array', () => {

            const userId = []
            const userData = {
                name: 'sergio',
                surname: 'arce'    
            }
            expect(() => logic.updateUser(userId, userData)).to.throw(Error, 'userId is not a string')
        })

        it('should throw an error when the userId is empty', () => {

            const userId = ''
            const userData = {
                name: 'sergio',
                surname: 'arce'    
            }

            expect(() => logic.updateUser(userId, userData)).to.throw(Error, 'userId is empty')
        })

        it('should throw error when the userData is an array', () => {

            const userId = '342342342'
            const userData = []

            expect(() => logic.updateUser(userId, userData)).to.throw(Error, 'userData is not an object')
        })

    })

    describe('createCongress', () => {
        let name, username, email, password, userId, congressName, congressDes, congressCat, congressCity, congressStartDate, congressEndDate

        beforeEach(() => {
            name = 'sergio'
            username = 'sergio'
            email = `sergio${Math.random()}@sergio.com`
            password = '123123123123'

            congressName = `congress${Math.random()}`
            congressDes = `congress_description_${Math.random()}`
            congressCat = 'salsa'
            congressCity = `congress_city${Math.random()}`
            congressStartDate = Date.now()
            congressEndDate = Date.now()

            return bcrypt.hash(password, 10)
                .then(hash => {
                    return User.create({ name, username, email, password: hash })
                        .then(userCreated => {
                            
                            return logic.loginUser(userCreated.email, password)
                                .then(({ token }) => {

                                    userId = tokenHelper.verifyToken(token)

                                    // userId = token
                                })
                        })
                })
            

        })

        it('should succeed on correct data', () => {

            congressData = { name: congressName, description: congressDes, 
                category: congressCat, city: congressCity, startDate: congressStartDate, 
                endDate: congressEndDate  }
            
           
            return logic.createCongress(congressData, userId)
                .then(congress => {
                    debugger
                    expect(congress).to.exist
                    expect(congress.name).to.equal(congressName)
                })
        })

        it('should throw an error when the user not found', () => {
            const userId = '5cefbe0a5077690727cd6d80'

            congressData = { name: congressName, description: congressDes, category: congressCat, city: congressCity, startDate: congressStartDate, endDate: congressEndDate  }

            return logic.createCongress(congressData, userId)

                    .then(result => expect(result).to.be.undefined)
                    .catch(error => {
                        expect(typeof error.message).to.equal('string')
                    })
        })

        it('should throw error when congressData is an array', () => {

            const congressData = []


            expect(() => logic.createCongress(congressData)).to.throw(Error, `congressData is not an object`)
        })

        it('should throw error when userId is an array', () => { 

            
            const userId = []
            

            expect(() => logic.createCongress({}, userId)).to.throw(Error, 'userId is not a string')
        })
        
        it('should throw error when userId is empty', () => { 

            const userId = ''
        

            expect(() => logic.createCongress({}, userId)).to.throw(Error, 'userId is empty')
        })

        
    })

    


    
    describe('retrieveCongress', () => {
        let congressId

        beforeEach(() => {
            name = 'sergio'
            username = 'sergio'
            email = `sergio${Math.random()}@sergio.com`
            password = '123123123123'

            congressName = `congress${Math.random()}`
            congressDes = `congress_description_${Math.random()}`
            congressCat = 'salsa'
            congressCity = `congress_city${Math.random()}`
            congressStartDate = Date.now()
            congressEndDate = Date.now()
            congressData = { name: congressName, description: congressDes, category: congressCat, city: congressCity, startDate: congressStartDate, endDate: congressEndDate  }
            congressId
            return bcrypt.hash(password, 10)
                .then(hash => {
                    return User.create({ name, username, email, password: hash })
                        .then(userCreated => {
                            
                            return logic.loginUser(userCreated.email, password)
                                .then(({ token }) => {
                                    userId = tokenHelper.verifyToken(token)
                                    
                                    return logic.createCongress(congressData, userId)
                                        .then(congress => {
                                            congressId = congress.id.toString()
                                            
                                        })

                                    })
                        })
                })
            

        })


        it('should throw an error when the user not found', () => {
            const userId = '5cefbe0a5077690727cd6d80'
        
            return logic.retrieveCongress(congressId, userId)

                    .then(result => expect(result).to.be.undefined)
                    .catch(error => {
                        expect(typeof error.message).to.equal('string')
                    })
        })

        it('should succeed on correct congress id', () => {
            return logic.retrieveCongress(congressId, userId)
                .then(congress => {
                    expect(congress).to.exist
                    expect(congress._id.toString()).to.equal(congressId)
                })
        })


        it('should throw error when congressId is an array', () => {
            const congressId = []

            expect(() => logic.retrieveCongress(congressId)).to.throw(Error, 'congressId is not a string')
        })

        it('should throw error when congressId is empty', () => {
            const congressId = ''

            expect(() => logic.retrieveCongress(congressId)).to.throw(Error, 'congressId is empty')
        })

    })

    describe('updateCongress', () => {

        it('should throw an error when the congress not found', () => {

            const congressId = '5cefbe0a5077690727cd6d80'
            
            return logic.updateCongress(congressId, {})

                    .then(result => expect(result).to.be.undefined)
                    .catch(error => {
                        expect(typeof error.message).to.equal('string')
                    })
        })

        it('should throw error when congressId is an array', () => {
            const congressId = []
            const congressData = {
                name: "la negra salsa congress",
                price: 45
            }
            expect(() => logic.updateCongress(congressId, congressData)).to.throw(Error, 'congressId is not a string')
        })

        it('should throw error when congressId is empty', () => {
            const congressId = ''
            const congressData = {
                name: "la negra salsa congress",
                price: 45
            }

            expect(() => logic.updateCongress(congressId, congressData)).to.throw(Error, 'congressId is empty')
        })

        it('should throw error when the congressData is an array', () => {

            const congressId = '342342342'
            const congressData = []

            expect(() => logic.updateCongress(congressId, congressData)).to.throw(Error, 'congressData is not an object')
        })

    })

    describe('deleteCongress', () => {

        it('should throw an error when the congress not found', () => {

            const congressId = '5cefbe0a5077690727cd6d80'
            
            return logic.deleteCongress(congressId)

                    .then(result => expect(result).to.be.undefined)
                    .catch(error => {
                        expect(typeof error.message).to.equal('string')
                    })
        })


        it('should throw error when the congressId is an array',  () => {
            const congressId = []
            expect(() => logic.deleteCongress(congressId)).to.throw(Error, 'congressId is not a string')
        })

        it('should throw error when the congressId is empty',  () => {
            const congressId = ''
            expect(() => logic.deleteCongress(congressId)).to.throw(Error, 'congressId is empty')
        })

    })

    describe('searchCongresses', () => {


        it('should throw error when the query is an array',  () => {
            const query = []
            expect(() => logic.searchCongresses(query)).to.throw(Error, 'query is not a string')
        })

        it('should throw error when the query is empty',  () => {
            const query = ''
            expect(() => logic.searchCongresses(query)).to.throw(Error, 'query is empty')
        })

    })

    describe('ARTISTS', () => {

        describe('createArtist', () => {

            it('should throw error when artistData is an array', () => {

                const artistData = []
    
    
                expect(() => logic.createArtist(artistData)).to.throw(Error, `artistData is not an object`)
            })

            it('should throw error when userId is an array', () => {
                const userId = []
    
                expect(() => logic.createArtist({}, userId)).to.throw(Error, 'userId is not a string')
            })
    
            it('should throw error when userId is empty', () => {
                const userId = ''
    
                expect(() => logic.createArtist({}, userId)).to.throw(Error, 'userId is empty')
            })

        })

        describe('retrieveArtist', () => {

            it('should thrown error if artist not exist', () => {

                const artistId = '5cefbe0a5077690727cd6d80'
                
                return logic.retrieveArtist(artistId)
    
                        .then(result => expect(result).to.be.undefined)
                        .catch(error => {
                            expect(typeof error.message).to.equal('string')
                        })
            })

            it('should throw error when the artistId is an array',  () => {

                const artistId = []

                expect(() => logic.retrieveArtist(artistId)).to.throw(Error, 'artistId is not a string')
            })
    
            it('should throw error when the artistId is empty',  () => {

                const artistId = ''

                expect(() => logic.retrieveArtist(artistId)).to.throw(Error, 'artistId is empty')
            })
    
        })

        describe('searchArtists', () => {

            it('should throw error when the query is an array',  () => {

                const query = []

                expect(() => logic.searchArtists(query)).to.throw(Error, 'query is not a string')
            })
    
            it('should throw error when the query is empty',  () => {

                const query = ''

                expect(() => logic.searchArtists(query)).to.throw(Error, 'query is empty')
            })
    
        })

        describe('searchItems', () => {

            it('should throw error when the query is an array',  () => {

                const query = []

                expect(() => logic.searchItems(query)).to.throw(Error, 'query is not a string')
            })
    
            it('should throw error when the query is empty',  () => {

                const query = ''

                expect(() => logic.searchItems(query)).to.throw(Error, 'query is empty')
            })
    
        })

        describe('listArtists', () => {

            it('should succeed when the artists is an array',  () => {

                const artists = []
                return logic.listArtists()
                    .then(artists => expect(artists).to.exist )
    
            })
        })

        describe('toggleFav', () => {

            it('should throw error when userId is an array', () => {
                const userId = []
                const itemId = '5cefbe0a5077690727cd6d84'
    
                expect(() => logic.toggleFav(userId, itemId)).to.throw(Error, 'userId is not a string')
            })
    
            it('should throw error when userId is empty', () => {
                const userId = ''
                const itemId = '5cefbe0a5077690727cd6d80'
    
                expect(() => logic.toggleFav(userId, itemId)).to.throw(Error, 'userId is empty')
            })
           

            it('should throw error when itemId is an array', () => {
                const userId = '5cefbe0a5077690727cd6d80'
                const itemId = []
    
                expect(() => logic.toggleFav(userId, itemId)).to.throw(Error, 'itemId is not a string')
            })
    
            it('should throw error when itemId is empty', () => {
                const userId = '5cefbe0a5077690727cd6d80'
                const itemId = ''
    
                expect(() => logic.toggleFav(userId, itemId)).to.throw(Error, 'itemId is empty')
            })

           
        })

        describe('toggleFav', () => {

            it('should throw error when id is an array', () => {

                const id = []
    
                expect(() => logic.itemDetail(id)).to.throw(Error, 'id is not a string')
            })
    
            it('should throw error when id is empty', () => {

                const id = ''
    
                expect(() => logic.itemDetail(id)).to.throw(Error, 'id is empty')
            })
        
        })
    })

    after(() => {
    
        mongoose.disconnect()
    })
})