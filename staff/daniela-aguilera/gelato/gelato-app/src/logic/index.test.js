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
      debugger
      const res = await logic.authenticateUser(email, password)

      debugger
      expect(logic.__userToken__).toBeDefined()
      debugger
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
      const _token = await restApi.authenticateUser(email, password)
      // let { sub } = jwt.decode(_token.token)

      const _user = await logic.retrieveUserBy(_token.token)

      // expect(_user.id).toBe(undefined)
      expect(_user.name).toEqual(name)
      expect(_user.surname).toEqual(surname)
      expect(_user.email).toEqual(email)
      expect(_user.password).toBe(undefined)
    })

    it('should fail retrieving an existing user with in-correct id', async () => {
      const token = '64646446464644'
      try {
        await logic.retrieveUserBy(token)
      } catch (error) {
        expect(error.message).toEqual('jwt malformed')
      }
    })

    it('should fail retrieving an existing user with in-correct id', async () => {
      const token2 = ' \t    \n'
      try {
        await logic.retrieveUserBy(token2)
      } catch (error) {
        expect(error.message).toEqual('token is empty')
      }
    })

    it('should fail retrieving an existing user with in-correct id', async () => {
      const token3 = undefined
      try {
        await logic.retrieveUserBy(token3)
      } catch (error) {
        expect(error.message).toEqual('token is not optional')
      }
    })

    it('should fail retrieving an existing user with in-correct id', async () => {
      const token4 = ''
      try {
        await logic.retrieveUserBy(token4)
      } catch (error) {
        expect(error.message).toEqual('token is empty')
      }
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await Order.deleteMany()
    mongoose.disconnect()
  })

  // afterAll(() => mongoose.disconnect())
})
