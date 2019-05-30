const dotenv = require('dotenv')
const { mongoose, models } = require('cf-mce-data')
const { errors: {LogicError,RequirementError, ValueError, FormatError, UnauthorizedError}  } = require('cf-mce-common')
const { expect } = require('chai')
const logic = require('.')
const argon2 = require('argon2')

dotenv.config()

const { User, Customer, ElectronicControlModule, Product, Note } = models
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', () => {
    let name, surname, email, password, category, phone, address, nid, notes, text, date, user
    
    before(() => mongoose.connect(url, { useNewUrlParser: true }))
    
    describe('user', () => {

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
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `email is not optional`)

            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'email is empty')

            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, category)).to.throw(FormatError, `${nonEmail} is not an e-mail`)

            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on undefined category', () => {
                const category = undefined

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `category is not optional`)

            })

            it('should fail on null category', () => {
                const category = null

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(RequirementError, `category is not optional`)
            })

            it('should fail on empty category', () => {
                const category = ''

                expect(() => logic.registerUser(name, surname, email, password, category)).to.throw(ValueError, 'category is empty')

            })

            it('should fail on blank category', () => {
                const category = ' \t    \n'

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
                const id = await logic.authenticateUser(email, password)
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
                const email = undefined

                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `email is not optional`)

            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'email is empty')

            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.authenticateUser(nonEmail, password)).to.throw(FormatError, `${nonEmail} is not an e-mail`)

            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'password is empty')
            })
        })

        describe('retrieve user', () => {

            it('should succeed on correct id from existing user', async () => {
                const user = await User.findOne({ email })
                const _user = await logic.retrieveUser(user.id)
    
                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)
                expect(_user.category).to.equal(category)
                expect(_user.password).to.be.undefined
            })

            it('should fail on non-existing user id', async () => {
                const id = '123456789012345678901234'
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
                const id = '12345678901234567890123'
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
                const id = undefined

                expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)

            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')

            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')
            })

        })
        
        describe('update user', () => {

            it('should succeed on correct data', async () => {
                const user = await User.findOne({ email }).lean()

                const data = { email: 'e@mail.com' }

                await logic.update(user._id.toString(), data)

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
                const user = await User.findOne({ email })

                const data = { }

                await logic.update(user.id, data)

                const userUpdated = await User.findById(user.id)

                expect(userUpdated).to.exist

                expect(userUpdated.id).to.equal(user.id)
                
                expect(userUpdated).to.deep.equal(user)
            })

            it('should fail on tray to update id', async () => {
                const id = '123456789012345678901234'
                const emailToUpdate = 'e@mail.com'
                try {
                    const user = await User.findOne({ email })

                    const data = { emailToUpdate, id }
                    
                    await logic.update(user.id, data)

                    throw Error('should not reach this point')
                } catch (error) {
                    
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(ValueError)

                    expect(error.message).to.equal('data id does not match criteria id')
                }
            })

            it('should fail on undefined id', () => {
                const id = undefined
                const data = {}

                expect(() => logic.update(id, data)).to.throw(RequirementError, `id is not optional`)

            })

            it('should fail on null id', () => {
                const id = null
                const data = {}

                expect(() => logic.update(id, data)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                const id = ''
                const data = {}

                expect(() => logic.update(id, data)).to.throw(ValueError, 'id is empty')

            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'
                const data = {}

                expect(() => logic.update(id, data)).to.throw(ValueError, 'id is empty')
            })

            it('should fail on undefined object data', async () => {
                const user = await User.findOne({ email })

                expect(() => logic.update(user.id)).to.throw(RequirementError, `data is not optional`)

            })

            it('should fail on null object data', async () => {
                const user = await User.findOne({ email })
                const data = null

                expect(() => logic.update(user.id, data)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on non object data', async () => {
                const user = await User.findOne({ email })
                const data = ''

                expect(() => logic.update(user.id, data)).to.throw(TypeError, `data ${data} is not a object`)

            })

        })

        describe('delete user', () => {
            it('should succeed on correct data', async () => {
                const user = await User.findOne({ email })
                await logic.delete(user.id)
                const userDeleted = await User.findById(user.id)
                expect(userDeleted).to.not.exist
            })

            it('should fail on non-matching user id', async () => {
                const id = '123456789012345678901234'
                try {
                await logic.delete(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id "${id}" does not exist`)
                }
            })

            it('should fail on non-24 characters user id', async () => {
                const id = '12345678901234567890123'
                try {
                    await logic.delete(id)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(FormatError)

                    expect(error.message).to.equal(`${id} is not a valid id`)
                }
            })

            it('should fail on undefined id', () => {
                const id = undefined

                expect(() => logic.delete(id)).to.throw(RequirementError, `id is not optional`)

            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.delete(id)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.delete(id)).to.throw(ValueError, 'id is empty')

            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.delete(id)).to.throw(ValueError, 'id is empty')
            })


        })
    })

    describe('customer', () => {

        beforeEach(async () => {
            await Customer.deleteMany()

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            phone = `surname-${Math.random()}`
            address = `surname-${Math.random()}`
            nid = `surname-${Math.random()}`
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

            it('should succeed on correct data with non-optional items to undefined', async () => {
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

            it('should succeed on correct data with non-optional items to null', async () => {
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
                const name = undefined

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on empty phone', () => {
                const phone = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'phone is empty')
            })

            it('should fail on blank phone', () => {
                const phone = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'phone is empty')
            })

            it('should fail on empty address', () => {
                const address = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'address is empty')
            })

            it('should fail on blank address', () => {
                const address = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'address is empty')
            })

            it('should fail on empty nid', () => {
                const nid = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'nid is empty')
            })

            it('should fail on blank nid', () => {
                const nid = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'nid is empty')
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'email is empty')

            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerCustomer(name, surname, phone, address, nid, email)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, category)).to.throw(FormatError, `${nonEmail} is not an e-mail`)

            })
        })

        // describe('retrieve user', () => {

        //     it('should succeed on correct id from existing user', async () => {
        //         const user = await User.findOne({ email })
        //         const _user = await logic.retrieveUser(user.id)
    
        //         expect(_user.id).to.be.undefined
        //         expect(_user.name).to.equal(name)
        //         expect(_user.surname).to.equal(surname)
        //         expect(_user.email).to.equal(email)
        //         expect(_user.category).to.equal(category)
        //         expect(_user.password).to.be.undefined
        //     })

        //     it('should fail on non-existing user id', async () => {
        //         const id = '123456789012345678901234'
        //         try {
        //             await logic.retrieveUser(id)

        //             throw Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error).to.be.instanceOf(LogicError)

        //             expect(error.message).to.equal(`user with id "${id}" does not exist`)
        //         }
        //     })

        //     it('should fail on non-24 characters user id', async () => {
        //         const id = '12345678901234567890123'
        //         try {
        //             await logic.retrieveUser(id)

        //             throw Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error).to.be.instanceOf(FormatError)

        //             expect(error.message).to.equal(`${id} is not a valid id`)
        //         }
        //     })

        //     it('should fail on undefined id', () => {
        //         const id = undefined

        //         expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)

        //     })

        //     it('should fail on null id', () => {
        //         const id = null

        //         expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)
        //     })

        //     it('should fail on empty id', () => {
        //         const id = ''

        //         expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')

        //     })

        //     it('should fail on blank id', () => {
        //         const id = ' \t    \n'

        //         expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')
        //     })

        // })
        
        // describe('update user', () => {

        //     it('should succeed on correct data', async () => {
        //         const user = await User.findOne({ email }).lean()

        //         const data = { email: 'e@mail.com' }

        //         await logic.update(user._id.toString(), data)

        //         const userUpdated = await User.findById(user._id.toString()).lean()

        //         expect(userUpdated).to.exist

        //         expect(userUpdated._id.toString()).to.equal(user._id.toString())
                
        //         const keys = Object.keys(user)
        //         expect(userUpdated).to.include.keys(keys)
                
        //         expect(Object.keys(userUpdated).length).to.equal(keys.length)

        //         expect(userUpdated.email).to.not.equal(user.email)
        //         expect(userUpdated.email).to.equal(data.email)
        //     })

        //     it('should be equal on empty data', async () => {
        //         const user = await User.findOne({ email })

        //         const data = { }

        //         await logic.update(user.id, data)

        //         const userUpdated = await User.findById(user.id)

        //         expect(userUpdated).to.exist

        //         expect(userUpdated.id).to.equal(user.id)
                
        //         expect(userUpdated).to.deep.equal(user)
        //     })

        //     it('should fail on tray to update id', async () => {
        //         const id = '123456789012345678901234'
        //         const emailToUpdate = 'e@mail.com'
        //         try {
        //             const user = await User.findOne({ email })

        //             const data = { emailToUpdate, id }
                    
        //             await logic.update(user.id, data)

        //             throw Error('should not reach this point')
        //         } catch (error) {
                    
        //             expect(error).to.exist
        //             expect(error).to.be.instanceOf(ValueError)

        //             expect(error.message).to.equal('data id does not match criteria id')
        //         }
        //     })

        //     it('should fail on undefined id', () => {
        //         const id = undefined
        //         const data = {}

        //         expect(() => logic.update(id, data)).to.throw(RequirementError, `id is not optional`)

        //     })

        //     it('should fail on null id', () => {
        //         const id = null
        //         const data = {}

        //         expect(() => logic.update(id, data)).to.throw(RequirementError, `id is not optional`)
        //     })

        //     it('should fail on empty id', () => {
        //         const id = ''
        //         const data = {}

        //         expect(() => logic.update(id, data)).to.throw(ValueError, 'id is empty')

        //     })

        //     it('should fail on blank id', () => {
        //         const id = ' \t    \n'
        //         const data = {}

        //         expect(() => logic.update(id, data)).to.throw(ValueError, 'id is empty')
        //     })

        //     it('should fail on undefined object data', async () => {
        //         const user = await User.findOne({ email })

        //         expect(() => logic.update(user.id)).to.throw(RequirementError, `data is not optional`)

        //     })

        //     it('should fail on null object data', async () => {
        //         const user = await User.findOne({ email })
        //         const data = null

        //         expect(() => logic.update(user.id, data)).to.throw(RequirementError, `data is not optional`)
        //     })

        //     it('should fail on non object data', async () => {
        //         const user = await User.findOne({ email })
        //         const data = ''

        //         expect(() => logic.update(user.id, data)).to.throw(TypeError, `data ${data} is not a object`)

        //     })

        // })

        // describe('delete user', () => {
        //     it('should succeed on correct data', async () => {
        //         const user = await User.findOne({ email })
        //         await logic.delete(user.id)
        //         const userDeleted = await User.findById(user.id)
        //         expect(userDeleted).to.not.exist
        //     })

        //     it('should fail on non-matching user id', async () => {
        //         const id = '123456789012345678901234'
        //         try {
        //         await logic.delete(id)

        //             throw Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error).to.be.instanceOf(LogicError)

        //             expect(error.message).to.equal(`user with id "${id}" does not exist`)
        //         }
        //     })

        //     it('should fail on non-24 characters user id', async () => {
        //         const id = '12345678901234567890123'
        //         try {
        //             await logic.delete(id)

        //             throw Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error).to.be.instanceOf(FormatError)

        //             expect(error.message).to.equal(`${id} is not a valid id`)
        //         }
        //     })

        //     it('should fail on undefined id', () => {
        //         const id = undefined

        //         expect(() => logic.delete(id)).to.throw(RequirementError, `id is not optional`)

        //     })

        //     it('should fail on null id', () => {
        //         const id = null

        //         expect(() => logic.delete(id)).to.throw(RequirementError, `id is not optional`)
        //     })

        //     it('should fail on empty id', () => {
        //         const id = ''

        //         expect(() => logic.delete(id)).to.throw(ValueError, 'id is empty')

        //     })

        //     it('should fail on blank id', () => {
        //         const id = ' \t    \n'

        //         expect(() => logic.delete(id)).to.throw(ValueError, 'id is empty')
        //     })


        })
        //TODO




    //     describe('add private note', () => {
    //         let user
    
    //         beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password) }))
    
    //         it('should succeed on existing user', async () => {
    //             const text = 'Hola, Mundo!'
    
    //             const res = await logic.addPrivateNote(user.id, text)
    
    //             expect(res).to.be.undefined
    
    //             // const notes = await Note.find()
    //             const _user = await User.findById(user.id)
    
    //             const { notes } = _user
    
    //             expect(notes).to.exist
    //             expect(notes).to.have.lengthOf(1)
    
    //             const [note] = notes
    
    //             expect(note._id).to.exist
    
    //             expect(note.text).to.equal(text)
    
    //             expect(note.author.toString()).to.equal(user.id)
    //         })
    //     })
    
    //     describe('retrieve private notes', () => {
    //         let user
    
    //         beforeEach(async () => {
    //             user = await User.create({ name, surname, email, password: await argon2.hash(password) })
    
    //             const texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)
    
    //             user.notes = texts.map(text => new Note({ text, author: user.id }))
    
    //             await user.save()
    //         })
    
    //         it('should succeed for existing user', async () => {
    //             const _notes = await logic.retrievePrivateNotes(user.id)
    
    //             expect(_notes).to.exist
    //             expect(_notes).to.have.lengthOf(user.notes.length)
    
    //             _notes.forEach(note => {
    //                 expect(note._id).to.be.undefined
    //                 expect(note.id).to.exist
    //                 expect(note.id).to.be.a('string')
    
    //                 expect(note.text).to.exist
    //                 expect(note.text).to.be.a('string')
    //                 const _note = user.notes.find(_note => _note.id === note.id)
    //                 expect(note.text).to.equal(_note.text)
    
    //                 expect(note.date).to.exist
    //                 expect(note.date).to.be.instanceOf(Date)
    
    //                 expect(note.author).to.equal(user.id)
    //             })
    //         })
    //     })
    // })

    // describe('electronic module control', () => {
    //     //TODO
    //     describe('add private note', () => {
    //         let user
    
    //         beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password) }))
    
    //         it('should succeed on existing user', async () => {
    //             const text = 'Hola, Mundo!'
    
    //             const res = await logic.addPrivateNote(user.id, text)
    
    //             expect(res).to.be.undefined
    
    //             // const notes = await Note.find()
    //             const _user = await User.findById(user.id)
    
    //             const { notes } = _user
    
    //             expect(notes).to.exist
    //             expect(notes).to.have.lengthOf(1)
    
    //             const [note] = notes
    
    //             expect(note._id).to.exist
    
    //             expect(note.text).to.equal(text)
    
    //             expect(note.author.toString()).to.equal(user.id)
    //         })
    //     })
    
    //     describe('retrieve private notes', () => {
    //         let user
    
    //         beforeEach(async () => {
    //             user = await User.create({ name, surname, email, password: await argon2.hash(password) })
    
    //             const texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)
    
    //             user.notes = texts.map(text => new Note({ text, author: user.id }))
    
    //             await user.save()
    //         })
    
    //         it('should succeed for existing user', async () => {
    //             const _notes = await logic.retrievePrivateNotes(user.id)
    
    //             expect(_notes).to.exist
    //             expect(_notes).to.have.lengthOf(user.notes.length)
    
    //             _notes.forEach(note => {
    //                 expect(note._id).to.be.undefined
    //                 expect(note.id).to.exist
    //                 expect(note.id).to.be.a('string')
    
    //                 expect(note.text).to.exist
    //                 expect(note.text).to.be.a('string')
    //                 const _note = user.notes.find(_note => _note.id === note.id)
    //                 expect(note.text).to.equal(_note.text)
    
    //                 expect(note.date).to.exist
    //                 expect(note.date).to.be.instanceOf(Date)
    
    //                 expect(note.author).to.equal(user.id)
    //             })
    //         })
    //     })
    // })


    

    // describe('add public note', () => {
    //     let user

    //     beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password) }))

    //     it('should succeed for existing user', async () => {
    //         const text = 'Hola, Mundo!'

    //         const res = await logic.addPublicNote(user.id, text)

    //         expect(res).to.be.undefined

    //         const notes = await Note.find()

    //         expect(notes).to.exist
    //         expect(notes).to.have.lengthOf(1)

    //         const [note] = notes

    //         expect(note.text).to.equal(text)
    //         expect(note.author.toString()).to.equal(user.id)
    //     })
    // })

    // describe('retrieve public notes', () => {
    //     let user, notes

    //     beforeEach(async () => {
    //         user = await User.create({ name, surname, email, password: await argon2.hash(password) })

    //         const texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)

    //         notes = []

    //         await Promise.all(texts.map(async text => notes.push(await Note.create({ text, author: user.id }))))
    //     })

    //     it('should succeed for existing user', async () => {
    //         const _notes = await logic.retrievePublicNotes(user.id)

    //         expect(_notes).to.exist
    //         expect(_notes).to.have.lengthOf(notes.length)

    //         _notes.forEach(note => {
    //             expect(note._id).to.be.undefined
    //             expect(note.id).to.exist
    //             expect(note.id).to.be.a('string')

    //             expect(note.text).to.exist
    //             expect(note.text).to.be.a('string')
    //             const _note = notes.find(_note => _note.id === note.id)
    //             expect(note.text).to.equal(_note.text)

    //             expect(note.date).to.exist
    //             expect(note.date).to.be.instanceOf(Date)

    //             expect(note.author).to.be.an('object')
    //             expect(note.author.id).to.be.a('string')
    //             expect(note.author.name).to.be.a('string')
    //         })
    //     })
    // })


    // describe('retrieve all public notes', () => {
    //     let user, user2, notes, notes2

    //     beforeEach(async () => {
    //         user = await User.create({ name, surname, email, password: await argon2.hash(password) })
    //         user2 = await User.create({ name, surname, email: `${Math.random()}-${email}`, password: await argon2.hash(password) })

    //         let texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)

    //         notes = []

    //         await Promise.all(texts.map(async text => notes.push(await Note.create({ text, author: user.id }))))

    //         texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)

    //         notes2 = []

    //         await Promise.all(texts.map(async text => notes2.push(await Note.create({ text, author: user2.id }))))
    //     })

    //     it('should succeed for existing user', async () => {
    //         const _notes = await logic.retrieveAllPublicNotes()

    //         expect(_notes).to.exist
    //         expect(_notes).to.have.lengthOf(notes.length + notes2.length)

    //         _notes.forEach(note => {
    //             expect(note._id).to.be.undefined
    //             expect(note.id).to.exist
    //             expect(note.id).to.be.a('string')

    //             expect(note.text).to.exist
    //             expect(note.text).to.be.a('string')
    //             const _note = notes.find(_note => _note.id === note.id) || notes2.find(_note => _note.id === note.id)
    //             expect(note.text).to.equal(_note.text)

    //             expect(note.date).to.exist
    //             expect(note.date).to.be.instanceOf(Date)

    //             expect(note.author).to.be.an('object')
    //             expect(note.author.id).to.be.a('string')
    //             expect(note.author.name).to.be.a('string')

    //             expect(note.author.id).to.be.oneOf([user.id, user2.id])
    //         })

    //         expect(_notes.reduce((accum, { author }) => {
    //             accum[author.id]++

    //             return accum
    //         }, {
    //                 [user.id]: 0,
    //                 [user2.id]: 0
    //             })).to.deep.equal({
    //                 [user.id]: notes.length,
    //                 [user2.id]: notes2.length
    //             })
    //     })
    // })

    

    after(() => mongoose.disconnect())
})