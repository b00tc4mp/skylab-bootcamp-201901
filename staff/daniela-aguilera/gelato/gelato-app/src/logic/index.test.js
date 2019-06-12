const { default: logic } = require('.')
const { default: restApi } = require('../api')
const { User, Order, mongoose } = require('gelato-data')
const { env: { MONGO_URL_TEST } } = process
const faker = require('faker')

describe('logic', () => {
  let name, surname, email, password

  beforeAll(() => mongoose.connect(MONGO_URL_TEST, { useNewUrlParser: true }))

  beforeEach(async () => {
    await User.deleteMany()
    await Order.deleteMany()

    name = `apptest-${Math.random()}`
    surname = `apptest-${Math.random()}`
    email = `apptest-${Math.random()}@mail.com`
    password = `apptest-${Math.random()}`
  })

  describe('register user', () => {
    it('should succeed on correct data', async () => {
      const res = await logic.registerUser(name, surname, email, password)
      const user = await User.findOne({ email })

      expect(res.message).toBe('User registered.')
      expect(user.name).toBe(name)
      expect(user.surname).toBe(surname)
      expect(user.email).toBe(email)
      expect(user.password).toBeDefined()
    })

    it('should fail on empty name', async () => {
      const name = ' \t    \n'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('name is empty')
      }
    })

    it('should fail on undefined name', async () => {
      const name = undefined
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('name is not optional')
      }
    })
    it('should fail on undefined surname', async () => {
      const surname = undefined
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('surname is not optional')
      }
    })
    it('should fail on empty surname', async () => {
      const surname = ' \t    \n'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('surname is empty')
      }
    })

    it('should fail on empty email', async () => {
      const email = ' \t    \n'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('email is empty')
      }
    })

    it('should fail on undefined email', async () => {
      const email = undefined
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('email is not optional')
      }
    })
    it('missing character on email', async () => {
      const email = 'a.com'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe(`${email} is not an e-mail`)
      }
    })

    it('should fail on empty password', async () => {
      const password = ' \t    \n'
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('password is empty')
      }
    })

    it('should fail on undefined password', async () => {
      const password = undefined
      try {
        await logic.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('password is not optional')
      }
    })
  })

  describe('authenticate user', () => {
    beforeEach(async () => {
      await logic.registerUser(name, surname, email, password)
    })

    it('should succeed on correct user credential', async () => {
      await logic.authenticateUser(email, password)
      expect(logic.__userToken__).toBeDefined()
      expect(logic.__userIsAdmin__).toBeDefined()
    })

    it('should fail on incorrect email', async () => {
      let email2 = 'daniela@gmail.com'
      try {
        await logic.authenticateUser(email2, password)
      } catch (error) {
        expect(error.message).toBe('wrong credentials')
      }
    })

    it('should fail using an object as email', async () => {
      let email2 = []
      try {
        await logic.authenticateUser(email2, password)
      } catch (error) {
        expect(error.message).toBe('email  is not a string')
      }
    })

    it('should fail using an object as email', async () => {
      let email3 = '234'
      try {
        await logic.authenticateUser(email3, password)
      } catch (error) {
        expect(error.message).toBe('wrong credentials')
      }
    })

    it('should fail using an object as email', async () => {
      let email4 = '234@gmail'
      try {
        await logic.authenticateUser(email4, password)
      } catch (error) {
        expect(error.message).toBe('wrong credentials')
      }
    })

    it('should fail on incorrect password', async () => {
      let password2 = '782'
      try {
        await logic.authenticateUser(email, password2)
      } catch (error) {
        expect(error.message).toBe('wrong credentials')
      }
    })

    it('should fail on undefined password', async () => {
      let password3
      try {
        await logic.authenticateUser(email, password3)
      } catch (error) {
        expect(error.message).toBe('password is not optional')
      }
    })

    it('should fail using an object as a password', async () => {
      let password4 = []
      try {
        await logic.authenticateUser(email, password4)
      } catch (error) {
        expect(error.message).toBe('password  is not a string')
      }
    })
  })

  describe('retrieve user', () => {
    beforeEach(() => logic.registerUser(name, surname, email, password))

    it('should succeed retrieving an existing user with correct id', async () => {
      await logic.authenticateUser(email, password)

      const _user = await logic.retrieveUserBy()

      expect(_user.name).toEqual(name)
      expect(_user.surname).toEqual(surname)
      expect(_user.email).toEqual(email)
      expect(_user.password).toBe(undefined)
    })
  })

  describe('add an order', () => {
    beforeEach(() => {
      return logic.registerUser(name, surname, email, password)
    })

    it('should succeed adding an order on existing user', async () => {
      await logic.authenticateUser(email, password)

      let type1 = 'cone'
      let size1 = 'big'
      let flavors1 = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice1 = 12

      const orderResponse = await logic.addOrder(flavors1, size1, type1, totalPrice1)

      expect(orderResponse).toBeDefined()
      const orders = await Order.find()
      expect(orders).toBeDefined()
      expect(orders[0].type).toBe('cone')
      expect(orders[0].size).toBe('big')
      expect.arrayContaining(orders[0].flavors)
    })

    it('should fail adding an order with empty type', async () => {
      await logic.authenticateUser(email, password)

      let type2 = ' \t    \n'
      let size2 = 'big'
      let flavors2 = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice2 = 12

      try {
        await logic.addOrder(flavors2, size2, type2, totalPrice2)
      } catch (error) {
        expect(error.message).toBe('type is empty')
      }
    })

    it('should fail adding an order with undefined type', async () => {
      await logic.authenticateUser(email, password)

      let type3
      let size3 = 'big'
      let flavors3 = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice3 = 12

      try {
        await logic.addOrder(flavors3, size3, type3, totalPrice3)
      } catch (error) {
        expect(error.message).toBe('type is not optional')
      }
    })

    it('should fail adding an order with empty size', async () => {
      await logic.authenticateUser(email, password)

      let type4 = 'cone'
      let size4 = ' \t    \n'
      let flavors4 = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice4 = 12

      try {
        await logic.addOrder(flavors4, size4, type4, totalPrice4)
      } catch (error) {
        expect(error.message).toBe('size is empty')
      }
    })

    it('should fail adding an order with undefined size', async () => {
      await logic.authenticateUser(email, password)
      let type5 = 'cone'
      let size5
      let flavors5 = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice5 = 12

      try {
        await logic.addOrder(flavors5, size5, type5, totalPrice5)
      } catch (error) {
        expect(error.message).toBe('size is not optional')
      }
    })
  })

  describe('delete an user', () => {
    beforeEach(() => {
      return logic.registerUser(name, surname, email, password)
    })

    it('should succeed eliminating an existing user', async () => {
      await logic.authenticateUser(email, password)
      await logic.deleteUser()
      const res2 = await User.findOne({ email }).lean()
      expect(res2).toBeNull()
    })

    it('should fail eliminating an non-existing', async () => {
      try {
        await logic.deleteUser()
      } catch (error) {
        expect(error.message).toBe('User not found')
      }
    })
  })

  describe('retrieve orders by user id', () => {
    beforeEach(async () => {
      await logic.registerUser(name, surname, email, password)
      await logic.authenticateUser(email, password)
    })
    it('should succeed retrieving orders by user id', async () => {
      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice = 12

      await logic.addOrder(flavors, size, type, totalPrice)
      await logic.addOrder(flavors, size, type, totalPrice)
      const orders = await logic.retrieveUserOrders()

      expect(orders).toBeDefined()
      expect(orders).toHaveLength(2)
    })

    it('should succeed retrieving an empty array by user id', async () => {
      const orders = await logic.retrieveUserOrders()

      expect(orders).toBeDefined()
      expect(orders).toHaveLength(0)
    })
  })

  describe('update user', () => {
    const data = { name: 'Test', surname: 'Aguilera' }

    beforeEach(async () => {
      email = `daniela-${Math.random()}@gmail.com`
      password = `Pass-${Math.random()}`

      await logic.registerUser(name, surname, email, password)
      await logic.authenticateUser(email, password)
    })

    it('should succeed on correct credentials', async () => {
      await logic.updateUser(data)
      const user = await User.findOne({ email })
      expect(user.name).toBe(data.name)
      expect(user.surname).toBe(data.surname)
    })

    it('should fail on empty data', () =>
      expect(() => logic.updateUser()).toThrowError('data is not optional'))

    it('should fail when data is a number', () =>
      expect(() => logic.updateUser(1)).toThrowError('data 1 is not a object'))

    it('should fail when data is an object', () =>
      expect(() => logic.updateUser('hola')).toThrowError('data hola is not a object'))

    it('should fail when data is a boolean', () =>
      expect(() => logic.updateUser(true)).toThrowError('data true is not a object'))
  })

  describe('retrieve all users orders', () => {
    let type, type2, size, size2, flavors, flavors2, totalPrice, totalPrice2, userToken, userToken1

    beforeEach(async () => {
      type = faker.commerce.product()
      type2 = faker.commerce.product()
      size = faker.commerce.productAdjective()
      size2 = faker.commerce.productAdjective()
      let name1 = faker.name.firstName()
      let surname1 = faker.name.lastName()
      let email1 = faker.internet.email()
      let password1 = faker.internet.password()
      flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      flavors2 = ['lemon', 'strawberry', 'cheesecake']
      totalPrice = 12
      totalPrice2 = 16
      await logic.registerUser(name, surname, email, password)
      await logic.registerUser(name1, surname1, email1, password1)
      const _token = await restApi.authenticateUser(email, password)
      const _token1 = await restApi.authenticateUser(email1, password1)
      userToken = _token.token
      userToken1 = _token1.token
      await restApi.addOrder(userToken, flavors2, size2, type2, totalPrice)
      await restApi.addOrder(userToken1, flavors, size, type, totalPrice2)
    })
    it('should succeed retrieving all users orders', async () => {
      const data = { superUser: 'true', name: 'daniela' }
      const user = await User.findOne({ email })
      const id = user.id
      await User.findByIdAndUpdate(id, data)
      await logic.authenticateUser(email, password)
      const orders = await logic.retrieveAllUsersOrders()
      expect(orders).toBeDefined()
    })

    it('should fail retrieving all users orders', async () => {
      try {
        await restApi.retrieveAllUsersOrders(userToken1)
      } catch (error) {
        expect(error.message).toBe('You do not have permission to do this')
      }
    })
  })

  describe('retrieve One Order by user and order id', () => {
    beforeEach(() => {
      return logic.registerUser(name, surname, email, password)
    })
    it('should succeed retrieving one order', async () => {
      await logic.authenticateUser(email, password)

      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice = 12

      await logic.addOrder(flavors, size, type, totalPrice)
      const allorders = await logic.retrieveUserOrders()
      const orderId = allorders[0].id
      const retrievedOrderByUserAndOrderId = await logic.retrieveOneOrder(orderId)
      expect(retrievedOrderByUserAndOrderId).toHaveLength(1)
    })
    it('should fail retrieving one order by sending and object as orderId', async () => {
      try {
        await logic.authenticateUser(email, password)
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let totalPrice = 12
        await logic.addOrder(flavors, size, type, totalPrice)
        const orderId = []
        await logic.retrieveOneOrder(orderId)
      } catch (error) {
        expect(error.message).toBe('id  is not a string')
      }
    })

    it('should fail retrieving one order by sending an empty orderId', async () => {
      try {
        await logic.authenticateUser(email, password)
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let totalPrice = 12
        await logic.addOrder(flavors, size, type, totalPrice)
        const orderId = '\t    \n'
        await logic.retrieveOneOrder(orderId)
      } catch (error) {
        expect(error.message).toBe('id is empty')
      }
    })

    it('should fail retrieving one order by sending a undefined orderId', async () => {
      try {
        await logic.authenticateUser(email, password)
        let orderId
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let totalPrice = 12
        await logic.addOrder(flavors, size, type, totalPrice)

        await logic.retrieveOneOrder(orderId)
      } catch (error) {
        expect(error.message).toBe('id is not optional')
      }
    })
  })

  describe('delete one order', () => {
    beforeEach(() => {
      return logic.registerUser(name, surname, email, password)
    })

    it('should succeed removing an existing order', async () => {
      await logic.authenticateUser(email, password)

      let type = 'cone'
      let type2 = 'tarrina'
      let size = 'big'
      let size2 = 'small'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let flavors2 = ['lemon', 'strawberry', 'cheesecake']
      let totalPrice = 12
      await logic.addOrder(flavors2, size2, type2, totalPrice)
      await logic.addOrder(flavors, size, type, totalPrice)
      const allorders = await logic.retrieveUserOrders()
      const orderId = allorders[0].id
      await logic.removeOneOrderBy(orderId)

      const updatedOrders = await logic.retrieveUserOrders()
      expect(updatedOrders).toHaveLength(1)
      expect(updatedOrders[0].size).toBe(size2)
      expect(updatedOrders[0].type).toBe(type2)
    })

    it('should fail removing an order by sending undefined orderId', async () => {
      try {
        await logic.authenticateUser(email, password)

        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        let totalPrice = 12
        let totalPrice2 = 4
        await logic.addOrder(flavors2, size2, type2, totalPrice)
        await logic.addOrder(flavors, size, type, totalPrice2)
        const orderId = undefined
        await logic.removeOneOrderBy(orderId)
      } catch (error) {
        expect(error.message).toBe('id is not optional')
      }
    })

    it('should fail removing an order by sending empty orderId', async () => {
      try {
        await logic.authenticateUser(email, password)
        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        let totalPrice = 12
        await logic.addOrder(flavors2, size2, type2, totalPrice)
        await logic.addOrder(flavors, size, type, totalPrice)
        const orderId = ''
        await logic.removeOneOrderBy(orderId)
      } catch (error) {
        expect(error.message).toBe('id is empty')
      }
    })

    it('should fail removing an order by sending an object as orderId', async () => {
      try {
        await logic.authenticateUser(email, password)
        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        let totalPrice = 12
        await logic.addOrder(flavors2, size2, type2, totalPrice)
        await logic.addOrder(flavors, size, type, totalPrice)
        const orderId = []
        await logic.removeOneOrderBy(orderId)
      } catch (error) {
        expect(error.message).toBe('id  is not a string')
      }
    })
  })
  afterAll(() => mongoose.disconnect())
})
