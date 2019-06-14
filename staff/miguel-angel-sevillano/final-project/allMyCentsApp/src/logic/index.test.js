
const expect = require('chai').expect
const logic = require('./index')
const { models: { User, Ticket }, mongoose } = require("allMyCents-data")




describe('Logic', () => {

    before(() => {

        return (async () => {
            await mongoose.connect("mongodb+srv://allMyCents:1234@cluster0-re1kf.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
            await User.deleteMany()
        })()

    })

    let name = 'Miguel'
    let surname = 'Sevillano'
    let email = "mail@mail.com"
    let password = '123'
    let _token = ""


    describe('users', () => {

        describe('register user', () => {

            it('should succeed registering an user', async () => {

                const res = await logic.register(name, surname, email, password)

                expect(res.message).to.equal('Ok, user registered.')

            })
        })


        describe('login user', () => {


            it('should succeed on correct user credential', async () => {

                const { token } = await logic.logIn(email, password)
                _token = token

                expect(typeof token).to.be.a('string')
                expect(token.length).to.be.greaterThan(1)

            })

            it('should fail on non-existing user', async () => {


                const res = await logic.logIn('unexisting-user@mail.com', password)

                expect(res).to.exist
                expect(res).to.equal("Unexisting user")

            })
        })

        describe('retrieve user', () => {


            it('should succeed on correct user token from existing user', async () => {

                const user = await logic.retrieveUser(_token)


                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

            })

            it('should fail on invalid token', async () => {

                const res = await logic.retrieveUser('01234567890123456789abcd')

                expect(res).to.exist
                expect(res).to.equal(`Invalid token`)

            })
        })

        describe('update user', () => {

            let updateInfo = { name: "jose" }

            it('should succed updating user data', async () => {

                const response = await logic.updateUser(_token, updateInfo)

                expect(response).to.be.equal("User succesfully updated")

                const user = await logic.retrieveUser(_token)

                expect(user.name).to.be.equal(updateInfo.name)

            })

        })
        describe('delete user', () => {


            it('should succed deleting user', async () => {

                const res = await logic.deleteUser(_token)

                expect(res).to.equal("User succesfully deleted")


                const _res = await logic.logIn(email, password)

                expect(_res).to.be.equal("Unexisting user")

            })

        })

        describe('ticket', () => {

            let ticket_1 = [{ name: 'manzana', Euro: 1.65 }, { name: 'pera', Euro: 2.75 }]
            let date =new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')



            it('should succeed adding a private ticket', async () => {

                await logic.register(name, surname, email, password)

                const { token } = await logic.logIn(email, password)
                _token = token


                const res = await logic.saveTicket(_token, ticket_1)
                expect(res).to.equal("Ticket succesfully added")
                const { tickets } = await logic.retrieveUser(_token)


                expect(tickets).to.have.lengthOf(1)
                expect(tickets[0].items[0].name).to.be.equal(ticket_1[0].name)
            })

            it('should succeed editing  private ticket', async () => {


                const { tickets } = await logic.retrieveUser(_token)

                let ticketId = tickets[0]._id.toString()
                let data = { name: "VENTILADOR" }
                let position = "1"

                await logic.editTicket(_token, ticketId, data, position)

                const user = await logic.retrieveUser(_token)
                const { items } = user.tickets[0]

                expect(items).to.exist
                expect(items).to.have.lengthOf(2)

                expect(items[0].name).to.equal(ticket_1[0].name)
                expect(items[1].name).to.equal(data.name)
            })
            it('should succeed retriving a private ticket', async () => {


                const { tickets } = await logic.retrieveUser(_token)

                let fTicketId = tickets[0]._id

                const fTicket = await logic.getTicket(_token, fTicketId)

                const { items } = fTicket

                expect(fTicket).to.exist
                expect(items).to.have.lengthOf(2)
                expect(items[0].name).to.equal(ticket_1[0].name)
                expect(items[1].price).to.equal(ticket_1[0].price)

            })

            it('should succed listing all tickets', async () => {


                const tickets = await logic.listTickets(_token)

                expect(tickets).to.exist
                expect(tickets).to.have.lengthOf(1)

            })

            it('should succeed removing a private ticket', async () => {


                const user = await logic.retrieveUser(_token)
                const { tickets } = user

                let ticketId = tickets[0]._id

                const response = await logic.deleteTicket(_token, ticketId)

                expect(response).to.be.equal("ticket succesfully deleted")

                const _user = await logic.retrieveUser(_token)

                expect(_user.tickets).to.be.deep.equal([])


            })
            it('should succeed removing all private tickets', async () => {


                const response = await logic.deleteAllTickets(_token)

                expect(response).to.be.equal("all tickets succesfully removed")

                const user = await logic.retrieveUser(_token)


                expect(user.tickets).to.be.deep.equal([])

            })

            it('should succeed retriving ticket by range of dates', async () => {
                
               

                await logic.saveTicket(_token, ticket_1)

                const tickets = await logic.retrieveTicketsByDates(_token, { init: date, end: date })
            
                expect(tickets[0].date).to.equal(date)



            })

            it('should succeed retriving ticket by a month', async () => {

                await logic.saveTicket(_token, ticket_1)

                const tickets = await logic.retrieveTicketsByDates(_token, { month: "2019/06" })

                expect(tickets[0].month).to.equal("2019/06")
                expect(tickets[1].month).to.equal("2019/06")


            })

            it('should succeed retriving ticket by a day', async () => {


                const tickets = await logic.retrieveTicketsByDates(_token, { day: date })

                expect(tickets[0].date).to.equal(date)


            })

            it("should fail if there are no tickets on date specified", async () => {

                const resMonth = await logic.retrieveTicketsByDates(_token, { month: "2019/03" })
                const resDay = await logic.retrieveTicketsByDates(_token, { day: "2019/05/1" })
                const resRange = await logic.retrieveTicketsByDates(_token, { init: "2019/03/01", end: "2019/04/1" })


                expect(resMonth).to.be.equal("No tickets found")
                expect(resDay).to.be.equal("No tickets found")
                expect(resRange).to.be.equal("No tickets found")
            })
        })

        describe("products", () => {


            let ticket = [{ name: 'manzana', Euro: 1.65 },
            { name: 'pera', Euro: 2.75 },
            { name: 'detergente', Euro: 1.65 },
            { name: 'pera', Euro: 2.75 }]


            it("sould retrivie all spent amount of an specified product", async () => {

                await logic.saveTicket(_token, ticket)

                const product = "pera"

                const amount = await logic.getAmountByProduct(_token, product)

                expect(amount).to.exist
                expect(amount).to.be.equal(11)

            })

            it("sould return product name and amount by category ", async () => {

                const category = "frutas"
                const products = await logic.getProductByCategory(_token, category)
                const amount = products[0].Euro

                expect(products[0]).to.exist
                expect(products[0].name).to.be.equal("manzana")
                expect(amount.toFixed(2)).to.be.equal('4.95')

            })

        })


        describe('items', () => {


            it('should list all items', async () => {

                const list = await logic.listItems()

                expect(list).to.exist
                expect(list).to.have.length
                expect(list[1].text).to.be.a('string')

            })
        })

        describe("alerts", () => {

            let alert = { name: "manzana",Euro:0, maxValue: 100 }


            it('should succeed adding an alert', async () => {


                const response = await logic.addAlert(_token, alert)

                expect(response).to.be.equal("Alert succesfully added")

                const _user = await logic.retrieveUser(_token)
                const { alerts } = _user

                expect(alerts).to.exist
                expect(alerts).to.have.lengthOf(1)
                expect(alerts[0].name).to.equal(alert.name)

            })

            it('should fail adding an alert if item dont exist', async () => {
                
                let _alert ={ name:"PINCHOS",Euro:0, maxValue: 300 }

                const res = await logic.addAlert(_token, _alert )
                 
                expect(res).to.equal('PINCHOS dont exist')

            })

            it('should fail adding an alert that already exist', async () => {

                const res = await logic.addAlert(_token, alert)
                expect(res).to.equal('Alert already added')

            })


            it('should succeed deleting an alert', async () => {

 

                const user = await logic.retrieveUser(_token)
                const { alerts } = user

                let alertId = alerts[0]._id.toString()

                const response = await logic.deleteAlert(_token, alertId)

                expect(response).to.be.equal("Alert succesfully deleted")

                const _user = await logic.retrieveUser(_token)
                const { alerts: _alerts } = _user

                expect(_alerts).to.exist
                expect(_alerts).to.have.lengthOf(0)

            })

            it('should succeed deleting all alerts', async () => {


                await logic.addAlert(_token, alert)
                await logic.addAlert(_token, { name: "pera", maxValue: 100 })
                const response = await logic.deleteAllAlerts(_token)


                expect(response).to.be.equal("Alerts succesfully deleted")

                const { alerts } = await logic.retrieveUser(_token)

                expect(alerts).to.have.lengthOf(0)

            })

            it('should succeed editing an alert', async () => {


                await logic.addAlert(_token, alert)

                const user = await logic.retrieveUser(_token)
                const { alerts } = user

                let alertId = alerts[0]._id.toString()

                let data = { maxValue: 300 }

                const response = await logic.editAlert(_token, alertId, data)

                expect(response).to.be.equal("Alert succesfully updated")

                const _user = await logic.retrieveUser(_token)
                const { alerts: _alerts } = _user

                expect(_alerts).to.exist
                expect(_alerts).to.have.lengthOf(1)
                expect(_alerts[0].maxValue).to.equal(data.maxValue)

            })



            it('should succeed listing all alerts', async () => {

                let alert = { name: "pera",Euro:0, maxValue: 100 }


                await logic.addAlert(_token, alert)
                await logic.listAlerts(_token)
                const { alerts } = await logic.retrieveUser(_token)

                expect(alerts).to.exist
                expect(alerts).to.have.lengthOf(2)
                expect(alerts[1].maxValue).to.equal(alert.maxValue)

            })


        })


    })



    after(() => mongoose.disconnect())


})