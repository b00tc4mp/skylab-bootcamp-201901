const { User, Order, mongoose } = require('gelato-data')

const { expect } = require('chai')
const logic = require('./index')
const bcrypt = require('bcrypt')

const connectToDatabase = require('../db-connection')
const should = require('chai').should()

describe('logic', () => {
  let name, surname, email, password

  before(() => connectToDatabase({ isTest: true }))

  beforeEach(async () => {
    await User.deleteMany()
    await Order.deleteMany()

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@mail.com`
    password = `password-${Math.random()}`
  })

  describe('register user', () => {
    it('should succeed on correct data', async () => {
      const res = await logic.registerUser(name, surname, email, password)

      expect(res).to.be.undefined

      const users = await User.find()

      expect(users).to.exist
      expect(users).to.have.lengthOf(1)

      const [user] = users

      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)

      expect(user.password).to.exist
      const match = await bcrypt.compare(password, user.password)
      should.exist(match)
    })

    it('should fail on empty name', async () => {
      const name = ' \t    \n'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).to.equal('name is empty')
      }
    })
    it('should fail on undefined name', async () => {
      const name = undefined
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).to.equal('name is not optional')
      }
    })
    it('should fail on undefined surname', async () => {
      const surname = undefined
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).to.equal('surname is not optional')
      }
    })
    it('should fail on empty surname', async () => {
      const surname = ' \t    \n'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).to.equal('surname is empty')
      }
    })

    it('should fail on empty email', async () => {
      const email = ' \t    \n'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).to.equal('email is empty')
      }
    })

    it('should fail on undefined email', async () => {
      const email = undefined
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).to.equal('email is not optional')
      }
    })
    it('missing character on email', async () => {
      const email = 'a.com'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).to.equal(`${email} is not an e-mail`)
      }
    })

    it('should fail on empty password', async () => {
      const password = ' \t    \n'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).to.equal('password is empty')
      }
    })

    it('should fail on undefined password', async () => {
      const password = undefined
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).to.equal('password is not optional')
      }
    })
  })

  describe('authenticate user', () => {
    let user

    beforeEach(async () => {
      const hash = await bcrypt.hash(password, 10)
      user = await User.create({ name, surname, email, password: hash
      })
    })

    it('should succeed on correct credentials', async () => {
      const { id, superUser } = await logic.authenticateUser(email, password)
      expect(id).to.exist
      expect(id).to.be.a('string')

      expect(superUser).to.be.a('boolean')
      expect(superUser).to.equal(false)

      expect(id).to.equal(user.id)
    })

    it('should fail on incorrect password', async () => {
      const password2 = '1111'
      try {
        await logic.authenticateUser(email, password2)
      } catch (error) {
        expect(error.message).to.equal('wrong credentials')
      }
    })
    it('should fail on non-existent email', async () => {
      const email2 = 'aaaaaaaaaaaaaaaaa@gmail.com'
      try {
        await logic.authenticateUser(email2, password)
      } catch (error) {
        expect(error.message).to.equal('wrong credentials')
      }
    })
  })

  describe('retrieve user', () => {
    let user

    beforeEach(async () => { user = await User.create({ name, surname, email, password }) })

    it('should succeed retrieving an existing user with correct id', async () => {
      const _user = await logic.retrieveUserBy(user.id)

      expect(_user.id).to.be.undefined
      expect(_user.name).to.equal(name)
      expect(_user.surname).to.equal(surname)
      expect(_user.email).to.equal(email)
      expect(_user.password).to.be.undefined
    })

    it('should fail retrieving an existing user with in-correct id', async () => {
      const id = '64646446464644'
      try {
        await logic.retrieveUserBy(id)
      } catch (error) {
        expect(error.message).to.equal(`Cast to ObjectId failed for value "${id}" at path "_id" for model "User"`)
      }
    })

    it('should fail retrieving an existing user sending an array as id', async () => {
      const id = []
      try {
        await logic.retrieveUserBy(id)
      } catch (error) {
        expect(error.message).to.equal(`id  is not a string`)
      }
    })

    it('should fail retrieving an existing user with undefined id', async () => {
      const id = undefined
      try {
        await logic.retrieveUserBy(id)
      } catch (error) {
        expect(error.message).to.equal('id is not optional')
      }
    })
  })

  describe('add an order', () => {
    let user

    beforeEach(async () => { user = await User.create({ name, surname, email, password }) })

    it('should succeed adding an order on existing user', async () => {
      const order = {
        client: user.id,
        type: 'cone',
        size: 'big',
        flavors: ['vanilla', 'chocolate', 'blackberry rosé'],
        totalPrice: 3
      }

      const res = await logic.addOrder(order)
      expect(res).to.be.undefined
      const orderDb = await Order.findOne().sort({ _id: -1 }).lean()
      expect(orderDb).to.exist
      expect(orderDb.size).to.equal(order.size)
      expect(orderDb.totalPrice).to.equal(order.totalPrice)
    })

    it('should fail adding an order with empty client', async () => {
      const order = {
        client: ' \t    \n',
        type: 'cone',
        size: 'big',
        flavors: ['vanilla', 'chocolate', 'blackberry rosé'],
        totalPrice: 3
      }

      try {
        await logic.addOrder(order)
      } catch (error) {
        expect(error.message).to.equal('client is empty')
      }
    })

    it('should fail adding an order with empty type', async () => {
      const order = {
        client: user.id,
        type: ' \t    \n',
        size: 'big',
        flavors: ['vanilla', 'chocolate', 'blackberry rosé'],
        totalPrice: 3
      }

      try {
        await logic.addOrder(order)
      } catch (error) {
        expect(error.message).to.equal('type is empty')
      }
    })

    it('should fail adding an order with empty size', async () => {
      const order = {
        client: user.id,
        type: 'cone',
        size: ' \t    \n',
        flavors: ['vanilla', 'chocolate', 'blackberry rosé'],
        totalPrice: 3
      }

      try {
        await logic.addOrder(order)
      } catch (error) {
        expect(error.message).to.equal('size is empty')
      }
    })

    it('should fail adding an order with empty flavors', async () => {
      const order = {
        client: user.id,
        type: 'cone',
        size: 'big',
        flavors: ' \t    \n'
      }

      try {
        await logic.addOrder(order)
      } catch (error) {
        expect(error.message).to.equal('flavors  \t    \n is not a object')
      }
    })
  })

  describe('retrieve orders by user id', () => {
    let user, orders

    beforeEach(async () => {
      user = await User.create({ name, surname, email, password })
      orders = []

      const gelatos = new Array(5).fill().map(() => {
        const order = {
          client: user.id,
          size: `big-${Math.random()}`,
          type: `cone-${Math.random()}`,
          flavors: [`vanilla-${Math.random()}`],
          totalPrice: 3
        }
        return order
      })

      await Promise.all(gelatos.map(async gelato => orders.push(await Order.create(gelato))))
    })

    it('should succeed retrieving orders by user id', async () => {
      const _orders = await logic.retrieveOrdersByUserId(user.id)

      expect(_orders).to.exist
      expect(_orders).to.have.lengthOf(orders.length)
    })
  })

  describe('retrieve all existing orders', () => {
    let user, user2, allOrdersFirstClient, allOrdersSecondClient

    beforeEach(async () => {
      user = await User.create({ name, surname, email, password })
      user2 = await User.create({ name, surname, email: `${Math.random()}-${email}`, password })

      let gelatosOrder = new Array(5).fill().map(() => {
        const order = {
          client: user.id,
          size: `big-${Math.random()}`,
          type: `cone-${Math.random()}`,
          flavors: [`vanilla-${Math.random()}`],
          totalPrice: 5
        }
        return order
      })

      allOrdersFirstClient = []

      await Promise.all(gelatosOrder.map(async gelato => allOrdersFirstClient.push(await Order.create(gelato))))

      let secondGelatosOrders = new Array(5).fill().map(() => {
        const order = {
          client: user2.id,
          size: `small-${Math.random()}`,
          type: `cup-${Math.random()}`,
          flavors: [`chocolate-${Math.random()}`],
          totalPrice: 5
        }
        return order
      })
      allOrdersSecondClient = []

      await Promise.all(secondGelatosOrders.map(async gelato => allOrdersSecondClient.push(await Order.create(gelato))))
    })

    it('should succeed retrieving all orders if user is admin', async () => {
      const allClientsOrders = await logic.retrieveAllOrders({ isAdmin: true })

      expect(allClientsOrders).to.exist
      expect(allClientsOrders).to.have.lengthOf(allOrdersFirstClient.length + allOrdersSecondClient.length)

      allClientsOrders.forEach(order => {
        expect(order._id).to.be.undefined
        expect(order.id).to.exist
        expect(order.id).to.be.a('string')

        expect(order.date).to.exist
        expect(order.date).to.be.instanceOf(Date)
      })
    })

    it('should avoid authorization retrieving all orders if user is NOT admin', async () => {
      try {
        await logic.retrieveAllOrders({ isAdmin: false })
      } catch (e) {
        expect(e).to.exist
      }
    })
  })

  describe('remove order by id', () => {
    let user, orders

    beforeEach(async () => {
      user = await User.create({ name, surname, email, password })
      orders = []

      const gelatos = new Array(2).fill().map(() => {
        const order = {
          client: user.id,
          size: `big-${Math.random()}`,
          type: `cone-${Math.random()}`,
          flavors: [`vanilla-${Math.random()}`],
          totalPrice: 5
        }
        return order
      })

      await Promise.all(gelatos.map(async gelato => orders.push(await Order.create(gelato))))
    })

    it('should succeed removing an existing order', async () => {
      const order = await logic.retrieveOrdersByUserId(user.id)
      await logic.removeOneOrder({ userId: order[0].client.id, orderId: order[0].id, isAdmin: false })
      const updatedUserOrders = await logic.retrieveOrdersByUserId(user.id)
      expect(updatedUserOrders).to.have.lengthOf(1)
      expect(updatedUserOrders[0].id).to.equal(order[1].id)
    })

    it('should fail removing an non-existent order', async () => {
      try {
        await logic.removeOneOrder({ orderId: orders[0].id, userId: user.id })
        await logic.removeOneOrder({ orderId: orders[0].id, userId: user.id })
      } catch (error) {
        expect(error.message).to.equal('Order not found')
      }
    })
  })

  describe('remove user and orders by user id', () => {
    let user, orders

    beforeEach(async () => {
      user = await User.create({ name, surname, email, password })
      orders = []

      const gelatos = new Array(2).fill().map(() => {
        const order = {
          client: user.id,
          size: `big-${Math.random()}`,
          type: `cone-${Math.random()}`,
          flavors: [`vanilla-${Math.random()}`],
          totalPrice: 5
        }
        return order
      })

      await Promise.all(gelatos.map(async gelato => orders.push(await Order.create(gelato))))
    })

    it('should success by removing an user and his orders by id', async () => {
      await logic.removeUser(user.id)
      const updatedUserOrders = await logic.retrieveOrdersByUserId(user.id)
      expect(updatedUserOrders).to.have.lengthOf(0)
    })

    it('should fail by removing an user and his orders with non-existent id', async () => {
      try {
        await logic.removeUser(user.id)
        await logic.removeUser(user.id)
      } catch (error) {
        expect(error.message).to.equal('User not found')
      }
    })

    it('should fail by removing an user and his orders with empty id', async () => {
      try {
        const id = ' \t    \n'
        await logic.removeUser(id)
      } catch (error) {
        expect(error.message).to.equal('userId is empty')
      }
    })

    it('should fail by removing an user and his orders with undefined id', async () => {
      try {
        const id = undefined
        await logic.removeUser(id)
      } catch (error) {
        expect(error.message).to.equal('userId is not optional')
      }
    })

    it('should fail by removing an user and his orders with incorrect id format', async () => {
      const id = 8623892
      try {
        await logic.removeUser(id)
      } catch (error) {
        expect(error.message).to.equal(`userId ${id} is not a string`)
      }
    })
  })

  describe('retrieve one order by order id', () => {
    let user, orders

    beforeEach(async () => {
      user = await User.create({ name, surname, email, password })
      orders = []

      const gelatos = new Array(2).fill().map(() => {
        const order = {
          client: user.id,
          size: `big-${Math.random()}`,
          type: `cone-${Math.random()}`,
          flavors: [`vanilla-${Math.random()}`],
          totalPrice: 5
        }
        return order
      })

      await Promise.all(gelatos.map(async gelato => orders.push(await Order.create(gelato))))
    })
    it('should success by retorning one order by order id', async () => {
      const oneOrder = await logic.retrieveOneOrderByOrderId({ orderId: orders[0].id })
      expect(oneOrder[0].type).to.exist
      expect(oneOrder).to.have.length(1)
      expect(oneOrder[0].id).to.be.equal(orders[0].id)
      expect(oneOrder[0].flavors.length).to.be.equal(orders[0].flavors.length)
    })

    it('should fail by retorning one order by non-existent order id', async () => {
      const fakeId = '692837982630'
      try {
        await logic.retrieveOneOrderByOrderId({ orderId: fakeId })
      } catch (error) {
        expect(error.message).to.equal('order not found')
      }
    })

    it('should fail by retorning one order by empty order id', async () => {
      const emptyId = ' \t    \n'
      try {
        await logic.retrieveOneOrderByOrderId({ orderId: emptyId })
      } catch (error) {
        expect(error.message).to.equal('orderId is empty')
      }
    })

    it('should fail by retorning one order by empty order id', async () => {
      const undefinedId = undefined
      try {
        await logic.retrieveOneOrderByOrderId({ orderId: undefinedId })
      } catch (error) {
        expect(error.message).to.equal('orderId is not optional')
      }
    })

    it('should fail by retorning one order by sending random numbers instead of the order id in string', async () => {
      const randomNumbersId = 7373733
      try {
        await logic.retrieveOneOrderByOrderId({ orderId: randomNumbersId })
      } catch (error) {
        expect(error.message).to.equal(`orderId ${randomNumbersId} is not a string`)
      }
    })
  })

  // describe('update user', () => {
  //   beforeEach(async () => {
  //     await User.create({ name, surname, email, password })
  //   })

  //   it('should success by updating an user', async () => {
  //     debugger
  //     const { id } = await logic.authenticateUser({ email, password })
  //     debugger
  //     const data = {
  //       name: 'daniela'
  //     }
  //     const res = await logic.updateUser({ id, data })
  //     debugger
  //   })
  // })

  after(async () => {
    await User.deleteMany()
    await Order.deleteMany()
    await mongoose.disconnect()
  })

  // after(() => mongoose.disconnect())
})
