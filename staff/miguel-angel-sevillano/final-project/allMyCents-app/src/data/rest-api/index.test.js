require('dotenv').config()
const expect = require('chai').expect
const bcrypt = require('bcryptjs');
const restApi = require('.')
const { errors: { LogicError } } = require('allMyCents-utils')


const { models: { User, Ticket, Item }, mongoose } = require("allMyCents-data")



describe('restApi', () => {

    before(() => mongoose.connect("mongodb://localhost/user-api-test", { useNewUrlParser: true }))

    const name = 'Miguel'
    const surname = 'Sevillano'
    let email
    const password = '123'
    let cryptPass = bcrypt.hashSync(password, 8)



    beforeEach(async () => {
        await User.deleteMany()

        email = `MiguelAngel-${Math.random()}@gmail.com`

    })

    describe('users', () => {

        describe('register user', () => {

            it('should succeed on correct user data', async () => {


                const res = await restApi.registerUser(name, surname, email, password)

                expect(res.message).to.equal('Ok, user registered.')

            })
        })

        describe('on already existing user', () => {

            beforeEach(async () => await User.create({ name, surname, email, password: cryptPass }))

            it('should fail on retrying to register', async () => {

                try {
                    return await restApi.registerUser(name, surname, email, password)


                } catch (error) {
                    debugger
                    expect(error).to.exist
                    expect(error).to.equal(`user with email "${email}" already exists`)
                }
            })
        })

        describe('authenticate user', () => {


            beforeEach(async () => await User.create({ name, surname, email, password: cryptPass }))

            it('should succeed on correct user credential', async () => {

                const { token } = await restApi.authenticate(email, password)

                expect(typeof token).to.be.a('string')
                expect(token.length).to.be.greaterThan(1)

            })

            it('should fail on non-existing user', async () => {

                try {
                    await restApi.authenticate(email = 'unexisting-user@mail.com', password)

                    throw Error('should not reach this point')
                } catch (error) {

                    expect(error).to.exist
                    expect(error).to.equal("wrong credentials")
                }
            })
        })

        describe('retrieve user', () => {

            let _token

            beforeEach(async () => {
                await User.create({ name, surname, email, password: cryptPass })
                const { token } = await restApi.authenticate(email, password)
                _token = token
            })

            it('should succeed on correct user token from existing user', async () => {

                const user = await restApi.retrieveUser(_token)


                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

            })

            it('should fail on invalid token', async () => {

                _token = '01234567890123456789abcd'

                try {
                    await restApi.retrieveUser(_token)
                    throw new Error('should not reach this point')
                } catch (error) {

                    expect(error).to.exist
                    expect(error).to.equal(`Invalid token`)
                }
            })
        })

        describe('update user', () => {
            let _token
            let updateInfo = {}

            beforeEach(async () => {

                await User.create({ name, surname, email, password: cryptPass })
                const { token } = await restApi.authenticate(email, password)
                _token = token

                updateInfo = { name: "jose" }

            })

            it('should succed updating user data', async () => {

                const response = await restApi.updateUser(_token, updateInfo)

                expect(response).to.be.equal("User succesfully updated")

                const user = await restApi.retrieveUser(_token)

                expect(user.name).to.be.equal(updateInfo.name)

            })

        })
        describe('delete user', () => {

            let _token

            beforeEach(async () => {

                await User.create({ name, surname, email, password: cryptPass })
                const { token } = await restApi.authenticate(email, password)
                _token = token

            })

            it('should succed deleting user', async () => {

                const res = await restApi.deleteUser(_token)

                expect(res).to.equal("User succesfully deleted")

                try {
                    await restApi.retrieveUser(_token)
                } catch (error) {
                    expect(error).to.be.equal("User not found")
                }
            })

        })

        describe('ticket', () => {

            let _token
            let ticket_1 = [{ name: 'manzana', Euro: 1.65 }, { name: 'pera', Euro: 2.75 }]
            let ticket_2 = [{ name: 'platano', Euro: 7.65 }, { name: 'naranja', Euro: 4.75 }]


            beforeEach(async () => {


                const { id } = await User.create({ name, surname, email, password: cryptPass })

                const user = await User.findById(id)

                const { tickets } = user
                tickets.push(new Ticket({ date: "2019/04/01", items: ticket_1 }))
                tickets.push(new Ticket({ date: "2019/05/01", items: ticket_1 }))
                tickets.push(new Ticket({ date: "2019/05/31", items: ticket_1 }))

                await user.save()

                const { token } = await restApi.authenticate(email, password)
                _token = token
            })

            it('should succeed adding a private ticket', async () => {


                const res = await restApi.addPrivateTicket(_token, ticket_1)
                expect(res).to.equal("Ticket succesfully added")
                const { tickets } = await restApi.retrieveUser(_token)


                expect(tickets).to.have.lengthOf(4)
                expect(tickets[3].items[0].name).to.be.equal(ticket_1[0].name)
            })

            it('should succeed updating a private ticket', async () => {


                await restApi.addPrivateTicket(_token, ticket_1)

                const { tickets } = await restApi.retrieveUser(_token)

                let ticketId = tickets[3]._id.toString()
                let data = { name: "VENTILADOR" }
                let position = "1"

                await restApi.updatePrivateTicket(_token, ticketId, data, position)

                const user = await restApi.retrieveUser(_token)
                const { items } = user.tickets[3]

                expect(items).to.exist
                expect(items).to.have.lengthOf(2)

                expect(items[0].name).to.equal(ticket_1[0].name)
                expect(items[1].name).to.equal(data.name)
            })
            it('should succeed retriving a private ticket', async () => {

                await restApi.addPrivateTicket(_token, ticket_1)

                const { tickets } = await restApi.retrieveUser(_token)

                let fTicketId = tickets[3]._id

                const fTicket = await restApi.retrievePrivateTicket(_token, fTicketId)

                const { items } = fTicket

                expect(fTicket).to.exist
                expect(items).to.have.lengthOf(2)
                expect(items[0].name).to.equal(ticket_1[0].name)
                expect(items[1].price).to.equal(ticket_1[0].price)

            })

            it('should succed listing all tickets', async () => {


                await restApi.addPrivateTicket(_token, ticket_1)
                await restApi.addPrivateTicket(_token, ticket_2)

                const tickets = await restApi.listPrivateTickets(_token)

                expect(tickets).to.exist
                expect(tickets).to.have.lengthOf(5)

            })

            it('should succeed removing a private ticket', async () => {

                await restApi.addPrivateTicket(_token, ticket_1)

                const user = await restApi.retrieveUser(_token)
                const { tickets } = user

                let ticketId = tickets[3]._id

                const response = await restApi.removePrivateTicket(_token, ticketId)
                expect(response).to.be.equal("ticket succesfully deleted")
                const _user = await restApi.retrieveUser(_token)

                expect(_user.tickets).to.have.lengthOf(3)


            })
            it('should succeed removing all private tickets', async () => {

                await restApi.addPrivateTicket(_token, ticket_1)
                await restApi.addPrivateTicket(_token, ticket_2)

                const tickets = await restApi.listPrivateTickets(_token)

                expect(tickets).to.have.lengthOf(5)

                const response = await restApi.removeAllPrivateTickets(_token)

                expect(response).to.be.equal("all tickets succesfully removed")

                const user = await restApi.retrieveUser(_token)


                expect(user.tickets).to.be.deep.equal([])

            })

            it('should succeed retriving ticket by range of dates', async () => {

                const tickets = await restApi.retrivePrivateTicketsByDates(_token, { init: "2019/04/01", end: "2019/05/31" })

                expect(tickets[0].date).to.equal("2019/04/01")
                expect(tickets[1].date).to.equal("2019/05/01")
                expect(tickets[2].date).to.equal("2019/05/31")

            })

            it('should succeed retriving ticket by a month', async () => {



                const tickets = await restApi.retrivePrivateTicketsByDates(_token, { month: "2019/05" })

                expect(tickets[0].month).to.equal("2019/05")
                expect(tickets[1].month).to.equal("2019/05")


            })

            it('should succeed retriving ticket by a day', async () => {


                const tickets = await restApi.retrivePrivateTicketsByDates(_token, { day: "2019/05/31" })

                expect(tickets[0].date).to.equal("2019/05/31")


            })
        })

        describe("products", () => {

            let id
            let ticket = [{ name: 'detergente', Euro: 1.65 },
            { name: 'pera', Euro: 2.75 },
            { name: 'detergente', Euro: 1.65 },
            { name: 'pera', Euro: 2.75 }]

            beforeEach(async () => {

                await User.create({ name, surname, email, password: cryptPass })
                const { token } = await restApi.authenticate(email, password)
                _token = token

                await restApi.addPrivateTicket(_token, ticket)
            })

            it("sould retrivie all spent amount of an specified product", async () => {

                const product = "pera"
                const amount = await restApi.retrieveAmountByProdcut(_token, product)

                expect(amount).to.exist
                expect(amount).to.be.equal(5.5)

            })

            it("sould return product name and amount by category ", async () => {

                const category = "frutas"
                const products = await restApi.retrieveByCategory(_token, category)

                expect(products[0]).to.exist
                expect(products[0].name).to.be.equal("pera")
                expect(products[0].Euro).to.be.equal(5.5)

            })

        })


        describe('items', () => {
       

            it('should list all items', async () => {

                const list = await restApi.listItems()

                expect(list).to.exist
                expect(list).to.have.length
                expect(list[1].text).to.be.a('string')

            })
        })

        describe("alerts", () => {

            let _token
            let alert = { name: "platano", maxValue: 100 }
            let id

            beforeEach(async () => {


                const user = await User.create({ name, surname, email, password: cryptPass })
                id = user._id
                const { token } = await restApi.authenticate(email, password)
                _token = token
            })


            it('should succeed adding an alert', async () => {


                const response = await restApi.addAlert(_token, alert)

                expect(response).to.be.equal("Alert succesfully added")

                const _user = await restApi.retrieveUser(_token)
                const { alerts } = _user

                expect(alerts).to.exist
                expect(alerts).to.have.lengthOf(1)
                expect(alerts[0].name).to.equal(alert.name)

            })

            it('should fail adding an alert if item dont exist', async () => {


                try {
                    await restApi.addAlert(_token, { name: "PINCHOS", maxValue: 300 })
                } catch (err) { expect(err).to.equal('PINCHOS dont exist') }

            })

            it('should fail adding an alert that already exist', async () => {


                try {
                    await restApi.addAlert(_token, alert)
                    await restApi.addAlert(_token, alert)

                } catch (err) { expect(err).to.equal('Alert already added') }

            })


            it('should succeed deleting an alert', async () => {


                await restApi.addAlert(_token, alert)

                const user = await restApi.retrieveUser(_token)
                const { alerts } = user

                let alertId = alerts[0]._id.toString()

                const response = await restApi.deleteAlert(_token, alertId)

                expect(response).to.be.equal("Alert succesfully deleted")

                const _user = await restApi.retrieveUser(_token)
                const { alerts: _alerts } = _user

                expect(_alerts).to.exist
                expect(_alerts).to.have.lengthOf(0)

            })

            it('should succeed deleting all alerts', async () => {


                await restApi.addAlert(_token, alert)
                const response = await restApi.deleteAllAlerts(_token)


                expect(response).to.be.equal("Alerts succesfully deleted")

                const { alerts } = await restApi.retrieveUser(_token)

                expect(alerts).to.have.lengthOf(0)

            })

            it('should succeed editing an alert', async () => {


                await restApi.addAlert(_token, alert)

                const user = await restApi.retrieveUser(_token)
                const { alerts } = user

                let alertId = alerts[0]._id.toString()

                let data = { maxValue: 300 }

                const response = await restApi.edditAlert(_token, alertId, data)

                expect(response).to.be.equal("Alert succesfully updated")

                const _user = await restApi.retrieveUser(_token)
                const { alerts: _alerts } = _user

                expect(_alerts).to.exist
                expect(_alerts).to.have.lengthOf(1)
                expect(_alerts[0].maxValue).to.equal(data.maxValue)

            })



            it('should succeed listing all alerts', async () => {


                await restApi.addAlert(_token, alert)
                await restApi.listAlerts(_token)
                const { alerts } = await restApi.retrieveUser(_token)

                expect(alerts).to.exist
                expect(alerts).to.have.lengthOf(1)
                expect(alerts[0].maxValue).to.equal(alert.maxValue)

            })


        })


    })

    

    after(() => mongoose.disconnect())


})