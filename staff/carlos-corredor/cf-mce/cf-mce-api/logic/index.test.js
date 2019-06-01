const dotenv = require('dotenv')
const { mongoose, models } = require('cf-mce-data')
const { errors: {
    LogicError,
    RequirementError,
    ValueError,
    FormatError,
    UnauthorizedError
} } = require('cf-mce-common')
require('cf-mce-common/utils/array-random.polyfill')
require('cf-mce-common/utils/math-random.polyfill')

const { expect } = require('chai')
const logic = require('.')
const argon2 = require('argon2')

dotenv.config()

const { User, Customer, ElectronicModule, Product, Note } = models
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', () => {
    let name, surname, email, password, category, phone, address, nid, notes, text, date, author, id
    
    before(() => mongoose.connect(url, { useNewUrlParser: true }))
    
    const categories = ['MASTER', 'TECHNICIAN', 'ASSISTANT']

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        category = categories[Math.floor(Math.random()*categories.length)]
        const hash = await argon2.hash(password)
        await User.create({ name, surname, email, password: hash, category })

    })
    
    describe('user', () => {


        describe('register user', () => {
            it('should succeed on correct data', async () => {
                await User.deleteMany()
                
                const res = await logic.registerUser(name, surname, email, password, category)
    
                expect(res).to.be.undefined
    
                const users = await User.find()
    
                expect(users).to.exist
                expect(users).to.have.lengthOf(1)
    
                const [user] = users
    
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
    
                expect(user.password).to.exist
    
                expect(await argon2.verify(user.password, password)).to.be.true
            })

            it('should fail when retrying to register on already existing user', async () => {
                
                try {
                    await logic.registerUser(name, surname, email, password, category)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceof(LogicError)

                    expect(error.message).to.equal(`user with email "${email}" already exists`)
                }
            })

            it('should fail on undefined name', () => {
                name = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                name = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                name = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                surname = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                surname = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                surname = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                email = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `email is not optional`)

            })

            it('should fail on null email', () => {
                email = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                email = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'email is empty')

            })

            it('should fail on blank email', () => {
                email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email format', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, category)).to.throw(FormatError, `${nonEmail} is not an e-mail`)

            })

            it('should fail on undefined password', () => {
                password = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                password = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                password = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                password = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on undefined category', () => {
                category = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `category is not optional`)

            })

            it('should fail on null category', () => {
                category = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `category is not optional`)
            })

            it('should fail on empty category', () => {
                category = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'category is empty')

            })

            it('should fail on blank category', () => {
                category = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'category is empty')
            })

            it('should fail on non-category category', () => {
                const nonCategory = 'non-category'
                
                expect(() => logic.registerUser(name, surname, email, password, nonCategory)).to.throw(LogicError, `${nonCategory} is not a valid option for category`)

            })

        })

        describe('authenticate user', () => {

            it('should succeed on correct user credential', async () => {
                const user = await User.findOne({ email })
                id = await logic.authenticateUser(email, password)
                expect(id).to.exist
                expect(id).to.be.a('string')
                expect(id).to.equal(user.id)
            })

            it('should fail on non-existing user', async () => {
                try {
                    await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with email "${email}" does not exist`)
                }
            })

            it('should fail on wrong password', async () => {
                try {
                    await logic.authenticateUser(email, password = 'non-password')

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(UnauthorizedError)

                    expect(error.message).to.equal('wrong credentials')
                }
            })

            it('should fail on undefined email', () => {
                email = undefined

                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `email is not optional`)

            })

            it('should fail on null email', () => {
                email = null

                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                email = ''

                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'email is empty')

            })

            it('should fail on blank email', () => {
                email = ' \t    \n'

                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email format', () => {
                const nonEmail = 'non-email'

                expect(() => logic.authenticateUser(nonEmail, password)).to.throw(FormatError, `${nonEmail} is not an e-mail`)

            })

            it('should fail on undefined password', () => {
                password = undefined

                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                password = null

                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                password = ''

                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                password = ' \t    \n'

                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'password is empty')
            })
        })

        describe('retrieve user', () => {

            it('should succeed on correct id from existing user', async () => {
                const user = await User.findOne()
                const _user = await logic.retrieveUser(user.id)
    
                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)
                expect(_user.category).to.equal(category)
                expect(_user.password).to.be.undefined
            })

            it('should fail on non-existing user id', async () => {
                id = '123456789012345678901234'
                try {
                    await logic.retrieveUser(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id "${id}" does not exist`)
                }
            })

            it('should fail on non-24 characters user id', async () => {
                id = '12345678901234567890123'
                try {
                    await logic.retrieveUser(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(FormatError)

                    expect(error.message).to.equal(`${id} is not a valid id`)
                }
            })

            it('should fail on undefined id', () => {
                id = undefined

                expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)

            })

            it('should fail on null id', () => {
                id = null

                expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                id = ''

                expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')

            })

            it('should fail on blank id', () => {
                id = ' \t    \n'

                expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')
            })

        })
        
        describe('update user', () => {

            it('should succeed on correct data', async () => {
                const user = await User.findOne().lean()

                const data = { email: 'e@mail.com' }

                await logic.updateUser(user._id.toString(), data)

                const userUpdated = await User.findById(user._id.toString()).lean()

                expect(userUpdated).to.exist

                expect(userUpdated._id.toString()).to.equal(user._id.toString())
                
                const keys = Object.keys(user)
                expect(userUpdated).to.include.keys(keys)
                
                expect(Object.keys(userUpdated).length).to.equal(keys.length)

                expect(userUpdated.email).to.not.equal(user.email)
                expect(userUpdated.email).to.equal(data.email)
            })

            it('should be equal on empty data', async () => {
                const user = await User.findOne()

                const data = { }

                await logic.updateUser(user.id, data)

                const userUpdated = await User.findById(user.id)

                expect(userUpdated).to.exist

                expect(userUpdated.id).to.equal(user.id)

                expect(userUpdated).to.deep.equal(user)
            })

            it('should fail on tray to update id', async () => {
                id = '123456789012345678901234'
                const emailToUpdate = 'e@mail.com'
                try {
                    const user = await User.findOne()

                    const data = { emailToUpdate, id }
                    
                    await logic.updateUser(user.id, data)

                    throw Error('should not reach this point')
                } catch (error) {
                    
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(ValueError)

                    expect(error.message).to.equal('data id does not match criteria id')
                }
            })

            it('should fail on undefined id', () => {
                id = undefined
                const data = {}

                expect(() => logic.updateUser(id, data)).to.throw(RequirementError, `id is not optional`)

            })

            it('should fail on null id', () => {
                id = null
                const data = {}

                expect(() => logic.updateUser(id, data)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                id = ''
                const data = {}

                expect(() => logic.updateUser(id, data)).to.throw(ValueError, 'id is empty')

            })

            it('should fail on blank id', () => {
                id = ' \t    \n'
                const data = {}

                expect(() => logic.updateUser(id, data)).to.throw(ValueError, 'id is empty')
            })

            it('should fail on undefined data object', async () => {
                const user = await User.findOne()

                expect(() => logic.updateUser(user.id)).to.throw(RequirementError, `data is not optional`)

            })

            it('should fail on null data object', async () => {
                const user = await User.findOne()
                const data = null

                expect(() => logic.updateUser(user.id, data)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on non data object', async () => {
                const user = await User.findOne()
                const data = ''

                expect(() => logic.updateUser(user.id, data)).to.throw(TypeError, `data ${data} is not a object`)

            })

        })

        describe('delete user', () => {
            it('should succeed on correct data', async () => {
                const user = await User.findOne()
                await logic.deleteUser(user.id)
                const userDeleted = await User.findById(user.id)
                expect(userDeleted).to.not.exist
            })

            it('should fail on non-matching user id', async () => {
                id = '123456789012345678901234'
                try {
                await logic.deleteUser(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id "${id}" does not exist`)
                }
            })

            it('should fail on non-24 characters user id', async () => {
                id = '12345678901234567890123'
                try {
                    await logic.deleteUser(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(FormatError)

                    expect(error.message).to.equal(`${id} is not a valid id`)
                }
            })

            it('should fail on undefined id', () => {
                id = undefined

                expect(() => logic.deleteUser(id)).to.throw(RequirementError, `id is not optional`)

            })

            it('should fail on null id', () => {
                id = null

                expect(() => logic.deleteUser(id)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                id = ''

                expect(() => logic.deleteUser(id)).to.throw(ValueError, 'id is empty')

            })

            it('should fail on blank id', () => {
                id = ' \t    \n'

                expect(() => logic.deleteUser(id)).to.throw(ValueError, 'id is empty')
            })


        })
    })

    describe('customer', () => {

        beforeEach(async () => {
            await Customer.deleteMany()

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            phone = `phone-${Math.random()}`
            address = `address-${Math.random()}`
            nid = `nid-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            
            await Customer.create({ name, surname, phone, address, nid, email })
        })

        describe('register customer', () => {
            it('should succeed on correct data', async () => {
                await Customer.deleteMany()
                const res = await logic.registerCustomer(name, surname, phone, address, nid, email)
    
                expect(res).to.be.undefined
    
                const customers = await Customer.find()
    
                expect(customers).to.exist
                expect(customers).to.have.lengthOf(1)
    
                const [customer] = customers
    
                expect(customer.name).to.equal(name)
                expect(customer.surname).to.equal(surname)
                expect(customer.phone).to.equal(phone)
                expect(customer.address).to.equal(address)
                expect(customer.nid).to.equal(nid)
                expect(customer.email).to.equal(email)
        
            })

            it('should succeed on correct data with optional items to undefined', async () => {
                await Customer.deleteMany()
                surname = undefined
                phone = undefined
                address = undefined
                const res = await logic.registerCustomer(name, surname, phone, address, nid)
    
                expect(res).to.be.undefined
    
                const customers = await Customer.find()
    
                expect(customers).to.exist
                expect(customers).to.have.lengthOf(1)
    
                const [customer] = customers
    
                expect(customer.name).to.equal(name)
                expect(customer.surname).to.not.exist
                expect(customer.phone).to.not.exist
                expect(customer.address).to.not.exist
                expect(customer.nid).to.equal(nid)
                expect(customer.email).to.not.exist
        
            })

            it('should succeed on correct data with optional items to null', async () => {
                await Customer.deleteMany()
                surname = null
                phone = null
                address = null
                email = null
                
                const res = await logic.registerCustomer(name, surname, phone, address, nid, email)
    
                expect(res).to.be.undefined
    
                const customers = await Customer.find()
    
                expect(customers).to.exist
                expect(customers).to.have.lengthOf(1)
    
                const [customer] = customers
    
                expect(customer.name).to.equal(name)
                expect(customer.surname).to.not.exist
                expect(customer.phone).to.not.exist
                expect(customer.address).to.not.exist
                expect(customer.nid).to.equal(nid)
                expect(customer.email).to.not.exist
        
            })

            it('should fail when retrying to register on already existing customer', async () => {
                
                try {
                    await logic.registerCustomer(name, surname, phone, address, nid, email)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceof(LogicError)

                    expect(error.message).to.equal(`customer with nid "${nid}" already exists`)
                }
            })

            it('should fail on undefined name', () => {
                name = undefined

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                name = null

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                name = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                name = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on empty surname', () => {
                surname = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                surname = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on empty phone', () => {
                phone = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'phone is empty')
            })

            it('should fail on blank phone', () => {
                phone = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'phone is empty')
            })

            it('should fail on empty address', () => {
                address = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'address is empty')
            })

            it('should fail on blank address', () => {
                address = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'address is empty')
            })

            it('should fail on undefined nid', () => {
                nid = undefined

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(RequirementError, `nid is not optional`)
            })

            it('should fail on null nid', () => {
                nid = null

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(RequirementError, `nid is not optional`)
            })

            it('should fail on empty nid', () => {
                nid = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'nid is empty')
            })

            it('should fail on blank nid', () => {
                nid = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'nid is empty')
            })

            it('should fail on empty email', () => {
                email = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'email is empty')

            })

            it('should fail on blank email', () => {
                email = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email format', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, nonEmail)).to.throw(FormatError, `${nonEmail} is not an e-mail`)

            })
        })

        describe('retrieve customer', () => {

            it('should succeed on correct id from existing customer', async () => {
                const customer = await Customer.findOne()
                const _customer = await logic.retrieveCustomer(customer.id)
                expect(_customer.id).to.be.undefined
                expect(_customer.name).to.equal(name)
                expect(_customer.surname).to.equal(surname)
                expect(_customer.phone).to.equal(phone)
                expect(_customer.address).to.equal(address)
                expect(_customer.nid).to.equal(nid)
                expect(_customer.email).to.equal(email)
                expect(_customer.notes).to.deep.equal(customer.notes)
 
            })

            it('should fail on non-existing customer id', async () => {
                id = '123456789012345678901234'
                try {
                    await logic.retrieveCustomer(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`customer with id "${id}" does not exist`)
                }
            })

            it('should fail on non-24 characters user id', async () => {
                id = '12345678901234567890123'
                try {
                    await logic.retrieveCustomer(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(FormatError)

                    expect(error.message).to.equal(`${id} is not a valid id`)
                }
            })

            it('should fail on undefined id', () => {
                id = undefined

                expect(() => logic.retrieveCustomer(id)).to.throw(RequirementError, `id is not optional`)

            })

            it('should fail on null id', () => {
                id = null

                expect(() => logic.retrieveCustomer(id)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                id = ''

                expect(() => logic.retrieveCustomer(id)).to.throw(ValueError, 'id is empty')

            })

            it('should fail on blank id', () => {
                id = ' \t    \n'

                expect(() => logic.retrieveCustomer(id)).to.throw(ValueError, 'id is empty')
            })

        })
        
        describe('update customer', () => {

            it('should succeed on correct data', async () => {
                const customer = await Customer.findOne().lean()

                const data = { email: 'e@mail.com' }

                await logic.updateCustomer(customer._id.toString(), data)

                const customerUpdated = await Customer.findById(customer._id.toString()).lean()

                expect(customerUpdated).to.exist

                expect(customerUpdated._id.toString()).to.equal(customer._id.toString())
                
                const keys = Object.keys(customer)
                expect(customerUpdated).to.include.keys(keys)
                
                expect(Object.keys(customerUpdated).length).to.equal(keys.length)

                expect(customerUpdated.email).to.not.equal(customer.email)
                expect(customerUpdated.email).to.equal(data.email)
            })

            it('should be equal on empty data', async () => {// en este caso no funciona "to.deep.equal" en el último expect de esta prueba porque contienen el array "notes" el que a suvez requeriría de otro deep
                const customer = await Customer.findOne().lean()

                const data = { }

                await logic.updateCustomer(customer._id.toString(), data)

                const customerUpdated = await Customer.findById(customer._id.toString()).lean()

                expect(customerUpdated).to.exist

                expect(customerUpdated._id.toString()).to.equal(customer._id.toString())
                
                expect(customerUpdated).to.deep.equal(customer)
            })

            it('should fail on tray to update id', async () => {
                id = '123456789012345678901234'
                const emailToUpdate = 'e@mail.com'
                try {
                    const customer = await Customer.findOne()

                    const data = { emailToUpdate, id }
                    
                    await logic.updateCustomer(customer.id, data)

                    throw Error('should not reach this point')
                } catch (error) {
                    
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(ValueError)

                    expect(error.message).to.equal('data id does not match criteria id')
                }
            })

            it('should fail on undefined id', () => {
                id = undefined
                const data = {}

                expect(() => logic.updateCustomer(id, data)).to.throw(RequirementError, `id is not optional`)

            })

            it('should fail on null id', () => {
                id = null
                const data = {}

                expect(() => logic.updateCustomer(id, data)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                id = ''
                const data = {}

                expect(() => logic.updateCustomer(id, data)).to.throw(ValueError, 'id is empty')

            })

            it('should fail on blank id', () => {
                id = ' \t    \n'
                const data = {}

                expect(() => logic.updateCustomer(id, data)).to.throw(ValueError, 'id is empty')
            })

            it('should fail on undefined data object', async () => {
                const customer = await Customer.findOne()

                expect(() => logic.updateCustomer(customer.id)).to.throw(RequirementError, `data is not optional`)

            })

            it('should fail on null data object', async () => {
                const customer = await Customer.findOne()
                const data = null

                expect(() => logic.updateCustomer(customer.id, data)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on non data object', async () => {
                const customer = await Customer.findOne()
                const data = ''

                expect(() => logic.updateCustomer(customer.id, data)).to.throw(TypeError, `data ${data} is not a object`)

            })

        })

        describe('delete customer', () => {
            it('should succeed on correct data', async () => {
                const customer = await Customer.findOne()
                await logic.deleteCustomer(customer.id)
                const customerDeleted = await Customer.findById(customer.id)
                expect(customerDeleted).to.not.exist
            })

            it('should fail on non-matching customer id', async () => {
                id = '123456789012345678901234'
                try {
                await logic.deleteCustomer(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`customer with id "${id}" does not exist`)
                }
            })

            it('should fail on non-24 characters customer id', async () => {
                id = '12345678901234567890123'
                try {
                    await logic.deleteCustomer(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(FormatError)

                    expect(error.message).to.equal(`${id} is not a valid id`)
                }
            })

            it('should fail on undefined id', () => {
                id = undefined

                expect(() => logic.deleteCustomer(id)).to.throw(RequirementError, `id is not optional`)

            })

            it('should fail on null id', () => {
                id = null

                expect(() => logic.deleteCustomer(id)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                id = ''

                expect(() => logic.deleteCustomer(id)).to.throw(ValueError, 'id is empty')

            })

            it('should fail on blank id', () => {
                id = ' \t    \n'

                expect(() => logic.deleteCustomer(id)).to.throw(ValueError, 'id is empty')
            })

        })

        describe('list customers', () => {
            let customers = []
            const names = ['Carlos', 'Pepe', 'Luis']
            const surnames = ['Corredor', 'Grillo', 'Aparicio']
            const phones = ['123', '456', '789']
            const addresses = ['avenida', 'calle', 'ciudad']
            const emails = ['a', 'b', 'c']
            const criterialist = [
                {name: names.random()},
                {surname: surnames.random()},
                {phone: phones.random()},
                {address: addresses.random()},
                {email: emails.random() + '@mail.com'}
            ]

            beforeEach(async () => {

                await Customer.deleteMany()
                customers = []

                for(let i = 0; i < 20; i++) {
                    name = `${names.random()}`
                    surname = `${surnames.random()}`
                    phone = `${phones.random()}`
                    address = `${addresses.random()}`
                    nid = `nid-${Math.random()}`
                    email = `${emails.random()}@mail.com`
                    
                    await Customer.create({ name, surname, phone, address, nid, email })
                    const customer = await Customer.findOne({nid})
                    customers.push({id: customer.id, name, surname, phone, address, nid, email, notes:[]})
                }
            })

            describe('list all customers', () => {

                it('should succeed and return customers if customers exist without criteria', async () => {
                    const customersListed = await logic.findCustomers()
    
                    expect(customersListed.length).to.equal(customers.length)
    
                    expect(customersListed).to.deep.equal(customers)
    
                })

                it('should succeed and return customers if customers exist with empty object like criteria', async () => {
                    const customersListed = await logic.findCustomers({})
    
                    expect(customersListed.length).to.equal(customers.length)
    
                    expect(customersListed).to.deep.equal(customers)
    
                })

                it('should succeed and return customers if customers exist with null like criteria', async () => {
                    const customersListed = await logic.findCustomers(null)
    
                    expect(customersListed.length).to.equal(customers.length)
    
                    expect(customersListed).to.deep.equal(customers)
    
                })
            })
            
            describe('list customers found by criteria', () => {
                let customersWithCriteria, customersFound, criteria, key
                beforeEach(() => {
                    criteria = criterialist.random()
                    key = Object.keys(criteria)[0]
                    value = criteria[key]
                    customersWithCriteria = []
                    customersFound = []

                    customers.forEach(customer => {
                        if(customer[key] === value) customersWithCriteria.push(customer)
                    })
                })
                
                it('should succeed and return customers found by criteria', async () => {
                    
                    customersFound = await logic.findCustomers(criteria)
                    expect(customersFound.length).to.equal(customersWithCriteria.length)
                    expect(customersFound).to.deep.equal(customersWithCriteria)
                })

                it('should return an empty array on non existing key into criteria object', async () => {
                    criteria = {nombre: 'Carlos'}
    
                    customersFound = await logic.findCustomers(criteria)
                    expect(customersFound).to.have.lengthOf(0)
                    expect(customersFound).to.be.instanceOf(Array)
                })

                it('should return an empty array on non existing value into criteria object', async () => {
                    criteria = {[key]: 'no-existing-value'}
    
                    customersFound = await logic.findCustomers(criteria)
                    expect(customersFound).to.have.lengthOf(0)
                    expect(customersFound).to.be.instanceOf(Array)
                })

                it('should fail on non criteria object', async () => {
                    criteria = ''
    
                    expect(() => logic.findCustomers(criteria)).to.throw(TypeError, `criteria ${criteria} is not a object`)
                })
    
            })
        })

        
        describe('customer notes', () => {

            let user, customer, text

            beforeEach(async () => {
                user = await User.findOne() // aquí había shadowing con la búsqueda por email porque el último mail registrado pertenece a la colección de customers y al buscarlo en el de users, la respuesta era indefinida
                customer = await Customer.findOne()
                text = 'Hola, Mundo!'
                customer.notes = []
                const texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)
                customer.notes = texts.map(text => new Note({ text, author: user.id }))
                await customer.save()
            })

            describe('add customer note', () => {

                beforeEach(async () => {      
                    customer.notes = []
                    await customer.save()
                })

                it('should succeed on existing customer and user', async () => {

                    const res = await logic.addCustomerNote(customer.id, text, user.id)
        
                    expect(res).to.be.undefined
                    
                    const customerWithNewNote = await Customer.findById(customer.id)
        
                    const { notes } = customerWithNewNote
        
                    expect(notes).to.exist
                    expect(notes).to.have.lengthOf(1)
        
                    const [note] = notes
        
                    expect(note.id).to.exist
        
                    expect(note.text).to.equal(text)
        
                    expect(note.author.toString()).to.equal(user.id)
                })
    
                it('should fail on non-matching customer id', async () => {
                    id = '123456789012345678901234'
                    try {
                    await logic.addCustomerNote(id, text, user.id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(LogicError)
    
                        expect(error.message).to.equal(`customer with id "${id}" does not exist`)
                    }
                })
    
                it('should fail on non-24 characters customer id', async () => {
                    id = '12345678901234567890123'
                    try {
                        await logic.addCustomerNote(id, text, user.id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(FormatError)
    
                        expect(error.message).to.equal(`${id} is not a valid id`)
                    }
                })
    
                it('should fail on undefined customer id', () => {
                    id = undefined
    
                    expect(() => logic.addCustomerNote(id, text, user.id)).to.throw(RequirementError, `customerId is not optional`)
    
                })
    
                it('should fail on null customer id', () => {
                    id = null
    
                    expect(() => logic.addCustomerNote(id, text, user.id)).to.throw(RequirementError, `customerId is not optional`)
                })
    
                it('should fail on empty customer id', () => {
                    id = ''
    
                    expect(() => logic.addCustomerNote(id, text, user.id)).to.throw(ValueError, 'customerId is empty')
    
                })
    
                it('should fail on blank customer id', () => {
                    id = ' \t    \n'
    
                    expect(() => logic.addCustomerNote(id, text, user.id)).to.throw(ValueError, 'customerId is empty')
                })
    
                it('should fail on non-matching user id', async () => {
                    id = '123456789012345678901234'
                    try {
                    await logic.addCustomerNote(customer.id, text, id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(LogicError)
    
                        expect(error.message).to.equal(`user with id "${id}" does not exist`)
                    }
                })
    
                it('should fail on non-24 characters user id', async () => {
                    id = '12345678901234567890123'
                    try {
                        await logic.addCustomerNote(customer.id, text, id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(FormatError)
    
                        expect(error.message).to.equal(`${id} is not a valid id`)
                    }
                })
    
                it('should fail on undefined user id', () => {
                    id = undefined
    
                    expect(() => logic.addCustomerNote(customer.id, text, id)).to.throw(RequirementError, `userId is not optional`)
    
                })
    
                it('should fail on null user id', () => {
                    id = null
    
                    expect(() => logic.addCustomerNote(customer.id, text, id)).to.throw(RequirementError, `userId is not optional`)
                })
    
                it('should fail on empty user id', () => {
                    id = ''
    
                    expect(() => logic.addCustomerNote(customer.id, text, id)).to.throw(ValueError, 'userId is empty')
    
                })
    
                it('should fail on blank user id', () => {
                    id = ' \t    \n'
    
                    expect(() => logic.addCustomerNote(customer.id, text, id)).to.throw(ValueError, 'userId is empty')
                })
            })
        
            describe('list customer notes', () => {
                        
                it('should succeed for existing customer notes', async () => {
                    const _notes = await logic.listCustomerNotes(customer.id)
        
                    expect(_notes).to.exist
                    expect(_notes).to.have.lengthOf(customer.notes.length)
        
                    _notes.forEach(note => {
                        expect(note._id).to.be.undefined
                        expect(note.id).to.exist
                        expect(note.id).to.be.a('string')
        
                        expect(note.text).to.exist
                        expect(note.text).to.be.a('string')
                        const _note = customer.notes.find(_note => _note.id === note.id)
                        expect(note.text).to.equal(_note.text)
        
                        expect(note.date).to.exist
                        expect(note.date).to.be.instanceOf(Date)
        
                        expect(note.author).to.equal(user.id)
                    })
                })

                it('should fail on non-matching customer id', async () => {
                    id = '123456789012345678901234'
                    try {
                    await logic.listCustomerNotes(id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(LogicError)
    
                        expect(error.message).to.equal(`customer with id "${id}" does not exist`)
                    }
                })
    
                it('should fail on non-24 characters customer id', async () => {
                    id = '12345678901234567890123'
                    try {
                        await logic.listCustomerNotes(id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(FormatError)
    
                        expect(error.message).to.equal(`${id} is not a valid id`)
                    }
                })
    
                it('should fail on undefined id', () => {
                    id = undefined
    
                    expect(() => logic.listCustomerNotes(id)).to.throw(RequirementError, `customerId is not optional`)
    
                })
    
                it('should fail on null id', () => {
                    id = null
    
                    expect(() => logic.listCustomerNotes(id)).to.throw(RequirementError, `customerId is not optional`)
                })
    
                it('should fail on empty id', () => {
                    id = ''
    
                    expect(() => logic.listCustomerNotes(id)).to.throw(ValueError, 'customerId is empty')
    
                })
    
                it('should fail on blank id', () => {
                    id = ' \t    \n'
    
                    expect(() => logic.listCustomerNotes(id)).to.throw(ValueError, 'customerId is empty')
                })
            })

            describe('delete customer notes', () => {

                it('should succeed for all existing customer notes', async () => {
                    await logic.deleteCustomerNotes(customer.id)
                    const _notes = await logic.listCustomerNotes(customer.id)
                    expect(_notes.length).to.equal(0)
                })

                it('should succeed for a specific existing customer note', async () => {
                    const beforeDeleteNotes = await Customer.findById(customer.id).select('notes')
                    const indexNote = Math.floor(Math.random()*beforeDeleteNotes.notes.length)
                    const noteId = beforeDeleteNotes.notes[indexNote].id
                    await logic.deleteCustomerNotes(customer.id, noteId)
                    const _notes = await logic.listCustomerNotes(customer.id)
                    expect(_notes.length).to.equal(beforeDeleteNotes.notes.length - 1)

                    _notes.forEach(note => {
        
                        expect(note.text).to.exist
                        expect(note.text).to.be.a('string')
                        const _note = customer.notes.find(_note => _note.id === note.id)
                        expect(note.text).to.equal(_note.text)
                        expect(note.text).to.not.equal(beforeDeleteNotes.notes[indexNote].text)
                        expect(note.date).to.exist
                        expect(note.date).to.be.instanceOf(Date)
        
                        expect(note.author).to.equal(user.id)
                    })

                })
                it('should fail on non-matching customer id', async () => {
                    id = '123456789012345678901234'
                    try {
                    await logic.deleteCustomerNotes(id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(LogicError)
    
                        expect(error.message).to.equal(`customer with id "${id}" does not exist`)
                    }
                })
    
                it('should fail on non-24 characters customer id', async () => {
                    id = '12345678901234567890123'
                    try {
                        await logic.deleteCustomerNotes(id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(FormatError)
    
                        expect(error.message).to.equal(`${id} is not a valid id`)
                    }
                })
    
                it('should fail on undefined customer id', () => {
                    id = undefined
    
                    expect(() => logic.deleteCustomerNotes(id)).to.throw(RequirementError, `customerId is not optional`)
    
                })
    
                it('should fail on null customer id', () => {
                    id = null
    
                    expect(() => logic.deleteCustomerNotes(id)).to.throw(RequirementError, `customerId is not optional`)
                })
    
                it('should fail on empty customer id', () => {
                    id = ''
    
                    expect(() => logic.deleteCustomerNotes(id)).to.throw(ValueError, 'customerId is empty')
    
                })
    
                it('should fail on blank customer id', () => {
                    id = ' \t    \n'
    
                    expect(() => logic.deleteCustomerNotes(id)).to.throw(ValueError, 'customerId is empty')
                })

                it('should fail on non-matching note id', async () => {
                    id = '123456789012345678901234'
                    try {
                    await logic.deleteCustomerNotes(customer.id, id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(LogicError)
    
                        expect(error.message).to.equal(`note with id "${id}" does not exist`)
                    }
                })
    
                it('should fail on non-24 characters note id', async () => {
                    id = '12345678901234567890123'
                    try {
                        await logic.deleteCustomerNotes(customer.id, id)
    
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(FormatError)
    
                        expect(error.message).to.equal(`${id} is not a valid id`)
                    }
                })
    
                it('should fail on empty note id', () => {
                    id = ''
    
                    expect(() => logic.deleteCustomerNotes(customer.id, id)).to.throw(ValueError, 'noteId is empty')
    
                })
    
                it('should fail on blank note id', () => {
                    id = ' \t    \n'
    
                    expect(() => logic.deleteCustomerNotes(customer.id, id)).to.throw(ValueError, 'noteId is empty')
                })

            })
        })
    })

    describe('electronic module control', () => {
        let orderNumber, brand, model, cylinders, transmission, year, engine, device, serial, fail, owner, status

        const statusList = ['RECEIVED', 'REVIEWED', 'BUDGETED', 'APPROVED', 'REPAIRED', 'TO-COLLECT', 'DELIVERED', 'COLLECTED']
        beforeEach(async () => {
            await Customer.deleteMany()

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            phone = `phone-${Math.random()}`
            address = `address-${Math.random()}`
            nid = `nid-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            
            await Customer.create({ name, surname, phone, address, nid, email })
            const customer = await Customer.findOne()

            orderNumber = `orderNumber-${Math.random()}`
            brand = `brand-${Math.random()}`
            model = `model-${Math.random()}`
            cylinders = `cylinders-${Math.random()}`
            transmission = `transmission-${Math.random()}`
            year = `year-${Math.random()}`
            engine = `engine-${Math.random()}`
            device = `device-${Math.random()}`
            serial = `serial-${Math.random()}`
            fail = `fail-${Math.random()}`
            owner = customer.id
            status = statusList[Math.floor(Math.random()*statusList.length)]

            await ElectronicModule.create({
                orderNumber,
                brand,
                model,
                cylinders,
                transmission,
                year,
                engine,
                device,
                serial,
                fail,
                owner,
                status
            })

        })
        
        describe('register electronic control module', () => {

            it('should succeed on correct data', async () => {
                await ElectronicModule.deleteMany()
                const res = await logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)
    
                expect(res).to.be.undefined
    
                const electronicModules = await ElectronicModule.find()
    
                expect(electronicModules).to.exist
                expect(electronicModules).to.have.lengthOf(1)
    
                const [electronicModule] = electronicModules
    
                expect(electronicModule.orderNumber).to.equal(orderNumber)
                expect(electronicModule.brand).to.equal(brand)
                expect(electronicModule.model).to.equal(model)
                expect(electronicModule.cylinders).to.equal(cylinders)
                expect(electronicModule.transmission).to.equal(transmission)
                expect(electronicModule.year).to.equal(year)
                expect(electronicModule.engine).to.equal(engine)
                expect(electronicModule.device).to.equal(device)
                expect(electronicModule.serial).to.equal(serial)
                expect(electronicModule.fail).to.equal(fail)
                expect(electronicModule.owner.toString()).to.equal(owner)
                expect(electronicModule.status).to.equal(status)
        
            })

            it('should succeed on correct data with optional items to undefined', async () => {
                await ElectronicModule.deleteMany()
                brand = undefined
                model = undefined
                cylinders = undefined
                transmission = undefined
                year = undefined
                engine = undefined
                serial = undefined
                fail = undefined

                const res = await logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)
    
                expect(res).to.be.undefined
    
                const electronicModules = await ElectronicModule.find()
    
                expect(electronicModules).to.exist
                expect(electronicModules).to.have.lengthOf(1)
    
                const [electronicModule] = electronicModules

                expect(electronicModule.orderNumber).to.equal(orderNumber)
                expect(electronicModule.brand).to.not.exist
                expect(electronicModule.model).to.not.exist
                expect(electronicModule.cylinders).to.not.exist
                expect(electronicModule.transmission).to.not.exist
                expect(electronicModule.year).to.not.exist
                expect(electronicModule.engine).to.not.exist
                expect(electronicModule.device).to.equal(device)
                expect(electronicModule.serial).to.not.exist
                expect(electronicModule.fail).to.not.exist
                expect(electronicModule.owner.toString()).to.equal(owner)
                expect(electronicModule.status).to.equal(status)
        
            })

            it('should succeed on correct data with optional items to null', async () => {
                await ElectronicModule.deleteMany()
                brand = null
                model = null
                cylinders = null
                transmission = null
                year = null
                engine = null
                serial = null
                fail = null

                const res = await logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)
    
                expect(res).to.be.undefined
    
                const electronicModules = await ElectronicModule.find()
    
                expect(electronicModules).to.exist
                expect(electronicModules).to.have.lengthOf(1)
    
                const [electronicModule] = electronicModules

                expect(electronicModule.orderNumber).to.equal(orderNumber)
                expect(electronicModule.brand).to.not.exist
                expect(electronicModule.model).to.not.exist
                expect(electronicModule.cylinders).to.not.exist
                expect(electronicModule.transmission).to.not.exist
                expect(electronicModule.year).to.not.exist
                expect(electronicModule.engine).to.not.exist
                expect(electronicModule.device).to.equal(device)
                expect(electronicModule.serial).to.not.exist
                expect(electronicModule.fail).to.not.exist
                expect(electronicModule.owner.toString()).to.equal(owner)
                expect(electronicModule.status).to.equal(status)
        
            })

            it('should fail when retrying to register on already existing customer', async () => {
                
                try {
                    await logic.registerElectronicModule(
                        orderNumber,
                        brand,
                        model,
                        cylinders,
                        transmission,
                        year,
                        engine,
                        device,
                        serial,
                        fail,
                        owner,
                        status)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceof(LogicError)

                    expect(error.message).to.equal(`electronicModule with orderNumber "${orderNumber}" already exists`)
                }
            })

            it('should fail on undefined orderNumber', () => {
                orderNumber = undefined

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(RequirementError, `orderNumber is not optional`)
            })

            it('should fail on null orderNumber', () => {
                orderNumber = null

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(RequirementError, `orderNumber is not optional`)
            })

            it('should fail on empty orderNumber', () => {
                orderNumber = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'orderNumber is empty')
            })

            it('should fail on blank orderNumber', () => {
                orderNumber = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'orderNumber is empty')
            })

            it('should fail on empty brand', () => {
                brand = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'brand is empty')
            })

            it('should fail on blank brand', () => {
                brand = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'brand is empty')
            })

            it('should fail on empty model', () => {
                model = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'model is empty')
            })

            it('should fail on blank model', () => {
                model = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'model is empty')
            })

            it('should fail on empty cylinders', () => {
                cylinders = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'cylinders is empty')
            })

            it('should fail on blank cylinders', () => {
                cylinders = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'cylinders is empty')
            })

            it('should fail on empty transmission', () => {
                transmission = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'transmission is empty')
            })

            it('should fail on blank transmission', () => {
                transmission = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'transmission is empty')
            })

            it('should fail on empty year', () => {
                year = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'year is empty')
            })

            it('should fail on blank year', () => {
                year = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'year is empty')
            })

            it('should fail on empty engine', () => {
                engine = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'engine is empty')
            })

            it('should fail on blank engine', () => {
                engine = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'engine is empty')
            })

            it('should fail on undefined device', () => {
                device = undefined

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(RequirementError, `device is not optional`)
            })

            it('should fail on null device', () => {
                device = null

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(RequirementError, `device is not optional`)
            })

            it('should fail on empty device', () => {
                device = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'device is empty')
            })

            it('should fail on blank device', () => {
                device = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'device is empty')
            })

            it('should fail on empty serial', () => {
                serial = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'serial is empty')
            })

            it('should fail on blank serial', () => {
                serial = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'serial is empty')
            })

            it('should fail on empty fail', () => {
                fail = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'fail is empty')
            })

            it('should fail on blank fail', () => {
                fail = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'fail is empty')
            })

            it('should fail on non-matching owner id', async () => {
                id = '123456789012345678901234'
                try {
                await ElectronicModule.deleteMany()
                await logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner = id,
                    status)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`customer with id "${id}" does not exist`)
                }
            })

            it('should fail on non-24 characters owner id', async () => {
                id = '12345678901234567890123'
                try {
                    await logic.registerElectronicModule(
                        orderNumber,
                        brand,
                        model,
                        cylinders,
                        transmission,
                        year,
                        engine,
                        device,
                        serial,
                        fail,
                        owner = id,
                        status)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(FormatError)

                    expect(error.message).to.equal(`${id} is not a valid id`)
                }
            })

            it('should fail on undefined owner', () => {
                owner = undefined

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(RequirementError, `owner is not optional`)
            })

            it('should fail on null owner', () => {
                owner = null

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(RequirementError, `owner is not optional`)
            })

            it('should fail on empty owner', () => {
                owner = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'owner is empty')
            })

            it('should fail on blank owner', () => {
                owner = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'owner is empty')
            })

            it('should fail on undefined status', () => {
                status = undefined

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(RequirementError, `status is not optional`)
            })

            it('should fail on null status', () => {
                status = null

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(RequirementError, `status is not optional`)
            })

            it('should fail on empty status', () => {
                status = ''

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'status is empty')
            })

            it('should fail on blank status', () => {
                status = ' \t    \n'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    status)).to.throw(ValueError, 'status is empty')
            })

            it('should fail on non-status status', () => {
                const nonStatus = 'non-status'

                expect(() => logic.registerElectronicModule(
                    orderNumber,
                    brand,
                    model,
                    cylinders,
                    transmission,
                    year,
                    engine,
                    device,
                    serial,
                    fail,
                    owner,
                    nonStatus)).to.throw(LogicError, `${nonStatus} is not a valid option for status`)

            })
        })
    })

    after(() => mongoose.disconnect())
})