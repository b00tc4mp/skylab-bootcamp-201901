'use strict'

import logic from '.'
import homeSwappApi from '../api';
import expect from 'expect'


describe('logic', () => {

    describe('registerUser', () => {

        let email
        let username
        let password = '123'

        beforeEach(() => {

            email = `manolo${Math.random()}@hotmail.com`
            username = `ManoloSkywalker-${Math.random()}`

        })

        it('should succeed on correct data', () =>

            logic.registerUser(username, email, password, password)

                .then(id => { expect(id).toBeDefined() })
        )

        it('should fail on undefined username', () => {
            try {
                logic.registerUser(undefined, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined email', () => {
            try {
                logic.registerUser(username, undefined, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password', () => {
            try {
                logic.registerUser(username, email, undefined, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password confirmation', () => {
            try {
                logic.registerUser(username, email, password, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on already existing user', () =>
            logic.registerUser(username, email, password, password)

                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                })
        )

        it('should fail on empty username', () => {

            const username = ''

            try {
                logic.registerUser(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('username cannot be empty')
            }
        })

        it('should fail on empty email', () => {

            const email = ''

            try {
                logic.registerUser(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('email cannot be empty')
            }
        })


        it('should fail on empty email', () => {

            const email = ''

            try {
                logic.registerUser(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('email cannot be empty')
            }
        })


        it('should fail on empty password', () => {

            const password = ''

            try {
                logic.registerUser(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('password cannot be empty')
            }
        })

    })
    describe('loginUser', () => {

        let email
        let username
        let password = '123'

        beforeEach(() => {

            email = `manolo${Math.random()}@hotmail.com`
            username = `ManoloSkywalker-${Math.random()}`
            return homeSwappApi.registerUser(username, email, password, password)

        })

        it('should succeed on correct data', () =>

            logic.loginUser(email, password)

                .then(token => expect(token).toBeDefined())
        )

        it('should fail on undefined email', () => {
            try {
                logic.loginUser(undefined, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password', () => {
            try {
                logic.loginUser(email, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

    })

    describe('retrieveUser', () => {

        const email = `manolo${Math.random()}@hotmail.com`
        const username = `ManoloSkywalker-${Math.random()}`
        const password = '123'

        let _token;

        beforeEach(() =>

            homeSwappApi.registerUser(username, email, password, password)
                .then(() => homeSwappApi.authenticateUser(email, password))
                .then(token => {
                    _token = token
                    logic.setUserApiToken(_token)
                })

        )

        it('should succeed on correct data', () =>

            logic.retrieveUser()

                .then(({ id, myHouses, username, email }) => {

                    expect(id).toBeDefined()
                    expect(myHouses).toBeDefined()
                    expect(username).toBeDefined()
                    expect(email).toBeDefined()


                })
        )

    })


    describe('createHouse', () => {

        let email
        let username
        const password = '123'
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }
        let _token;

        beforeEach(() =>{
            email = `manolo${Math.random()}@hotmail.com`
            username = `ManoloSkywalker-${Math.random()}`

            return homeSwappApi.registerUser(username, email, password, password)
                .then(() => homeSwappApi.authenticateUser(email, password))
                .then(token => {
                    _token = token
                    logic.setUserApiToken(_token)
                })

            })

        it('should succeed on correct data', () =>

            logic.createHouse(_token, images, description, info, adress)
                .then((house) => expect(house._id).toBeDefined())


        )

        it('should fail on undefined token', () => {
            try {
                logic.createHouse(undefined, images, description, info, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined images', () => {
            try {
                logic.createHouse(_token, undefined, description, info, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not an array`)
            }
        })

        it('should fail on empty images', () => {
            try {
                logic.createHouse(_token, [], description, info, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('There must be at least one image')
            }
        })

        it('should fail on undefined description', () => {
            try {
                logic.createHouse(_token, images, undefined, info, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined info', () => {
            try {
                logic.createHouse(_token, images, description, undefined, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not an object`)
            }
        })

        it('should fail on undefined adress', () => {
            try {
                logic.createHouse(_token, images, description, info, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not an object`)
            }
        })

    })

    describe('retrieveHouse', () => {

        let email
        let username
        const password = '123'
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }
        let _token
        let houseId
        let userId

        beforeEach(() =>{
            email = `manolo${Math.random()}@hotmail.com`
            username = `ManoloSkywalker-${Math.random()}`

            return homeSwappApi.registerUser(username, email, password, password)
                .then(({id}) => {
                    userId=id

                   return homeSwappApi.authenticateUser(email, password)
                })
                .then(token => {
                    _token = token
                    logic.setUserApiToken(_token)
                    return homeSwappApi.createHouse(_token, images, description, info, adress)
                    .then(({_id})=>houseId=_id )


                    })
                

            })

        it('should succeed on correct data', () =>

            logic.retrieveHouse(_token, houseId)
                .then((house) =>{

                    expect(house._id).toBe(houseId)
                    expect(JSON.stringify(house.images) ).toBe(JSON.stringify(images) )
                    expect(house.description).toBe(description)
                    expect(JSON.stringify(house.info) ).toBe(JSON.stringify(info) )
                    expect(JSON.stringify(house.adress) ).toBe(JSON.stringify(adress) )
                    expect(house.ownerId).toBe(userId)

                }) 

        )

        it('should fail on undefined token', () => {
            try {
                logic.retrieveHouse(undefined,houseId)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })
        it('should fail on undefined houseId', () => {
            try {
                logic.retrieveHouse(_token,undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })
       
    })

    describe('updateHouse', () => {

        let email
        let username
        const password = '123'
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }
        let _token
        let houseId
        let userId

        beforeEach(() =>{
            email = `manolo${Math.random()}@hotmail.com`
            username = `ManoloSkywalker-${Math.random()}`

            return homeSwappApi.registerUser(username, email, password, password)
                .then(({id}) => {
                    userId=id

                   return homeSwappApi.authenticateUser(email, password)
                })
                .then(token => {
                    _token = token
                    logic.setUserApiToken(_token)
                    return homeSwappApi.createHouse(_token, images, description, info, adress)
                    .then(({_id})=>houseId=_id )


                    })
                

            })

        it('should succeed on correct data', () =>

            logic.updateHouse(_token, houseId,images, 'yeah baby', info, adress)
                .then((house) =>{

                    expect(house._id).toBe(houseId)
                    expect(JSON.stringify(house.images) ).toBe(JSON.stringify(images) )
                    expect(house.description).toBe('yeah baby')
                    expect(JSON.stringify(house.info) ).toBe(JSON.stringify(info) )
                    expect(JSON.stringify(house.adress) ).toBe(JSON.stringify(adress) )
                    expect(house.ownerId).toBe(userId)

                }) 

        )

        it('should fail on undefined token', () => {
            try {
                logic.updateHouse(undefined, houseId,images, 'yeah baby', info, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })
        it('should fail on undefined houseId', () => {
            try {
                logic.updateHouse(_token, undefined,images, 'yeah baby', info, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined images', () => {
            try {
                logic.updateHouse(_token, houseId,undefined, 'yeah baby', info, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not an array`)
            }
        })

        it('should fail on empty images', () => {
            try {
                logic.updateHouse(_token, houseId,[], 'yeah baby', info, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('There must be at least one image')
            }
        })

        it('should fail on undefined description', () => {
            try {
                logic.updateHouse(_token, houseId,images, undefined, info, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })
       

        it('should fail on undefined info', () => {
            try {
                logic.updateHouse(_token, houseId,images, 'yeah baby', undefined, adress)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not an object`)
            }
        })

        it('should fail on undefined adress', () => {
            try {
                logic.updateHouse(_token, houseId,images, 'yeah baby', info, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not an object`)
            }
        })

    })



    describe('deleteHouse', () => {

        let email
        let username
        const password = '123'
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }
        let _token
        let houseId
        let userId

        beforeEach(() =>{
            email = `manolo${Math.random()}@hotmail.com`
            username = `ManoloSkywalker-${Math.random()}`

            return homeSwappApi.registerUser(username, email, password, password)
                .then(({id}) => {
                    userId=id

                   return homeSwappApi.authenticateUser(email, password)
                })
                .then(token => {
                    _token = token
                    logic.setUserApiToken(_token)
                    return homeSwappApi.createHouse(_token, images, description, info, adress)
                    .then(({_id})=>houseId=_id )


                    })
                

            })

        it('should succeed on correct data', () =>

            logic.deleteHouse(_token, houseId)
                .then((user) =>{

                    expect(user.myHouses.length).toBe(0)
                    

                }) 

        )

        it('should fail on undefined token', () => {
            try {
                logic.deleteHouse(undefined,houseId)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })
        it('should fail on undefined houseId', () => {
            try {
                logic.deleteHouse(_token,undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })
       
    })

})