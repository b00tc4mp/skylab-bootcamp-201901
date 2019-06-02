const { default: restApi } = require('.')

const { User, Order, mongoose } = require('gelato-data')
const { env: { MONGO_URL_LOGIC_TEST } } = process

describe('rest api', () => {
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
      const res = await restApi.registerUser(name, surname, email, password)
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
        await restApi.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('name is empty')
      }
    })

    it('should fail on undefined name', async () => {
      const name = undefined
      try {
        await restApi.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('name is not optional')
      }
    })
    it('should fail on undefined surname', async () => {
      const surname = undefined
      try {
        await restApi.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('surname is not optional')
      }
    })
    it('should fail on empty surname', async () => {
      const surname = ' \t    \n'
      try {
        await restApi.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('surname is empty')
      }
    })

    it('should fail on empty email', async () => {
      const email = ' \t    \n'
      try {
        await restApi.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('email is empty')
      }
    })

    it('should fail on undefined email', async () => {
      const email = undefined
      try {
        await restApi.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('email is not optional')
      }
    })
    it('missing character on email', async () => {
      const email = 'a.com'
      try {
        await restApi.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe(`${email} is not an e-mail`)
      }
    })

    it('should fail on empty password', async () => {
      const password = ' \t    \n'
      try {
        await restApi.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('password is empty')
      }
    })

    it('should fail on undefined password', async () => {
      const password = undefined
      try {
        await restApi.registerUser(name, surname, email, password)
      } catch (error) {
        expect(error.message).toBe('password is not optional')
      }
    })
  })

  describe('authenticate user', () => {
    beforeEach(() =>
      restApi.registerUser(name, surname, email, password)
    )

    it('should succeed on correct user credential', async () => {
      const response = await restApi.authenticateUser(email, password)
      expect(response).toBeDefined()
      const { token } = response
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
    })

    it('should fail on incorrect email', async () => {
      let email2 = 'daniela@gmail.com'
      try {
        await restApi.authenticateUser(email2, password)
      } catch (error) {
        expect(error.message).toBe('wrong credentials')
      }
    })

    it('should fail using an object as email', async () => {
      let email2 = []
      try {
        await restApi.authenticateUser(email2, password)
      } catch (error) {
        expect(error.message).toBe('email  is not a string')
      }
    })

    it('should fail using an object as email', async () => {
      let email3 = '234'
      try {
        await restApi.authenticateUser(email3, password)
      } catch (error) {
        expect(error.message).toBe('wrong credentials')
      }
    })

    it('should fail using an object as email', async () => {
      let email4 = '234@gmail'
      try {
        await restApi.authenticateUser(email4, password)
      } catch (error) {
        expect(error.message).toBe('wrong credentials')
      }
    })

    it('should fail on incorrect password', async () => {
      let password2 = '782'
      try {
        await restApi.authenticateUser(email, password2)
      } catch (error) {
        expect(error.message).toBe('wrong credentials')
      }
    })

    it('should fail on undefined password', async () => {
      let password3
      try {
        await restApi.authenticateUser(email, password3)
      } catch (error) {
        expect(error.message).toBe('password is not optional')
      }
    })

    it('should fail using an object as a password', async () => {
      let password4 = []
      try {
        await restApi.authenticateUser(email, password4)
      } catch (error) {
        expect(error.message).toBe('password  is not a string')
      }
    })
  })

  describe('retrieve user', () => {
    beforeEach(async () => { await restApi.registerUser(name, surname, email, password) })

    it('should succeed retrieving an existing user with correct id', async () => {
      const _token = await restApi.authenticateUser(email, password)
      // let { sub } = jwt.decode(_token.token)

      const _user = await restApi.retrieveUser(_token.token)
      // expect(_user.id).toBe(undefined)
      expect(_user.name).toEqual(name)
      expect(_user.surname).toEqual(surname)
      expect(_user.email).toEqual(email)
      expect(_user.password).toBe(undefined)
    })

    it('should fail retrieving an existing user with in-correct id', async () => {
      const token = '64646446464644'
      try {
        await restApi.retrieveUser(token)
      } catch (error) {
        expect(error.message).toEqual('jwt malformed')
      }
    })

    it('should fail retrieving an existing user with in-correct id', async () => {
      const token2 = ' \t    \n'
      try {
        await restApi.retrieveUser(token2)
      } catch (error) {
        expect(error.message).toEqual('token is empty')
      }
    })

    it('should fail retrieving an existing user with in-correct id', async () => {
      const token3 = undefined
      try {
        await restApi.retrieveUser(token3)
      } catch (error) {
        expect(error.message).toEqual('token is not optional')
      }
    })

    it('should fail retrieving an existing user with in-correct id', async () => {
      const token4 = ''
      try {
        await restApi.retrieveUser(token4)
      } catch (error) {
        expect(error.message).toEqual('token is empty')
      }
    })
  })

  describe('add an order', () => {
    beforeEach(() => {
      return restApi.registerUser(name, surname, email, password)
    })

    it('should succeed adding an order on existing user', async () => {
      const res = await restApi.authenticateUser(email, password)
      // let { sub } = jwt.decode(res.token)
      let _token = res.token

      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']

      const orderResponse = await restApi.addOrder(_token, flavors, size, type)
      expect(orderResponse).toBeDefined()
      const orders = await Order.find()
      expect(orders).toBeDefined()
      expect(orders[0].type).toBe('cone')
      expect(orders[0].size).toBe('big')
      expect.arrayContaining(orders[0].flavors)
    })

    it('should fail adding an order with empty token', async () => {
      let client = ' \t    \n'

      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']

      try {
        await restApi.addOrder(client, flavors, size, type)
      } catch (error) {
        expect(error.message).toBe('token is empty')
      }
    })

    it('should fail adding an order with wrong token', async () => {
      let client = '234'

      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']

      try {
        await restApi.addOrder(client, flavors, size, type)
      } catch (error) {
        expect(error.message).toBe('jwt malformed')
      }
    })

    it('should fail adding an order with undefined token', async () => {
      let client

      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']

      try {
        await restApi.addOrder(client, flavors, size, type)
      } catch (error) {
        expect(error.message).toBe('token is not optional')
      }
    })

    it('should fail adding an order with wrong token format', async () => {
      let client = []

      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']

      try {
        await restApi.addOrder(client, flavors, size, type)
      } catch (error) {
        expect(error.message).toBe('token  is not a string')
      }
    })

    it('should fail adding an order with empty type', async () => {
      const res = await restApi.authenticateUser(email, password)
      let _token = res.token

      let type = ' \t    \n'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']

      try {
        await restApi.addOrder(_token, flavors, size, type)
      } catch (error) {
        expect(error.message).toBe('type is empty')
      }
    })

    it('should fail adding an order with undefined type', async () => {
      const res = await restApi.authenticateUser(email, password)
      let _token = res.token

      let type
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']

      try {
        await restApi.addOrder(_token, flavors, size, type)
      } catch (error) {
        expect(error.message).toBe('type is not optional')
      }
    })

    it('should fail adding an order with empty size', async () => {
      const res = await restApi.authenticateUser(email, password)
      let _token = res.token

      let type = 'cone'
      let size = ' \t    \n'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']

      try {
        await restApi.addOrder(_token, flavors, size, type)
      } catch (error) {
        expect(error.message).toBe('size is empty')
      }
    })

    it('should fail adding an order with undefined size', async () => {
      const res = await restApi.authenticateUser(email, password)
      let _token = res.token

      let type = 'cone'
      let size
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']

      try {
        await restApi.addOrder(_token, flavors, size, type)
      } catch (error) {
        expect(error.message).toBe('size is not optional')
      }
    })
  })

  describe('delete an user', () => {
    beforeEach(() => {
      return restApi.registerUser(name, surname, email, password)
    })

    it('should succeed eliminating an existing user', async () => {
      const res = await restApi.authenticateUser(email, password)
      let _token = res.token
      const response = await restApi.deleteUser(_token)
      expect(response.message).toBe('User deleted.')
    })

    it('should fail eliminating an existing user with undefined user', async () => {
      let _token
      try {
        await restApi.deleteUser(_token)
      } catch (error) {
        expect(error.message).toBe('token is not optional')
      }
    })

    it('should fail eliminating an existing user with empty token', async () => {
      // const res = await restApi.authenticateUser(email, password)
      let _token
      try {
        await restApi.deleteUser(_token)
      } catch (error) {
        expect(error.message).toBe('token is not optional')
      }
    })

    it('should fail eliminating an existing user with empty wrong token', async () => {
      // const res = await restApi.authenticateUser(email, password)
      let _token = '82368926321'
      try {
        await restApi.deleteUser(_token)
      } catch (error) {
        expect(error.message).toBe('jwt malformed')
      }
    })

    it('should fail eliminating an existing user with ', async () => {
      // const res = await restApi.authenticateUser(email, password)
      let _token = []
      try {
        await restApi.deleteUser(_token)
      } catch (error) {
        expect(error.message).toBe('token  is not a string')
      }
    })

    it('should fail eliminating an existing user with empty token', async () => {
      // const res = await restApi.authenticateUser(email, password)
      let _token = ''
      try {
        await restApi.deleteUser(_token)
      } catch (error) {
        expect(error.message).toBe('token is empty')
      }
    })
  })

  describe('retrieve orders by user id', () => {
    beforeEach(async () => {
      await restApi.registerUser(name, surname, email, password)
    })
    it('should succeed retrieving orders by user id', async () => {
      const _token = await restApi.authenticateUser(email, password)
      const id = _token.token
      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      await restApi.addOrder(id, flavors, size, type)
      await restApi.addOrder(id, flavors, size, type)
      const orders = await restApi.retrieveOrdersByUserId(id)
      expect(orders).toBeDefined()
      expect(orders).toHaveLength(2)
    })

    it('should fail retrieving orders by empty id', async () => {
      try {
        await restApi.authenticateUser(email, password)
        const id = ''
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        await restApi.addOrder(id, flavors, size, type)
        await restApi.addOrder(id, flavors, size, type)
        const orders = await restApi.retrieveOrdersByUserId(id)
        expect(orders).toBeDefined()
        expect(orders).toHaveLength(2)
      } catch (error) {
        expect(error.message).toBe('token is empty')
      }
    })

    it('should fail retrieving orders by undefined id', async () => {
      try {
        await restApi.authenticateUser(email, password)
        const id = undefined
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        await restApi.addOrder(id, flavors, size, type)
        await restApi.addOrder(id, flavors, size, type)
        const orders = await restApi.retrieveOrdersByUserId(id)
        expect(orders).toBeDefined()
        expect(orders).toHaveLength(2)
      } catch (error) {
        expect(error.message).toBe('token is not optional')
      }
    })

    it('should fail retrieving orders by object id', async () => {
      try {
        await restApi.authenticateUser(email, password)
        const id = []
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        await restApi.addOrder(id, flavors, size, type)
        await restApi.addOrder(id, flavors, size, type)
        const orders = await restApi.retrieveOrdersByUserId(id)
        expect(orders).toBeDefined()
        expect(orders).toHaveLength(2)
      } catch (error) {
        expect(error.message).toBe('token  is not a string')
      }
    })
  })

  describe('retrieve One Order by user and order id', () => {
    beforeEach(() => {
      return restApi.registerUser(name, surname, email, password)
    })
    it('should succeed retrieving one order', async () => {
      const _token = await restApi.authenticateUser(email, password)
      const userToken = _token.token
      let type = 'cone'
      let size = 'big'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      await restApi.addOrder(_token.token, flavors, size, type)
      const allorders = await restApi.retrieveOrdersByUserId(userToken)
      const orderId = allorders[0].id
      const retrievedOrderByUserAndOrderId = await restApi.retrieveOneOrder(userToken, orderId)
      expect(retrievedOrderByUserAndOrderId).toHaveLength(1)
    })

    it('should fail retrieving one order by undefined token', async () => {
      try {
        const _token = await restApi.authenticateUser(email, password)
        const userToken = undefined
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        await restApi.addOrder(_token.token, flavors, size, type)
        const allorders = await restApi.retrieveOrdersByUserId(userToken)
        const orderId = allorders[0].id
        await restApi.retrieveOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('token is not optional')
      }
    })

    it('should fail retrieving one order by empty token', async () => {
      try {
        const _token = await restApi.authenticateUser(email, password)
        const userToken = ' \t    \n'
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        await restApi.addOrder(_token.token, flavors, size, type)
        const allorders = await restApi.retrieveOrdersByUserId(userToken)
        const orderId = allorders[0].id
        await restApi.retrieveOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('token is empty')
      }
    })

    it('should fail retrieving one order by sending and object as token', async () => {
      try {
        const _token = await restApi.authenticateUser(email, password)
        const userToken = []
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        await restApi.addOrder(_token.token, flavors, size, type)
        const allorders = await restApi.retrieveOrdersByUserId(userToken)
        const orderId = allorders[0].id
        await restApi.retrieveOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('token  is not a string')
      }
    })

    it('should fail retrieving one order by sending and object as orderId', async () => {
      try {
        const _token = await restApi.authenticateUser(email, password)
        const userToken = _token.token
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        await restApi.addOrder(_token.token, flavors, size, type)
        const orderId = []
        await restApi.retrieveOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('id  is not a string')
      }
    })

    it('should fail retrieving one order by sending an empty orderId', async () => {
      try {
        const _token = await restApi.authenticateUser(email, password)
        const userToken = _token.token
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        await restApi.addOrder(_token.token, flavors, size, type)
        const orderId = '\t    \n'
        await restApi.retrieveOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('id is empty')
      }
    })

    it('should fail retrieving one order by sending a undefined orderId', async () => {
      try {
        const _token = await restApi.authenticateUser(email, password)
        const userToken = _token.token
        let type = 'cone'
        let size = 'big'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        await restApi.addOrder(userToken, flavors, size, type)
        const orderId = undefined
        await restApi.retrieveOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('id is not optional')
      }
    })
  })

  describe('delete one order', () => {
    beforeEach(() => {
      return restApi.registerUser(name, surname, email, password)
    })

    it('should succeed removing an existing order', async () => {
      const _token = await restApi.authenticateUser(email, password)
      const userToken = _token.token

      let type = 'cone'
      let type2 = 'tarrina'
      let size = 'big'
      let size2 = 'small'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let flavors2 = ['lemon', 'strawberry', 'cheesecake']
      await restApi.addOrder(userToken, flavors2, size2, type2)
      await restApi.addOrder(userToken, flavors, size, type)
      const allorders = await restApi.retrieveOrdersByUserId(userToken)
      const orderId = allorders[0].id
      await restApi.removeOneOrder(userToken, orderId)

      const updatedOrders = await restApi.retrieveOrdersByUserId(userToken)
      expect(updatedOrders).toHaveLength(1)
      expect(updatedOrders[0].size).toBe(size)
      expect(updatedOrders[0].type).toBe(type)
    })

    it('should fail removing an order by sending undefined orderId', async () => {
      try {
        const _token = await restApi.authenticateUser(email, password)
        const userToken = _token.token
        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        await restApi.addOrder(userToken, flavors2, size2, type2)
        await restApi.addOrder(userToken, flavors, size, type)
        const orderId = undefined
        await restApi.removeOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('id is not optional')
      }
    })

    it('should fail removing an order by sending empty orderId', async () => {
      try {
        const _token = await restApi.authenticateUser(email, password)
        const userToken = _token.token
        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        await restApi.addOrder(userToken, flavors2, size2, type2)
        await restApi.addOrder(userToken, flavors, size, type)
        const orderId = ''
        await restApi.removeOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('id is empty')
      }
    })

    it('should fail removing an order by sending an object as orderId', async () => {
      try {
        const _token = await restApi.authenticateUser(email, password)
        const userToken = _token.token
        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        await restApi.addOrder(userToken, flavors2, size2, type2)
        await restApi.addOrder(userToken, flavors, size, type)
        const orderId = []
        await restApi.removeOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('id  is not a string')
      }
    })

    it('should fail removing an order by sending an undefined token', async () => {
      try {
        await restApi.authenticateUser(email, password)
        const userToken = undefined

        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        await restApi.addOrder(userToken, flavors2, size2, type2)
        await restApi.addOrder(userToken, flavors, size, type)
        const allorders = await restApi.retrieveOrdersByUserId(userToken)
        const orderId = allorders[0].id
        await restApi.removeOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('token is not optional')
      }
    })

    it('should fail removing an order by sending empty token', async () => {
      try {
        await restApi.authenticateUser(email, password)
        const userToken = ''

        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        await restApi.addOrder(userToken, flavors2, size2, type2)
        await restApi.addOrder(userToken, flavors, size, type)
        const allorders = await restApi.retrieveOrdersByUserId(userToken)
        const orderId = allorders[0].id
        await restApi.removeOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('token is empty')
      }
    })

    it('should fail removing an order by sending wrong token', async () => {
      try {
        await restApi.authenticateUser(email, password)
        const userToken = '23927932'

        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        await restApi.addOrder(userToken, flavors2, size2, type2)
        await restApi.addOrder(userToken, flavors, size, type)
        const allorders = await restApi.retrieveOrdersByUserId(userToken)
        const orderId = allorders[0].id
        await restApi.removeOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('jwt malformed')
      }
    })

    it('should fail removing an order by sending an object as token', async () => {
      try {
        await restApi.authenticateUser(email, password)
        const userToken = []

        let type = 'cone'
        let type2 = 'tarrina'
        let size = 'big'
        let size2 = 'small'
        let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
        let flavors2 = ['lemon', 'strawberry', 'cheesecake']
        await restApi.addOrder(userToken, flavors2, size2, type2)
        await restApi.addOrder(userToken, flavors, size, type)
        const allorders = await restApi.retrieveOrdersByUserId(userToken)
        const orderId = allorders[0].id
        await restApi.removeOneOrder(userToken, orderId)
      } catch (error) {
        expect(error.message).toBe('token  is not a string')
      }
    })
  })

  describe('retrieve all users orders', () => {
    let name1 = 'test1'
    let surname1 = 'test1'
    let email1 = 'test1@gmail.com'
    let password1 = '123'
    beforeEach(async () => {
      await restApi.registerUser(name, surname, email, password)
      await restApi.registerUser(name1, surname1, email1, password1)
    })
    it('should succeed retrieving all users orders', async () => {
      const _token = await restApi.authenticateUser(email, password)
      const _token1 = await restApi.authenticateUser(email1, password1)

      const userToken = _token.token
      const userToken1 = _token1.token

      let type = 'cone'
      let type2 = 'tarrina'
      let size = 'big'
      let size2 = 'small'
      let flavors = ['vanilla', 'chocolate', 'blackberry rosé']
      let flavors2 = ['lemon', 'strawberry', 'cheesecake']
      await restApi.addOrder(userToken, flavors2, size2, type2)
      await restApi.addOrder(userToken1, flavors, size, type)

      const allUsersOrders = await restApi.retrieveAllUsersOrders()
      expect(allUsersOrders).toBeDefined()
      expect(allUsersOrders).toHaveLength(2)
      expect(allUsersOrders[0].type).toBe(type2)
      expect(allUsersOrders[0].size).toBe(size2)
      expect(allUsersOrders[1].type).toBe(type)
      expect(allUsersOrders[1].size).toBe(size)
    })

    it('should succeed retrieving all users orders', async () => {
      try {
        await restApi.authenticateUser(email, password)
        await restApi.authenticateUser(email1, password1)
        await restApi.retrieveAllUsersOrders()
      } catch (error) {
        expect(error.message).toBe("Sorry, you don't have any order")
      }
    })
  })

  afterAll(() => mongoose.disconnect())
})
