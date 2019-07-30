import dotenv from 'dotenv'
import mceApi from '.'
import argon2 from 'argon2'
import logic from '.'
import { errors } from 'cf-mce-common';
import 'cf-mce-common/utils/array-random.polyfill'
import 'cf-mce-common/utils/math-random.polyfill'
import jwt from 'jsonwebtoken'
import { mongoose, models } from 'cf-mce-data'

const {LogicError} = errors

dotenv.config()

const { User, Customer, ElectronicModule, Product, Note } = models
const { env: { MONGO_URL_LOGIC_TEST: url, JWT_SECRET } } = process

describe('logic', () => {
    let name, surname, email, password, category, phone, address, nid, id
    let user, token

    beforeAll(() => mongoose.connect(url, { useNewUrlParser: true }))

    const categories = ['MASTER', 'TECHNICIAN', 'ASSISTANT']

    describe('user', () => {

      beforeEach(async () => {
        await User.deleteMany()

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        category = categories.random()
        const hash = await argon2.hash(password)
        await User.create({ name, surname, email, password: hash, category })
        user = await User.findOne()
        token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '24h' })
        logic.__userToken__ = token
      })

      describe('register user', () => {

        it('should succeed on correct data', async () => {
          await User.deleteMany()
          const res = await logic.registerUser(name, surname, email, password, category)
          expect(res).toBeUndefined()

          const users = await User.find()
          expect(users).toBeDefined()
          expect(users).toHaveLength(1)

          const [user] = users

          expect(user.name).toBe(name)
          expect(user.surname).toBe(surname)
          expect(user.email).toBe(email)

          expect(user.password).toBeDefined()

          expect(await argon2.verify(user.password, password)).toBeTruthy()
        })
      });

      describe('login user', () =>{
            it('should succeed on correct user credential', async () => {
            const res = await logic.loginUser(email, password)
            
            expect(typeof token).toBe('string')
            expect(res).toBeUndefined()
    
            expect(token.length).toBeGreaterThan(0)
    
            const [, payloadB64,] = token.split('.')
            const payloadJson = atob(payloadB64)
            const payload = JSON.parse(payloadJson)
    
            expect(typeof payload.sub).toBe('string')
            expect(payload.sub.length).toBe(24)
    
            expect(payload.sub).toBe(user.id)
            expect(logic.isUserLoggedIn).toBeTruthy()
            })      
      })
  
      describe('retrieve user', () => {
            it('should succeed on correct id from existing user', async () => {
                const res = await mceApi.retrieveUser(token)
        
                expect(res.id).toBeUndefined()
                expect(res.name).toBe(name)
                expect(res.surname).toBe(surname)
                expect(res.email).toBe(email)
                expect(res.category).toBe(category)
                expect(res.password).toBeUndefined()
            })
      })
      
    //   describe('update user', () => {})
    //   describe('delete user', () => {})
      
    });
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
    
                expect(res).toBeUndefined()
    
                const customers = await Customer.find()
    
                expect(customers).toHaveLength(1)
    
                const [customer] = customers
    
                expect(customer.name).toBe(name)
                expect(customer.surname).toBe(surname)
                expect(customer.phone).toBe(phone)
                expect(customer.address).toBe(address)
                expect(customer.nid).toBe(nid)
                expect(customer.email).toBe(email)
      
          })
      })
  
    //   describe('update customer', () => {})
    //   describe('delete customer', () => {})
      
      describe('list customer', () => {
            let customers = []
            const names = ['Carlos', 'Pepe', 'Luis']
            const surnames = ['Corredor', 'Grillo', 'Aparicio']
            const phones = ['123', '456', '789']
            const addresses = ['avenida', 'calle', 'ciudad']
            const emails = ['a', 'b', 'c']
            const criteriaList = [
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

            describe('list all customer', () => {
                it('should succeed and return customers if customers exist without criteria', async () => {
                        const customersListed = await logic.findCustomers()
        
                        expect(customersListed.length).toBe(customers.length)
                        
                        customers.forEach(customer => {
                            delete customer.notes
                        });
        
                        expect(customersListed).toEqual(customers)

                })
    
                it('should succeed and return customers if customers exist with null like criteria', async () => {
                    name = null
                    surname = null
                    phone = null
                    address = null
                    nid = null
                    email = null

                    const customersListed = await logic.findCustomers(name, surname, phone, address, nid, email)
    
                    expect(customersListed.length).toBe(customers.length)
                    
                    customers.forEach(customer => {
                        delete customer.notes
                    });
    
                    expect(customersListed).toEqual(customers)
    
                })
            })

            xdescribe('list customers found by criteria', () => {
                let customersWithCriteria, customersFound, criteria, key, value
                beforeEach(() => {
                    criteria = criteriaList.random()
                    key = Object.keys(criteria)[0]
                    value = criteria[key]
                    customersWithCriteria = []
                    customersFound = []
    
                    customers.forEach(customer => {
                        if(customer[key] === value) customersWithCriteria.push(customer)
                    })
                })
                
                it('should succeed and return customers found by criteria', async () => {
                    //tarea pendiente
                    key = Object.keys(criteria)[0]
                    value = criteria[key]
                    name = null
                    surname = null
                    phone = null
                    address = null
                    nid = null
                    email = null
                    
                    customersFound = await logic.findCustomers(name, surname, phone, address, nid, email)
                    expect(customersFound.length).toBe(customersWithCriteria.length)
                    customersWithCriteria.forEach(customer => {
                        delete customer.notes
                    });
                    expect(customersFound).toEqual(customersWithCriteria)
                })
    
                it('should return an empty array on non existing key into criteria object', async () => {
                    criteria = {nombre: 'Carlos'}
    
                    customersFound = await logic.findCustomers(name, surname, phone, address, nid, email)
                    expect(customersFound.length).toBe(0)
                    expect(customersFound instanceof Array).toBeTruthy()
                })
    
                it('should return an empty array on non existing value into criteria object', async () => {
                    criteria = {[key]: 'no-existing-value'}
    
                    customersFound = await logic.findCustomers(name, surname, phone, address, nid, email)
                    expect(customersFound.length).toBe(0)
                    expect(customersFound instanceof Array).toBeTruthy()
                })
          })
      })
    //   describe('customer notes', () => {
    //       let customer, text
  
    //           beforeEach(async () => {
    //               // user = await User.findOne()
    //               customer = await Customer.findOne()
    //               text = 'Hola, Mundo!'
    //               customer.notes = []
    //               const texts = new Array(10).fill('note-').map(text => `${text}-${Math.random()}`)
    //               customer.notes = texts.map(text => new Note({ text, author: user.id }))
    //               await customer.save()
    //           })
    //     describe('add customer note', () => {
    //       beforeEach(async () => {      
    //           customer.notes = []
    //           await customer.save()
    //       })
  
    //       it('should succeed on existing customer and user', async () => {
  
    //           const res = await mceApi.addCustomerNote(token, customer.id, text)
  
    //           expect(res.message).toBe('Ok, a note has been added')
              
    //           const customerWithNewNote = await Customer.findById(customer.id)
  
    //           const { notes } = customerWithNewNote
  
    //           expect(notes.length).toBe(1)
  
    //           const [note] = notes
  
    //           expect(note.id).toBeDefined()
  
    //           expect(note.text).toBe(text)
  
    //           expect(note.author.toString()).toBe(user.id)
    //       })
    //     })
  
    //     describe('list customer notes', () => {
    //       it('should succeed for existing customer notes', async () => {
    //           const _notes = await mceApi.listCustomerNotes(token, customer.id)
  
    //           expect(_notes.length).toBe(customer.notes.length)
  
    //           _notes.forEach(note => {
    //               expect(note._id).toBeUndefined()
    //               expect(note.id).toBeDefined()
    //               expect(typeof note.id).toBe('string')
  
    //               expect(note.text).toBeDefined()
    //               expect(typeof note.text).toBe('string')
    //               const _note = customer.notes.find(_note => _note.id === note.id)
    //               expect(note.text).toBe(_note.text)
  
    //               expect(note.date).toBeDefined()
  
    //               expect(typeof note.date).toBe('string')
  
    //               expect(note.author).toBe(user.id)
    //           })
    //       })
    //     })
  
    //     describe('delete customer notes', () => {
    //       it('should succeed for all existing customer notes', async () => {
    //           await mceApi.deleteCustomerNotes(token, customer.id)
    //           const afterDeleteNotes = await Customer.findById(customer.id)
    //           expect(afterDeleteNotes.notes.length).toBe(0)
    //       })
  
    //       it('should succeed for a specific existing customer note', async () => {
    //           const beforeDeleteNotes = await Customer.findById(customer.id)
    //           const indexNote = Math.floor(Math.random()*beforeDeleteNotes.notes.length)
    //           const noteId = beforeDeleteNotes.notes[indexNote].id
    //           await mceApi.deleteCustomerNotes(token, customer.id, noteId)
    //           const afterDeleteNotes = await Customer.findById(customer.id)
  
    //           expect(afterDeleteNotes.notes.length).toBe(beforeDeleteNotes.notes.length - 1)
  
    //           afterDeleteNotes.notes.forEach(note => {
  
    //               expect(note.text).toBeDefined()
    //               expect(typeof note.text).toBe('string')
    //               const _note = customer.notes.find(_note => _note.id === note.id)
    //               expect(note.text).toBe(_note.text)
    //               expect(note.text).not.toBe(beforeDeleteNotes.notes[indexNote].text)
    //               expect(note.date).toBeDefined()
    //               expect(note.date).toBeInstanceOf(Date)
  
    //               expect(note.author.toString()).toBe(user.id)
    //           })
  
    //       })
    //     })
    //   })
    })

    // describe('electronic module', () => {
  
    //   let orderNumber, brand, model, cylinders, transmission, year, engine, device, serial, fail, owner, status
  
    //   const statusList = ['RECEIVED', 'REVIEWED', 'BUDGETED', 'APPROVED', 'REPAIRED', 'TO-COLLECT', 'DELIVERED', 'COLLECTED']
    //   const statusDefault = 'RECEIVED'
    //   const deviceDefault = 'MCE'
  
    //   beforeEach(async () => {
    //       await Customer.deleteMany()
  
    //       name = `name-${Math.random()}`
    //       surname = `surname-${Math.random()}`
    //       phone = `phone-${Math.random()}`
    //       address = `address-${Math.random()}`
    //       nid = `nid-${Math.random()}`
    //       email = `email-${Math.random()}@mail.com`
          
    //       await Customer.create({ name, surname, phone, address, nid, email })
    //       const customer = await Customer.findOne()
  
    //       orderNumber = `orderNumber-${Math.random()}`
    //       brand = `brand-${Math.random()}`
    //       model = `model-${Math.random()}`
    //       cylinders = `cylinders-${Math.random()}`
    //       transmission = `transmission-${Math.random()}`
    //       year = `year-${Math.random()}`
    //       engine = `engine-${Math.random()}`
    //       device = `device-${Math.random()}`
    //       serial = `serial-${Math.random()}`
    //       fail = `fail-${Math.random()}`
    //       owner = customer.id
    //       status = statusList.random()
  
    //       await ElectronicModule.deleteMany()
    //       await ElectronicModule.create({
    //           token,
    //           orderNumber,
    //           brand,
    //           model,
    //           cylinders,
    //           transmission,
    //           year,
    //           engine,
    //           device,
    //           serial,
    //           fail,
    //           owner,
    //           status
    //       })
  
    //   })
          
    //   describe('register electronic module', () => {
  
    //       it('should succeed on correct data', async () => {
    //           await ElectronicModule.deleteMany()
    //           const res = await mceApi.registerElectronicModule(
    //               token,
    //               orderNumber,
    //               brand,
    //               model,
    //               cylinders,
    //               transmission,
    //               year,
    //               engine,
    //               device,
    //               serial,
    //               fail,
    //               owner,
    //               status)
  
    //           expect(res.message).toBe('Ok, electronic module registered.')
  
    //           const electronicModules = await ElectronicModule.find()
  
    //           expect(electronicModules).toHaveLength(1)
  
    //           const [electronicModule] = electronicModules
  
    //           expect(electronicModule.orderNumber).toBe(orderNumber)
    //           expect(electronicModule.brand).toBe(brand)
    //           expect(electronicModule.model).toBe(model)
    //           expect(electronicModule.cylinders).toBe(cylinders)
    //           expect(electronicModule.transmission).toBe(transmission)
    //           expect(electronicModule.year).toBe(year)
    //           expect(electronicModule.engine).toBe(engine)
    //           expect(electronicModule.device).toBe(device)
    //           expect(electronicModule.serial).toBe(serial)
    //           expect(electronicModule.fail).toBe(fail)
    //           expect(electronicModule.owner.toString()).toBe(owner)
    //           expect(electronicModule.status).toBe(status)
    //           expect(electronicModule.received).toBeInstanceOf(Date)
      
    //       })
  
    //       it('should succeed on correct data with optional items to undefined', async () => {
    //           await ElectronicModule.deleteMany()
    //           brand = undefined
    //           model = undefined
    //           cylinders = undefined
    //           transmission = undefined
    //           year = undefined
    //           engine = undefined
    //           device = undefined
    //           serial = undefined
    //           fail = undefined
    //           status = undefined
  
    //           const res = await mceApi.registerElectronicModule(
    //               token,
    //               orderNumber,
    //               brand,
    //               model,
    //               cylinders,
    //               transmission,
    //               year,
    //               engine,
    //               device,
    //               serial,
    //               fail,
    //               owner,
    //               status)
  
    //           expect(res.message).toBe('Ok, electronic module registered.')
  
    //           const electronicModules = await ElectronicModule.find()
  
    //           expect(electronicModules).toHaveLength(1)
  
    //           const [electronicModule] = electronicModules
  
    //           expect(electronicModule.orderNumber).toBe(orderNumber)
    //           expect(electronicModule.brand).toBeUndefined()
    //           expect(electronicModule.model).toBeUndefined()
    //           expect(electronicModule.cylinders).toBeUndefined()
    //           expect(electronicModule.transmission).toBeUndefined()
    //           expect(electronicModule.year).toBeUndefined()
    //           expect(electronicModule.engine).toBeUndefined()
    //           expect(electronicModule.device).toBe(deviceDefault)
    //           expect(electronicModule.serial).toBeUndefined()
    //           expect(electronicModule.fail).toBeUndefined()
    //           expect(electronicModule.owner.toString()).toBe(owner)
    //           expect(electronicModule.status).toBe(statusDefault)
      
    //       })
  
    //       it('should succeed on correct data with optional items to null', async () => {
    //           await ElectronicModule.deleteMany()
    //           brand = null
    //           model = null
    //           cylinders = null
    //           transmission = null
    //           year = null
    //           engine = null
    //           device = null
    //           serial = null
    //           fail = null
    //           status = null
  
    //           const res = await mceApi.registerElectronicModule(
    //               token,
    //               orderNumber,
    //               brand,
    //               model,
    //               cylinders,
    //               transmission,
    //               year,
    //               engine,
    //               device,
    //               serial,
    //               fail,
    //               owner,
    //               status)
  
    //           expect(res.message).toBe('Ok, electronic module registered.')
  
    //           const electronicModules = await ElectronicModule.find()
  
    //           expect(electronicModules).toHaveLength(1)
  
    //           const [electronicModule] = electronicModules
  
    //           expect(electronicModule.orderNumber).toBe(orderNumber)
    //           expect(electronicModule.brand).toBeNull()
    //           expect(electronicModule.model).toBeNull()
    //           expect(electronicModule.cylinders).toBeNull()
    //           expect(electronicModule.transmission).toBeNull()
    //           expect(electronicModule.year).toBeNull()
    //           expect(electronicModule.engine).toBeNull()
    //           expect(electronicModule.device).toBe(deviceDefault)
    //           expect(electronicModule.serial).toBeNull()
    //           expect(electronicModule.fail).toBeNull()
    //           expect(electronicModule.owner.toString()).toBe(owner)
    //           expect(electronicModule.status).toBe(statusDefault)
      
    //       })
    //   })
      
    //   describe('update electronic module', () => {
    //       it('should succeed on correct data', async () => {
    //           const electronicModule = await ElectronicModule.findOne().lean()
  
    //           const data = { brand: 'newBrand', year: 'newYear' }
  
    //           const res = await mceApi.updateElectronicModule(token, electronicModule._id.toString(), data)
    //           expect(res.message).toBe('Ok, electronic module updated.')
  
    //           const electronicModuleUpdated = await ElectronicModule.findById(electronicModule._id.toString()).lean()
  
    //           expect(electronicModuleUpdated).toBeDefined()
  
    //           expect(electronicModuleUpdated._id.toString()).toBe(electronicModule._id.toString())
              
    //           const keys = Object.keys(electronicModule)
    //           // expect(electronicModuleUpdated).to.include.keys(keys)
              
    //           expect(Object.keys(electronicModuleUpdated).length).toBe(keys.length)
  
    //           expect(electronicModuleUpdated.brand).not.toBe(electronicModule.brand)
    //           expect(electronicModuleUpdated.brand).toBe(data.brand)
    //           expect(electronicModuleUpdated.year).not.toBe(electronicModule.year)
    //           expect(electronicModuleUpdated.year).toBe(data.year)
    //       })
  
    //       it('should be equal on empty data', async () => {// en este caso no funciona "to.deep.equal" en el último expect de esta prueba porque contienen el array "notes" el que a suvez requeriría de otro deep
    //           const electronicModule = await ElectronicModule.findOne().lean()
  
    //           const data = { }
  
    //           await mceApi.updateElectronicModule(token, electronicModule._id.toString(), data)
  
    //           const electronicModuleUpdated = await ElectronicModule.findById(electronicModule._id.toString()).lean()
  
    //           expect(electronicModuleUpdated).toBeDefined()
  
    //           expect(electronicModuleUpdated._id.toString()).toBe(electronicModule._id.toString())
              
    //           expect(electronicModuleUpdated).toEqual(electronicModule)
    //       })
    //   })
      
    //   describe('delete electronic module', () => {})
      
    //   describe('list electronic module', () => {
    //       let electronicModules = []
    //       const brands = ['brand1', 'brand2', 'brand3']
    //       const models = ['model1', 'model2', 'model3']
    //       const cylindersList = ['4', '6', '8']
    //       const transmissions = ['a', 's', 'd']
    //       const years = ['1999', '2000', '2001']
    //       const engines = ['1.3', '1.8', '2.0']
    //       const devices = ['computer', 'transmissionComputer', 'fuse box']
    //       const serials = ['123', '456', '789']
    //       const fails = ['non injection', 'the engine won\'t start', 'to restore']
    //       const owners = ['a1234567890123456789012a', 'b1234567890123456789012b', 'c1234567890123456789012c']
    //       const criteriaList = [
    //           {brand: brands.random()},
    //           {model: models.random()},
    //           {cylinders: cylindersList.random()},
    //           {transmission: transmissions.random()},
    //           {year: years.random()},
    //           {engine: engines.random()},
    //           {device: devices.random()},
    //           {serial: serials.random()},
    //           {fail: fails.random()},
    //           {owner: owners.random()},
    //           {status: statusList.random()}
    //       ]
  
    //       beforeEach(async () => {
  
    //           await ElectronicModule.deleteMany()
    //           electronicModules = []
  
    //           for(let i = 0; i < 20; i++) {
  
    //               orderNumber = `orderNumber-${Math.random()}`
    //               brand = `${brands.random()}`
    //               model = `${models.random()}`
    //               cylinders = `${cylindersList.random()}`
    //               transmission = `${transmissions.random()}`
    //               year = `${years.random()}`
    //               engine = `${engines.random()}`
    //               device = `${devices.random()}`
    //               serial = `${serials.random()}`
    //               fail = `${fails.random()}`
    //               owner = `${owners.random()}`
    //               status = statusList.random()
  
    //               await ElectronicModule.create({
    //                   orderNumber,
    //                   brand,
    //                   model,
    //                   cylinders,
    //                   transmission,
    //                   year,
    //                   engine,
    //                   device,
    //                   serial,
    //                   fail,
    //                   owner,
    //                   status
    //               })
                  
    //               const electronicModule = await ElectronicModule.findOne({orderNumber})
    //               electronicModules.push({
    //                   id: electronicModule.id,
    //                   received: electronicModule.received,
    //                   orderNumber,
    //                   brand,
    //                   model,
    //                   cylinders,
    //                   transmission,
    //                   year,
    //                   engine,
    //                   device,
    //                   serial,
    //                   fail,
    //                   owner,
    //                   status,
    //                   budget: [],
    //                   notes: []
    //               })
    //           }
    //       })
  
    //       describe('list all electronic modules', () => {
    //           it('should succeed and return electronic modules if electronic modules exist without criteria', async () => {
    //               const electronicModulesListed = await mceApi.findElectronicModules(token)
    //               debugger
    //               expect(electronicModulesListed).toHaveLength(electronicModules.length)
  
    //               electronicModules.forEach(electronicModule => {
    //                   delete electronicModule.notes
    //                   delete electronicModule.budget
    //                   electronicModule.received = electronicModule.received.toDateString()
    //               })
  
    //               expect(electronicModulesListed).toEqual(electronicModules)
  
    //           })
  
    //           it('should succeed and return electronic modules if electronic modules exist with empty object like criteria', async () => {
    //               const electronicModulesListed = await mceApi.findElectronicModules(token, {})
  
    //               expect(electronicModulesListed).toHaveLength(electronicModules.length)
    //               electronicModules.forEach(electronicModule => {
    //                   delete electronicModule.notes
    //                   delete electronicModule.budget
    //                   electronicModule.received = electronicModule.received.toDateString()
    //               })
  
    //               expect(electronicModulesListed).toEqual(electronicModules)
  
    //           })
  
    //           it('should succeed and return electronic modules if electronic modules exist with null like criteria', async () => {
    //               const electronicModulesListed = await mceApi.findElectronicModules(token, null)
  
    //               expect(electronicModulesListed).toHaveLength(electronicModules.length)
    //               electronicModules.forEach(electronicModule => {
    //                   delete electronicModule.notes
    //                   delete electronicModule.budget
    //                   electronicModule.received = electronicModule.received.toDateString()
    //               })
  
    //               expect(electronicModulesListed).toEqual(electronicModules)
  
    //           })
    //       })
  
    //       describe('list electronic modules found by criteria', () => {
    //           let electronicModulesWithCriteria, electronicModulesFound, criteria, key, value
    //           beforeEach(() => {
    //               criteria = criteriaList.random()
    //               key = Object.keys(criteria)[0]
    //               value = criteria[key]
    //               electronicModulesWithCriteria = []
    //               electronicModulesFound = []
  
    //               electronicModules.forEach(electronicModules => {
    //                   if(electronicModules[key] === value) electronicModulesWithCriteria.push(electronicModules)
    //               })
    //           })
              
    //           it('should succeed and return electronic modules found by criteria', async () => {
                  
    //               electronicModulesFound = await mceApi.findElectronicModules(token, criteria)
    //               expect(electronicModulesFound).toHaveLength(electronicModulesWithCriteria.length)
    //               electronicModulesWithCriteria.forEach(electronicModule => {
    //                   delete electronicModule.notes
    //                   delete electronicModule.budget
    //                   electronicModule.received = electronicModule.received.toDateString()
    //               })
    //               expect(electronicModulesFound).toEqual(electronicModulesWithCriteria)
    //           })
  
    //           it('should return an empty array on non existing key into criteria object', async () => {
    //               criteria = {nombre: 'Carlos'}
                  
    //               electronicModulesFound = await mceApi.findElectronicModules(token, criteria)
    //               expect(electronicModulesFound).toHaveLength(0)
    //               expect(electronicModulesFound).toBeInstanceOf(Array)
    //           })
  
    //           it('should return an empty array on non existing value into criteria object', async () => {
    //               criteria = {[key]: 'no-existing-value'}
    //               electronicModulesFound = await mceApi.findElectronicModules(token, criteria)
    //               expect(electronicModulesFound).toHaveLength(0)
    //               expect(electronicModulesFound).toBeInstanceOf(Array)
    //           })
    //       })	
    //   })
      
    //   describe('electronic module notes', () => {
  
    //     describe('add electronic module note', () => {})
        
    //     describe('list electronic module notes', () => {})
        
    //     describe('delete electronic module notes', () => {})
    //   })
    //   describe('electronic module budget', () => {
  
    //     describe('add electronic module budget', () => {})
        
    //     describe('list electronic module products', () => {})
        
    //     describe('delete electronic module products', () => {})
    //   })
    // })
    afterAll(() => mongoose.disconnect())
  })

