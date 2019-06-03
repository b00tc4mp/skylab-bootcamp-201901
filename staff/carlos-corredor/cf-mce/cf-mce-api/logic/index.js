// const { Schema } = require('mongoose')
const { models} = require('cf-mce-data')
const { validate, errors: {LogicError, UnauthorizedError, ValueError}  } = require('cf-mce-common')
const argon2 = require('argon2')

const { User, Customer, ElectronicModule, Product, Note } = models

const logic = {
    
    registerUser(name, surname, email, password, category) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])
        validate.email(email)
        validate.category(category)

        return (async () => {
            const user = await User.findOne({email: email}).lean()

            if (user) throw new LogicError(`user with email "${email}" already exists`)

            const hash = await argon2.hash(password)

            await User.create({ name, surname, email, password: hash, category })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        validate.email(email)


        return (async () => {
            const user = await User.findOne({ email })
            if(!user) throw new LogicError(`user with email "${email}" does not exist`)

            if (await argon2.verify(user.password, password)) return user.id
            else throw new UnauthorizedError('wrong credentials')
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(id)

         return (async () => {
            const user = await User.findById(id)
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)
 
            return await User.findById(id).select('name surname email category').lean() //no es necesario en el select indicar la omisión de _id para que no lo traiga (-_id al final de los items)

        })()
    },

    updateUser(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object' }
        ])
        validate.idMongodb(id)
        
        if (data.id && id !== data.id) throw new ValueError('id can\'t be updated')
        
        return (async () => {
            const user = await User.findOne({email: data.email})
            if (user) throw new LogicError(`user with email "${data.email}" already exists`)
            await User.findByIdAndUpdate(id, data)
        })()
    },

    deleteUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(id)

         return (async () => {
            const user = await User.findById(id)
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)
 
            await User.findByIdAndRemove(id)

        })()
    },

    registerCustomer(name, surname, phone, address, nid, email) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true, optional: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true, optional: true },
            { name: 'address', value: address, type: 'string', notEmpty: true, optional: true },
            { name: 'nid', value: nid, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true, optional: true }
        ])
        if (email != null) validate.email(email)

        return (async () => {
            const customer = await Customer.findOne({nid}).lean()

            if (customer) throw new LogicError(`customer with nid "${nid}" already exists`)

            await Customer.create({ name, surname, phone, address, nid, email })
        })()
    },

    authenticateCustomer(nid) {
        validate.arguments([
            { name: 'nid', value: nid, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const customer = await Customer.findOne({ nid })
            if(!customer) throw new LogicError(`customer with nid "${nid}" does not exist`)

            return customer.id
        })()
    },

    retrieveCustomer(id) { // El retrieve se realiza por id y no por nid porque se hace a partir del vínculo con un electronicModule que tiene al id del customer linkado.
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(id)
         return (async () => {
            const customer = await Customer.findById(id)
            if(!customer) throw new LogicError(`customer with id "${id}" does not exist`)
 
            return await Customer.findById(id).select('name surname phone address nid email notes').lean()

        })()
    },

    updateCustomer(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object' }
        ])
        validate.idMongodb(id)
        
        if (data.id && id !== data.id) throw new ValueError('data id does not match criteria id')

        return (async () => {
            const customer = await Customer.findOne({nid: data.nid})
            if (customer) throw new LogicError(`customer with nid "${data.nid}" already exists`)
            await Customer.findByIdAndUpdate(id, data)
        })()
    },

    deleteCustomer(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(id)

         return (async () => {
            const customer = await Customer.findById(id)
            if(!customer) throw new LogicError(`customer with id "${id}" does not exist`)
 
            await Customer.findByIdAndRemove(id)

        })()
    },

    findCustomers(criteria) {
        validate.arguments([
            { name: 'criteria', value: criteria, type: 'object', optional: true }
        ])

        return (async () => {
            const customers = await Customer.find(criteria).select('-__v').lean()

            customers.forEach(customer => {
                customer.id = customer._id.toString()
                delete customer._id
            })

            return customers
        })()
    },

    addCustomerNote(customerId, text, userId) {
        validate.arguments([
            { name: 'customerId', value: customerId, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(customerId)
        validate.idMongodb(userId)

        return (async () => {
            const customer = await Customer.findById(customerId)
            if(!customer) throw new LogicError(`customer with id "${customerId}" does not exist`)

            const user = await User.findById(userId)
            if(!user) throw new LogicError(`user with id "${userId}" does not exist`)

            customer.notes.push(new Note({ text, author: userId }))

            await customer.save()
        })()
    },

    listCustomerNotes(customerId) {
        validate.arguments([
            { name: 'customerId', value: customerId, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(customerId)

        return (async () => {
            const customer = await Customer.findById(customerId).select('notes').lean()
            if(!customer) throw new LogicError(`customer with id "${customerId}" does not exist`)

            const { notes } = customer

            notes.forEach(note => {
                note.id = note._id.toString()
                delete note._id

                note.author = note.author.toString()
            })

            return notes
        })()
    },

    deleteCustomerNotes(customerId, noteId) {
        validate.arguments([
            { name: 'customerId', value: customerId, type: 'string', notEmpty: true },
            { name: 'noteId', value: noteId, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(customerId)
        if (noteId != null) validate.idMongodb(noteId)

        return (async () => {
            const customer = await Customer.findById(customerId)
            if(!customer) throw new LogicError(`customer with id "${customerId}" does not exist`)

            if(!noteId) {
                customer.notes = []
                await customer.save()
            } else {
                if(!customer.notes.some(note => note.id === noteId)) throw new LogicError(`note with id "${noteId}" does not exist`)
                const note = customer.notes.find(note => note.id === noteId)
                const index = customer.notes.indexOf(note)
                customer.notes.splice(index, 1)
                await customer.save()
            }
        })()
    },

    registerElectronicModule(
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
        status) {
        validate.arguments([
            { name: 'orderNumber', value: orderNumber, type: 'string', notEmpty: true },
            { name: 'brand', value: brand, type: 'string', notEmpty: true, optional: true },
            { name: 'model', value: model, type: 'string', notEmpty: true, optional: true },
            { name: 'cylinders', value: cylinders, type: 'string', notEmpty: true, optional: true },
            { name: 'transmission', value: transmission, type: 'string', notEmpty: true, optional: true },
            { name: 'year', value: year, type: 'string', notEmpty: true, optional: true },
            { name: 'engine', value: engine, type: 'string', notEmpty: true, optional: true },
            { name: 'device', value: device, type: 'string', notEmpty: true },
            { name: 'serial', value: serial, type: 'string', notEmpty: true, optional: true },
            { name: 'fail', value: fail, type: 'string', notEmpty: true, optional: true },
            { name: 'owner', value: owner, type: 'string', notEmpty: true },
            { name: 'status', value: status, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(owner)
        validate.status(status)

        return (async () => {
            const electronicModule = await ElectronicModule.findOne({orderNumber}).lean()
            if (electronicModule) throw new LogicError(`electronicModule with orderNumber "${orderNumber}" already exists`)

            const customer = await Customer.findById(owner)
            if(!customer) throw new LogicError(`customer with id "${owner}" does not exist`)

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
        })()
    },

    authenticateElectronicModule(orderNumber) {
        validate.arguments([
            { name: 'orderNumber', value: orderNumber, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const electronicModule = await ElectronicModule.findOne({ orderNumber })
            if(!electronicModule) throw new LogicError(`electronic module with order number "${orderNumber}" does not exist`)

            return electronicModule.id
        })()
    },

    retrieveElectronicModule(id) { // El retrieve se realiza por id y no por número de orden para darle a la api versatilidad de criterios de recuperación de datos cuando esa funcionalidad se implenta en find.
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(id)
         return (async () => {
            const electronicModule = await ElectronicModule.findById(id)
            if(!electronicModule) throw new LogicError(`electronic module with id "${id}" does not exist`)
 
            return await ElectronicModule.findById(id).select('-_id -__v').lean()

        })()
    },

    updateElectronicModule(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object' }
        ])
        validate.idMongodb(id)
        
        if (data.id && id !== data.id) throw new ValueError('data id does not match criteria id')

        return (async () => {
            const electronicModule = await ElectronicModule.findOne({orderNumber: data.orderNumber})
            if (electronicModule) throw new LogicError(`electronic module with order number "${data.orderNumber}" already exists`)
            await ElectronicModule.findByIdAndUpdate(id, data)
        })()
    },

    deleteElectronicModule(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(id)

         return (async () => {
            const electronicModule = await ElectronicModule.findById(id)
            if(!electronicModule) throw new LogicError(`electronicModule with id "${id}" does not exist`)
 
            await ElectronicModule.findByIdAndRemove(id)

        })()
    },

    findElectronicModules(criteria) {
        validate.arguments([
            { name: 'criteria', value: criteria, type: 'object', optional: true }
        ])

        return (async () => {
            const electronicModules = await ElectronicModule.find(criteria).select('-__v').lean()

            electronicModules.forEach(electronicModule => {
                electronicModule.id = electronicModule._id.toString()
                delete electronicModule._id
                electronicModule.owner = electronicModule.owner.toString()
            })

            return electronicModules
        })()
    },

    addElectronicModuleNote(electronicModuleId, text, userId) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(electronicModuleId)
        validate.idMongodb(userId)

        return (async () => {
            const electronicModule = await ElectronicModule.findById(electronicModuleId)
            if(!electronicModule) throw new LogicError(`electronic module with id "${electronicModuleId}" does not exist`)

            const user = await User.findById(userId)
            if(!user) throw new LogicError(`user with id "${userId}" does not exist`)

            electronicModule.notes.push(new Note({ text, author: userId }))

            await electronicModule.save()
        })()
    },

    listElectronicModuleNotes(electronicModuleId) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(electronicModuleId)

        return (async () => {
            const electronicModule = await ElectronicModule.findById(electronicModuleId).select('notes').lean()
            if(!electronicModule) throw new LogicError(`electronic module with id "${electronicModuleId}" does not exist`)

            const { notes } = electronicModule

            notes.forEach(note => {
                note.id = note._id.toString()
                delete note._id

                note.author = note.author.toString()
            })

            return notes
        })()
    },

    deleteElectronicModuleNotes(electronicModuleId, noteId) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'noteId', value: noteId, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(electronicModuleId)
        if (noteId != null) validate.idMongodb(noteId)

        return (async () => {
            const electronicModule = await ElectronicModule.findById(electronicModuleId)
            if(!electronicModule) throw new LogicError(`electronic module with id "${electronicModuleId}" does not exist`)

            if(!noteId) {
                electronicModule.notes = []
                await electronicModule.save()
            } else {
                if(!electronicModule.notes.some(note => note.id === noteId)) throw new LogicError(`note with id "${noteId}" does not exist`)
                const note = electronicModule.notes.find(note => note.id === noteId)
                const index = electronicModule.notes.indexOf(note)
                electronicModule.notes.splice(index, 1)
                await electronicModule.save()
            }
        })()
    },

    addElectronicModuleBudget(electronicModuleId, description, price) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'price', value: price, type: 'number', notEmpty: true }
        ])
        validate.idMongodb(electronicModuleId)
        validate.description(description)

        return (async () => {
            const electronicModule = await ElectronicModule.findById(electronicModuleId)
            if(!electronicModule) throw new LogicError(`electronic module with id "${electronicModuleId}" does not exist`)

            electronicModule.budget.push(new Product({ description, price }))

            await electronicModule.save()
        })()
    },

    listElectronicModuleBudgets(electronicModuleId) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(electronicModuleId)

        return (async () => {
            const electronicModule = await ElectronicModule.findById(electronicModuleId).select('budget').lean()
            if(!electronicModule) throw new LogicError(`electronic module with id "${electronicModuleId}" does not exist`)

            const { budget } = electronicModule

            budget.forEach(product => {
                product.id = product._id.toString()
                delete product._id
            })

            return budget
        })()
    },

    deleteElectronicModuleBudgets(electronicModuleId, productId) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'productId', value: productId, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(electronicModuleId)
        if (productId != null) validate.idMongodb(productId)

        return (async () => {
            const electronicModule = await ElectronicModule.findById(electronicModuleId)
            if(!electronicModule) throw new LogicError(`electronic module with id "${electronicModuleId}" does not exist`)

            if(!productId) {
                electronicModule.budget = []
                await electronicModule.save()
            } else {
                if(!electronicModule.budget.some(product => product.id === productId)) throw new LogicError(`product with id "${productId}" does not exist`)
                const product = electronicModule.budget.find(product => product.id === productId)
                const index = electronicModule.budget.indexOf(product)
                electronicModule.budget.splice(index, 1)
                await electronicModule.save()
            }
        })()
    }
}

module.exports = logic
