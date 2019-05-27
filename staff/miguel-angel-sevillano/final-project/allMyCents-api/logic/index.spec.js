require('dotenv').config()
const expect = require('chai').expect
const logic = require('.')
const { LogicError, RequirementError, ValueError, FormatError } = require('../common/errors')
require('../common/utils/object-matches.polyfill')
require('../common/utils/array-random.polyfill')
let mongoose = require('mongoose');
const { User, Item } = require('../data/models')

const { env: { MONGO_URL_LOGIC_TEST: url } } = process


describe('logic', () => {


    before(() => mongoose.connect(url, { useNewUrlParser: true }))

    const name = 'Miguel'
    const surname = 'Sevillano'
    let email
    const password = '123'

    beforeEach(async () => {

        await User.deleteMany()
        await Item.deleteMany()
        email = `MiguelAngel-${Math.random()}@gmail.com`

    })

    describe('users', () => {

        describe('register user', () => {

            it('should succeed on correct user data', async () => {

                const res = await logic.registerUser(name, surname, email, password)

                expect(res).to.be.undefined

            })

            describe('on already existing user', () => {

                beforeEach(async () => await User.create({ name, surname, email, password }))

                it('should fail on retrying to register', async () => {

                    try {
                        await logic.registerUser(name, surname, email, password)

                        throw Error('should not reach this point')

                    } catch (error) {

                        expect(error).to.exist
                        expect(error).to.be.instanceOf(LogicError)
                        expect(error.message).to.equal(`user with email "${email}" already exists`)
                    }
                })
            })
        })

        describe('authenticate user', () => {

            beforeEach(async () => await User.create({ name, surname, email, password }))


            it('should succeed on correct user credential', async () => {

                const id = await logic.authenticateUser(email, password)

                expect(typeof id).to.be.a('string')
                expect(id.length).to.be.greaterThan(0)
            })

            it('should fail on non-existing user', async () => {

                try {
                    await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

                    throw Error('should not reach this point')
                } catch (error) {

                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal("non existing user")
                }
            })
        })

        describe('retrieve user', () => {

            let id

            beforeEach(async () => {

                const users = await User.create({ name, surname, email, password })
                id = users.id

            })

            it('should succeed on correct user id from existing user', async () => {

                const user = await logic.retrieveUser(id)

                expect(user.id).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

            })

            it('should fail on unexisting user id', async () => {

                id = '01234567890123456789abcd'

                try {
                    await logic.retrieveUser(id)
                    throw new Error('should not reach this point')
                } catch (error) {

                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id "${id}" does not exist`)
                }
            })
        })

        describe('update user', () => {
            let id
            let updateInfo = {}

            beforeEach(async () => {

                const users = await User.create({ name, surname, email, password })
                id = users.id

                updateInfo = { name: "jose" }

            })

            it('should succed updating user data', async () => {

                await logic.updateUser(id, updateInfo)
                const user = await User.findById(id)
                expect(user.name).to.be.equal(updateInfo.name)
                expect(user.name).to.exist

            })

        })
        describe('delete user', () => {

            let id

            beforeEach(async () => {

                const users = await User.create({ name, surname, email, password })
                id = users.id

            })

            it('should succed deleting user', async () => {

                await logic.deleteUser(id)
                const user = await User.findById(id)
                expect(user).to.equal(null)

            })

        })

        describe('items', () => {
            let newItem

            beforeEach(async () => {

                const users = await User.create({ name, surname, email, password })
                id = users.id

                newItem = { text: `manzana${Math.random()}` }

            })

            it('should succeed adding an item', async () => {

                const item = await logic.addItem(newItem)

                expect(item).to.exist
                expect(item).to.have.length
                expect(item.text).to.equal(newItem.text)

            })


            it('should list all items', async () => {

                await Item.create(newItem)
                await Item.create(newItem)

                const list = await logic.listItems()

                expect(list).to.exist
                expect(list).to.have.length
                expect(list[1].text).to.be.a('string')

            })
        })

        describe('ticket', () => {
            let user
            let id
            let ticket
            let date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')



            beforeEach(async () => {
                user = await User.create({ name, surname, email, password })
                id = user.id

                ticket = ["pera", 1.55, "manzana", 3.20, date]

            })

            it('should succeed adding a private ticket', async () => {


                await logic.addPrivateTicket(id, ticket)
                const _user = await User.findById(id)

                expect(_user.tickets).to.exist
                expect(_user.tickets).to.have.lengthOf(1)
                expect(_user.tickets[0][0]).to.equal(ticket[0])
            })
            it('should succeed retriving a private ticket', async () => {

                await logic.addPrivateTicket(id, ticket)
                await logic.addPrivateTicket(id, ticket)
                const user = await User.findById(id)

                expect(user.tickets[0][0]).to.equal(ticket[0])
                expect(user.tickets[1][0]).to.equal(ticket[0])

                const rTicket = await logic.retrivePrivateTicket(id, 0)

                expect(rTicket).to.exist
                expect(rTicket[0]).to.equal(ticket[0])
            })

            it('should succeed removing a private ticket', async () => {

                await logic.addPrivateTicket(id, ticket)
                await logic.addPrivateTicket(id, ticket)
                const user = await User.findById(id)

                expect(user.tickets[0][0]).to.equal(ticket[0])
                expect(user.tickets[1][0]).to.equal(ticket[0])

                await logic.removePrivateTicket(id, 0)
                const _user = await User.findById(id)

                expect(_user.tickets[0]).to.exist
                expect(_user.tickets[0][0]).to.equal(ticket[0])
            })
            it('should succeed removing all private tickets', async () => {

                await logic.addPrivateTicket(id, ticket)
                await logic.addPrivateTicket(id, ticket)
                const user = await User.findById(id)

                expect(user.tickets[0][0]).to.equal(ticket[0])
                expect(user.tickets[1][0]).to.equal(ticket[0])

                await logic.removeAllPrivateTickets(id, 0)
                const _user = await User.findById(id)

                expect(_user.tickets).to.have.lengthOf(0)
            })

            it('should succeed retriving ticket by range of dates', async () => {


                let position = ticket.length - 1

                await logic.addPrivateTicket(id, ["notShow", "2019/03/10"])
                await logic.addPrivateTicket(id, ["fecha1", "2019/04/20"])
                await logic.addPrivateTicket(id, ["fecha2", "2019/04/25"])
                await logic.addPrivateTicket(id, ["fecha3", "2019/05/21"])
                await logic.addPrivateTicket(id, ["fecha4", "2019/05/27"])
                await logic.addPrivateTicket(id, ["notShow", "2019/05/30"])


                const tickets = await logic.retrivePrivateTicketsByDates(id, "2019/04/20", "2019/05/27")
                 
                expect(tickets[0]).to.be.a(["fecha1", "2019/04/20"])
                expect(tickets[1]).to.be.a(["fecha2", "2019/04/25"])
                expect(tickets[2]).to.be.a(["fecha3", "2019/05/21"])
                expect(tickets[3]).to.be.a(["fecha4", "2019/05/27"])
                
                




            })
        })


    })



    after(() => mongoose.disconnect())


})