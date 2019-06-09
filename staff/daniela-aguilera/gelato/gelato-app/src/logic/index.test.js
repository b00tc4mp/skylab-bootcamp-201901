const { default: logic } = require('.')
const { default: restApi } = require('../../src/api')
const { User, Order, mongoose } = require('gelato-data')
const { env: { MONGO_URL_LOGIC_TEST } } = process

describe('logic', () => {
  let name, surname, email, password

  beforeAll(() => mongoose.connect(MONGO_URL_LOGIC_TEST, { useNewUrlParser: true }))

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
    beforeEach(async () => { await logic.registerUser(name, surname, email, password) })

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
      // let { sub } = jwt.decode(res.token)

      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice = 12

      const orderResponse = await logic.addOrder(flavors, size, type, totalPrice)
      expect(orderResponse).toBeDefined()
      const orders = await Order.find()
      expect(orders).toBeDefined()
      expect(orders[0].type).toBe('cone')
      expect(orders[0].size).toBe('big')
      expect.arrayContaining(orders[0].flavors)
    })

    it('should fail adding an order with empty type', async () => {
      await logic.authenticateUser(email, password)

      let type = ' \t    \n'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice = 12

      try {
        await logic.addOrder(flavors, size, type, totalPrice)
      } catch (error) {
        expect(error.message).toBe('type is empty')
      }
    })

    it('should fail adding an order with undefined type', async () => {
      await logic.authenticateUser(email, password)

      let type
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice = 12

      try {
        await logic.addOrder(flavors, size, type, totalPrice)
      } catch (error) {
        expect(error.message).toBe('type is not optional')
      }
    })

    it('should fail adding an order with empty size', async () => {
      await logic.authenticateUser(email, password)

      let type = 'cone'
      let size = ' \t    \n'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice = 12

      try {
        await logic.addOrder(flavors, size, type, totalPrice)
      } catch (error) {
        expect(error.message).toBe('size is empty')
      }
    })

    it('should fail adding an order with undefined size', async () => {
      await logic.authenticateUser(email, password)
      let type = 'cone'
      let size
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let totalPrice = 12

      try {
        await logic.addOrder(flavors, size, type, totalPrice)
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
      const res = await logic.deleteUser()
      expect(res).toBeDefined()
      const res2 = await User.findOne({ email }).lean()
      expect(res2).toBeNull()
    })

    it('should fail eliminating an existing user with undefined user', async () => {
      try {
        await logic.deleteUser()
      } catch (error) {
        expect(error.message).toBe('User not found')
      }
    })

    describe('retrieve orders by user id', () => {
      beforeEach(async () => {
        await logic.registerUser(name, surname, email, password)
      })
      it('should succeed retrieving orders by user id', async () => {
        await logic.authenticateUser(email, password)
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let totalPrice = 12
  
        await logic.addOrder(id, flavors, size, type, totalPrice)
        await logic.addOrder(id, flavors, size, type, totalPrice)
        const orders = await logic.retrieveUserOrders(id)
        expect(orders).toBeDefined()
        expect(orders).toHaveLength(2)
      })
  
      // it('should fail retrieving orders by empty id', async () => {
      //   try {
      //     await .authenticateUser(email, password)
      //     const id = ''
      //     let type = 'cone'
      //     let size = 'big'
      //     let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      //     let totalPrice = 12
      //     await restApi.addOrder(id, flavors, size, type, totalPrice)
      //     await restApi.addOrder(id, flavors, size, type, totalPrice)
      //     const orders = await restApi.retrieveOrdersByUserId(id)
      //     expect(orders).toBeDefined()
      //     expect(orders).toHaveLength(2)
      //   } catch (error) {
      //     expect(error.message).toBe('token is empty')
      //   }
      // })
  
  })

  afterAll(async () => {
    await User.deleteMany()
    await Order.deleteMany()
    mongoose.disconnect()
  })

  // afterAll(() => mongoose.disconnect())
})
