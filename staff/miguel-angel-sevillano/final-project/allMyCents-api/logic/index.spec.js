require('dotenv').config()
const bcrypt = require('bcryptjs');
const expect = require('chai').expect
const logic = require('.')
const { errors: { LogicError } } = require('allMyCents-utils')
const { models: { User, Item, Ticket, alert }, mongoose } = require('allMyCents-data')

const { env: { MONGO_URL_USER_API_TEST: url } } = process


describe('logic', () => {


    before(() => mongoose.connect(url, { useNewUrlParser: true }))

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

                const res = await logic.registerUser(name, surname, email, password)

                expect(res).to.be.equal("User succesfully registered")

            })


            it('should fail if email format is wrong', async () => {

                try {

                    const res = await logic.registerUser(name, surname, "noEmail", password)
                } catch (error) {

                    expect(error.message).to.be.equal("noEmail is not an e-mail")

                }



            })

            describe('on already existing user', () => {

                beforeEach(async () => await User.create({ name, surname, email, password }))

                it('should fail on retrying to register', async () => {

                    try {
                        await logic.registerUser(name, surname, email, password)
                        /* istanbul ignore next */
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


            beforeEach(async () => {
                await User.create({ name, surname, email, password: cryptPass })
            })


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
                    expect(error.message).to.equal("Unexisting user")
                }
            })
            it('should fail if password is incorrect', async () => {

                try {
                    await logic.authenticateUser(email, "dkdjflksjdlkfksd")

                    throw Error('should not reach this point')
                } catch (error) {


                    expect(error.message).to.equal("wrong credentials")
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
                    expect(error.message).to.equal('user with id 01234567890123456789abcd does not exist')
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


            it('should fail on unexisting user', async () => {

                const wrongId = "dhfkldslkfsd"

                try {
                    await logic.updateUser(wrongId, updateInfo)

                } catch (error) {
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                }

            })

            it('should fail email format is  wrong', async () => {

                try {
                    await logic.updateUser(id, { email: "mash#mash" })
                } catch (error) {
                    expect(error.message).to.be.equal('mash#mash is not an e-mail')
                }

            })

            it('should fail if email already exist', async () => {

                try {
                    await logic.updateUser(id, { email: email })
                } catch (error) {
                    expect(error.message).to.be.equal(`email ${email} already registered`)
                }

            })

        })
        describe('delete user', () => {

            let id

            beforeEach(async () => {

                const users = await User.create({ name, surname, email, password })
                id = users.id

            })

            it('should succed deleting user', async () => {

                const response = await logic.deleteUser(id)

                expect(response).to.equal("User succesfully deleted")

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



            
            it('should fail ading the same item', async () => {

                await logic.addItem(newItem)

                try{
                    await logic.addItem(newItem)
                }catch(error){
                    expect(error.message).to.be.equal("Item already exist")
                }

            })


            it('should list all items', async () => {

                await Item.create(newItem)
                await Item.create(newItem)

                const list = await logic.listItems()

                expect(list).to.exist
                expect(list).to.have.length
                expect(list[1].text).to.be.a('string')

            })


            it('should fail if there is no items to list', async () => {

              

               try{
                   await logic.listItems()
               }catch(error){
                   expect(error.message).to.be.equal("")
               }

            })
        })

        describe('ticket', () => {
            let user
            let id
            let ticket_1 = [{ name: 'manzana', Euro: 1.65 }, { name: 'pera', Euro: 2.75 }]
            let ticket_2 = [{ name: 'zumo', Euro: 7.65 }, { name: 'nectar', Euro: 4.75 }]
            const ticketFail = [{ name: 'bañador', Euro: 7.65 }, { name: 'nectar', Euro: 4.75 }]

            beforeEach(async () => {

                const { _id } = await User.create({ name, surname, email, password })
                id = _id.toString()

                const user = await User.findById(id)

                const { tickets } = user
                tickets.push(new Ticket({ date: "2019/04/01", month: "2019/04", items: ticket_1 }))
                tickets.push(new Ticket({ date: "2019/05/01", month: "2019/05", items: ticket_1 }))
                tickets.push(new Ticket({ date: "2019/05/31", month: "2019/05", items: ticket_1 }))

                await user.save()
            })

            it('should succeed adding a private ticket', async () => {


                await logic.addPrivateTicket(id, ticket_1)
                const _user = await User.findById(id).lean()
                const { items } = _user.tickets[3]


                expect(items).to.exist
                expect(items).to.have.lengthOf(2)
                expect(items[0].name).to.equal(ticket_1[0].name)
                expect(items[1].name).to.equal(ticket_1[1].name)
            })


            it('should fail if product of ticket dont exist', async () => {

                try {

                    await logic.addPrivateTicket(id, ticketFail)
                } catch (error) {

                    expect(error.message).to.be.equal("No tickets found")

                }
            })


            it('should fail adding ticket  on unexisting user', async () => {

                const wrongId = "dhfkldslkfsd"

                try {
                    await logic.addPrivateTicket(wrongId, ticket_1)

                } catch (error) {
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                }

            })



            it('should succeed updating a private ticket', async () => {


                await logic.addPrivateTicket(id, ticket_1)
                const user = await User.findById(id).lean()

                const { tickets } = user
                let ticketId = tickets[3]._id.toString()
                let data = { name: "nectar" }
                let position = "1"

                await logic.updatePrivateTicket(id, ticketId, data, position)

                const _user = await User.findById(id).lean()
                const { items } = _user.tickets[3]

                expect(items).to.exist
                expect(items).to.have.lengthOf(2)

                expect(items[0].name).to.equal(ticket_1[0].name)
                expect(items[1].name).to.equal(data.name)
            })


            it('should fail updating ticket on unexisting user', async () => {

                const wrongId = "dhfkldslkfsd"

                try {

                    await logic.addPrivateTicket(id, ticket_1)

                    const user = await User.findById(id).lean()

                    const { tickets } = user
                    let ticketId = tickets[3]._id.toString()
                    let data = { name: "nectar" }
                    let position = "1"

                    await logic.updatePrivateTicket(wrongId, ticketId, data, position)

                } catch (error) {
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                }
            })

            it('should succeed retriving a private ticket', async () => {

                await logic.addPrivateTicket(id, ticket_1)
                await logic.addPrivateTicket(id, ticket_2)

                const _user = await User.findById(id).lean()
                const { tickets } = _user

                let fTicketId = tickets[3]._id.toString()
                let sTicketId = tickets[4]._id.toString()

                const fTicket = await logic.retrivePrivateTicket(id, fTicketId)

                const { items } = fTicket

                expect(fTicket).to.exist
                expect(items).to.have.lengthOf(2)
                expect(items[0].name).to.equal(ticket_1[0].name)
                expect(items[1].price).to.equal(ticket_1[0].price)

                const sTicket = await logic.retrivePrivateTicket(id, sTicketId)

                const { items: _items } = sTicket

                expect(sTicket).to.exist
                expect(_items).to.have.lengthOf(2)
                expect(_items[0].name).to.equal(ticket_2[0].name)
                expect(_items[1].price).to.equal(ticket_2[0].price)

            })

            it('should fail retriving ticket on unexisting user', async () => {

                const wrongId = "dhfkldslkfsd"

                try {

                    await logic.addPrivateTicket(id, ticket_1)
                    await logic.addPrivateTicket(id, ticket_2)

                    const _user = await User.findById(id).lean()
                    const { tickets } = _user

                    let fTicketId = tickets[3]._id.toString()
                    let sTicketId = tickets[4]._id.toString()
                    await logic.retrivePrivateTicket(wrongId, fTicketId)

                } catch (error) {
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                }
            })

            it('should succed listing all tickets', async () => {


                await logic.addPrivateTicket(id, ticket_1)
                await logic.addPrivateTicket(id, ticket_2)

                const tickets = await logic.listPrivateTickets(id)

                expect(tickets).to.exist
                expect(tickets).to.have.lengthOf(5)

            })


            it('should fail listin all tickets on unexisting user', async () => {

                const wrongId = "dhfkldslkfsd"

                try {
                    await logic.listPrivateTickets(wrongId)

                } catch (error) {
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                }
            })
            it('should fail if there are no tickets', async () => {

                try {

                    await logic.listPrivateTickets(id)
                } catch (error) {

                    expect(error.message).to.be.equal("No tickets found")

                }
            })




            it('should succeed removing a private ticket', async () => {


                const user = await User.findById(id).lean()
                const { tickets } = user

                let fTicketId = tickets[2]._id.toString()

                await logic.removePrivateTicket(id, fTicketId)

                const _user = await User.findById(id)

                const { tickets: _tickets } = _user

                expect(_tickets).to.have.lengthOf(2)


            })




            it('should fail removing private ticket on unexisting user', async () => {

                const wrongId = "dhfkldslkfsd"

                try {


                    const user = await User.findById(id).lean()
                    const { tickets } = user

                    let fTicketId = tickets[2]._id.toString()
                    await logic.removePrivateTicket(wrongId, fTicketId)

                } catch (error) {
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                }
            })

            it('should succeed removing all private tickets', async () => {


                await logic.removeAllPrivateTickets(id)
                const _user = await User.findById(id)

                expect(_user.tickets).to.have.lengthOf(0)
            })


            it('should fail removing  all private ticket on unexisting user', async () => {

                const wrongId = "dhfkldslkfsd"

                try {

                    await logic.removeAllPrivateTickets(wrongId)

                } catch (error) {
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                }
            })


            it('should succeed retriving ticket by range of dates', async () => {


                const tickets = await logic.retrivePrivateTicketsByDates(id, { init: "2019/04/01", end: "2019/05/31" })


                expect(tickets[0].date).to.equal("2019/04/01")
                expect(tickets[1].date).to.equal("2019/05/01")
                expect(tickets[2].date).to.equal("2019/05/31")

            })

            it('should succeed retriving ticket by a month', async () => {


                const tickets = await logic.retrivePrivateTicketsByDates(id, { month: "2019/05" })

                expect(tickets[0].month).to.equal("2019/05")


            })

            it('should fail if there is no tickets from month query', async () => {

                try {
                    await logic.retrivePrivateTicketsByDates(id, { month: "2019/09" })
                } catch (error) {
                    expect(error.message).to.be.equal("No tickets found")
                }

            })

            it('should succeed retriving ticket by a day', async () => {

                const tickets = await logic.retrivePrivateTicketsByDates(id, { day: "2019/05/31" })

                expect(tickets[0].date).to.equal("2019/05/31")


            })
            it('should fail if there no tickets  by a day query ', async () => {

                try {
                    await logic.retrivePrivateTicketsByDates(id, { day: "2019/09/01" })
                } catch (error) {
                    expect(error.message).to.be.equal("No tickets found")
                }

            })
        })

        describe("products", () => {

            let id
            let ticket = [{ name: 'detergente', Euro: 1.65 },
            { name: 'pera', Euro: 2.75 },
            { name: 'detergente', Euro: 1.65 },
            { name: 'pera', Euro: 2.75 }]

            beforeEach(async () => {

                user = await User.create({ name, surname, email, password: cryptPass })
                id = user.id
                await logic.addPrivateTicket(id, ticket)
            })

            it("sould retrivie all spent amount of an specified product", async () => {

                const product = "pera"
                const amount = await logic.retrieveAmountByProdcut(id, product)

                expect(amount).to.exist
                expect(amount).to.be.equal("5.50")

            })

            it("sould fail if the product dont exist", async () => {

                try {

                    const product = "Horchata"
                    const amount = await logic.retrieveAmountByProdcut(id, product)
                } catch (error) {

                    expect(error.message).to.be.equal("Product not found")
                }

            })


            it("sould return product name and amount by category ", async () => {

                const category = "frutas"
                const products = await logic.retrieveByCategory(id, category)

                expect(products[0]).to.exist
                expect(products[0].name).to.be.equal("pera")
                expect(products[0].Euro).to.be.equal(5.5)

            })

            it("sould fail if there no products inside category ", async () => {


                try {

                    const category = "hogar"
                    await logic.retrieveByCategory(id, category)
                } catch (error) {
                    expect(error.message).to.be.equal("No results found")
                }

            })



        })
        describe("alerts", () => {

            let user
            let id
            let alert = { name: "manzana", Euro: 0, maxValue: 100 }

            beforeEach(async () => {
                user = await User.create({ name, surname, email, password })
                id = user.id
            })


            it('should succeed adding an alert', async () => {


                await logic.addAlert(id, alert)
                const _user = await User.findById(id).lean()
                const { alerts } = _user

                expect(alerts).to.exist
                expect(alerts).to.have.lengthOf(1)
                expect(alerts[0].name).to.equal(alert.name)

            })

            it('should fail  adding alert on unexisting user', async () => {

                const wrongId = "dhfkldslkfsd"

                try {
                    await logic.addAlert(wrongId,alert)

                } catch (error) {
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                }

            })

            it('should fail adding an alert if item dont exist', async () => {


                try {
                    await logic.addAlert(id, { name: "PINCHOS", maxValue: 300 })
                } catch (err) { expect(err.message).to.equal('PINCHOS dont exist') }

            })

            it('should fail adding an alert that already exist', async () => {


                try {
                    await logic.addAlert(id, alert)
                    await logic.addAlert(id, alert)

                } catch (err) { expect(err.message).to.equal('Alert already added') }

            })


            it('should succeed deleting an alert', async () => {


                await logic.addAlert(id, alert)

                const user = await User.findById(id).lean()
                const { alerts } = user

                let alertId = alerts[0]._id.toString()

                await logic.deleteAlert(id, alertId)

                const _user = await User.findById(id).lean()
                const { alerts: _alerts } = _user

                expect(_alerts).to.exist
                expect(_alerts).to.have.lengthOf(0)

            })

            it('should fail  deleting an  alert on unexisting user', async () => {

                const wrongId = "dhfkldslkfsd"
                
                await logic.addAlert(id, alert)

                const user = await User.findById(id).lean()
                const { alerts } = user

                let alertId = alerts[0]._id.toString()


                try {
                    await logic.deleteAlert(wrongId,alertId)

                } catch (error) {
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                }

            })




            it('should fail if alert dont exist', async () => {


                
                    try{
                        await logic.deleteAlert(id, "43095843095")
                    }catch(error){
                        expect(error.message).to.be.equal("Alert dosen\'t exist")
                    }
                

           
            })

            it('should succeed deleting all alerts', async () => {


                await logic.addAlert(id, alert)
                const response = await logic.deleteAllAlerts(id)

                expect(response).to.equal("Alerts succesfully deleted")

                const { alerts } = await User.findById(id).lean()

                expect(alerts).to.have.lengthOf(0)

            })

            it('should succeed editing an alert', async () => {


                await logic.addAlert(id, alert)

                const user = await User.findById(id).lean()
                const { alerts } = user

                let alertId = alerts[0]._id.toString()

                let data = { maxValue: 300 }

                await logic.editAlert(id, alertId, data)

                const _user = await User.findById(id).lean()
                const { alerts: _alerts } = _user

                expect(_alerts).to.exist
                expect(_alerts).to.have.lengthOf(1)
                expect(_alerts[0].maxValue).to.equal(data.maxValue)

            })



            it('should succeed listing all alerts', async () => {


                await logic.addAlert(id, alert)
                await logic.listAlerts(id)
                const { alerts } = await User.findById(id)

                expect(alerts).to.exist
                expect(alerts).to.have.lengthOf(1)
                expect(alerts[0].maxValue).to.equal(alert.maxValue)

            })


            
            it('should fail if dont exist any alert', async () => {


                
                try{
                    await logic.deleteAllAlerts(id)
                }catch(error){
                    expect(error.message).to.be.equal("Alert dosen\'t exist")
                }
            

       
        })


        })


    })

    after(() => mongoose.disconnect())


})