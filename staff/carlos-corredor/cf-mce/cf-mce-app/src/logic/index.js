import mceApi from '../data/cf-mce-api'
import { errors, validate, normalize } from 'cf-mce-common';

const {LogicError} = errors


const logic = {


    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },
  
    registerUser(name, surname, email, password, category) {
        validate.arguments([
			{ name: 'name', value: name, type: 'string', notEmpty: true },
			{ name: 'surname', value: surname, type: 'string', notEmpty: true },
			{ name: 'email', value: email, type: 'string', notEmpty: true },
			{ name: 'password', value: password, type: 'string', notEmpty: true },
			{ name: 'category', value: category, type: 'string', notEmpty: true }
		]);
        validate.email(email)
        // try{validate.category(category)}
        // catch (error){
        //     error = error.message
        // }
        validate.category(category)
  
      return (async() => {

        const res = await mceApi.registerUser(name, surname, email, password, category)
        if (res.message === 'Ok, user registered.') return;

        throw new LogicError(res.error);
      })();
    },
  
    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        validate.email(email)

        return (async() => {
            const res = await mceApi.authenticateUser(email, password)
            const { error, token } = res
            if (error) throw new LogicError(error)
            this.__userToken__ = token
        })()
    },

    retrieveUser() {
        return (async () => {
            const res = await mceApi.retrieveUser(this.__userToken__)
            const { error } = res
            if (error) throw new LogicError(error)
            return res
        })()
    },

    logOut() {
        this.__userToken__ = null;
      },

    registerCustomer(name, surname, phone, address, nid, email) {
		validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true, optional: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true, optional: true },
            { name: 'address', value: address, type: 'string', notEmpty: true, optional: true },
            { name: 'nid', value: nid, type: 'string', notEmpty: true },
			{ name: 'email', value: email, type: 'string', notEmpty: true, optional: true },
		])
		if(email) validate.email(email)
  
        return (async() => {
            const res = await mceApi.registerCustomer(this.__userToken__, name, surname, phone, address, nid, email)
            if (res.message === 'Ok, customer registered.') return;
            throw new LogicError(res.error);
        })();
    },
  
    findCustomers(id, name, surname, phone, address, nid, email) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true, optional: true },
            { name: 'name', value: name, type: 'string', notEmpty: true, optional: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true, optional: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true, optional: true },
            { name: 'address', value: address, type: 'string', notEmpty: true, optional: true },
            { name: 'nid', value: nid, type: 'string', notEmpty: true, optional: true },
			{ name: 'email', value: email, type: 'string', notEmpty: true, optional: true },
        ])
        if(id != null) validate.idMongodb(id)
        if(email != null) validate.email(email)
        let query = {}
        if(id) query._id = id
        if(name) query.name = name
        if(surname) query.surname = surname
        if(phone) query.phone = phone
        if(address) query.address = address
        if(nid) query.nid = nid
        if(email) query.email = email
        
        return (async() => {
            const res = await mceApi.findCustomers(this.__userToken__, query)
            const { error } = res
            if (error) throw new LogicError(error)
            return res
        })();
    },

    addCustomerNote(customerId, text) {
        validate.arguments([
            { name: 'customerId', value: customerId, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true },
        ])
        validate.idMongodb(customerId)
        return (async() => {
            const res = await mceApi.addCustomerNote(this.__userToken__, customerId, text)
            if (res.message === 'Ok, a note has been added') return;
            throw new LogicError(res.error);
        })();
		
    },
    
    listCustomerNotes(customerId) {
        validate.arguments([
			{ name: 'customerId', value: customerId, type: 'string', notEmpty: true }	
        ])
        validate.idMongodb(customerId)

        return (async() => {
            const res = await mceApi.listCustomerNotes(this.__userToken__, customerId)
            const { error } = res
            if (error) throw new LogicError(error)
            return res
        })();
	},
	
	deleteCustomerNotes(customerId, noteId) {
        validate.arguments([
            { name: 'customerId', value: customerId, type: 'string', notEmpty: true },
            { name: 'noteId', value: noteId, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(customerId)
        if(noteId) validate.idMongodb(noteId)
        
        return (async() => {
            const res = await mceApi.deleteCustomerNotes(this.__userToken__, customerId, noteId)
            if (res.message === 'Ok, note is deleted.') return;
            if (res.message === 'Ok, notes are deleted.') return;
            throw new LogicError(res.error);
        })();

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
        owner) {
        validate.arguments([
			{ name: 'orderNumber', value: orderNumber, type: 'string', notEmpty: true },
            { name: 'brand', value: brand, type: 'string', notEmpty: true, optional: true },
            { name: 'model', value: model, type: 'string', notEmpty: true, optional: true },
            { name: 'cylinders', value: cylinders, type: 'string', notEmpty: true, optional: true },
            { name: 'transmission', value: transmission, type: 'string', notEmpty: true, optional: true },
            { name: 'year', value: year, type: 'string', notEmpty: true, optional: true },
            { name: 'engine', value: engine, type: 'string', notEmpty: true, optional: true },
            { name: 'device', value: device, type: 'string', notEmpty: true, optional: true },
            { name: 'serial', value: serial, type: 'string', notEmpty: true, optional: true },
            { name: 'fail', value: fail, type: 'string', notEmpty: true, optional: true },
            { name: 'owner', value: owner, type: 'string', notEmpty: true },
        ])
        validate.idMongodb(owner)
  
        return (async() => {
            const res = await mceApi.registerElectronicModule(
                this.__userToken__,
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
                owner)
            if (res.message === 'Ok, electronic module registered.') return;
            throw new LogicError(res.error);
        })();
    },

    findElectronicModules(orderNumber,
        brand,
        model,
        cylinders,
        transmission,
        year,
        engine,
        device,
        serial,
        fail,
        owner) {
        validate.arguments([
            { name: 'orderNumber', value: orderNumber, type: 'string', notEmpty: true, optional: true },
            { name: 'brand', value: brand, type: 'string', notEmpty: true, optional: true },
            { name: 'model', value: model, type: 'string', notEmpty: true, optional: true },
            { name: 'cylinders', value: cylinders, type: 'string', notEmpty: true, optional: true },
            { name: 'transmission', value: transmission, type: 'string', notEmpty: true, optional: true },
            { name: 'year', value: year, type: 'string', notEmpty: true, optional: true },
            { name: 'engine', value: engine, type: 'string', notEmpty: true, optional: true },
            { name: 'device', value: device, type: 'string', notEmpty: true, optional: true },
            { name: 'serial', value: serial, type: 'string', notEmpty: true, optional: true },
            { name: 'fail', value: fail, type: 'string', notEmpty: true, optional: true },
            { name: 'owner', value: owner, type: 'string', notEmpty: true, optional: true },
        ])
        let query = {}
        if(orderNumber) query.orderNumber = orderNumber
        if(brand) query.brand = brand
        if(model) query.model = model
        if(cylinders) query.cylinders = cylinders
        if(transmission) query.transmission = transmission
        if(year) query.year = year
        if(engine) query.engine = engine
        if(device) query.device = device
        if(serial) query.serial = serial
        if(fail) query.fail = fail
        if(owner) {
            validate.idMongodb(owner)
            query.owner = owner
        }
        
        return (async() => {
            const res = await mceApi.findElectronicModules(this.__userToken__, query)
            const { error } = res
            if (error) throw new LogicError(error)
            return res
        })();
    },

    updateElectronicModule(
        electronicModuleId,
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
        status,
        received,
        reviewed,
        budgeted,
        approved,
        repaired,
        delivered,
        toCollect,
        collected) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true, optional: true },
            { name: 'orderNumber', value: orderNumber, type: 'string', notEmpty: true, optional: true },
            { name: 'brand', value: brand, type: 'string', notEmpty: true, optional: true },
            { name: 'model', value: model, type: 'string', notEmpty: true, optional: true },
            { name: 'cylinders', value: cylinders, type: 'string', notEmpty: true, optional: true },
            { name: 'transmission', value: transmission, type: 'string', notEmpty: true, optional: true },
            { name: 'year', value: year, type: 'string', notEmpty: true, optional: true },
            { name: 'engine', value: engine, type: 'string', notEmpty: true, optional: true },
            { name: 'device', value: device, type: 'string', notEmpty: true, optional: true },
            { name: 'serial', value: serial, type: 'string', notEmpty: true, optional: true },
            { name: 'fail', value: fail, type: 'string', notEmpty: true, optional: true },
            { name: 'owner', value: owner, type: 'string', notEmpty: true, optional: true },
            { name: 'status', value: status, type: 'string', notEmpty: true, optional: true },
            { name: 'received', value: received, type: 'string', notEmpty: true, optional: true },
            { name: 'reviewed', value: reviewed, type: 'string', notEmpty: true, optional: true },
            { name: 'budgeted', value: budgeted, type: 'string', notEmpty: true, optional: true },
            { name: 'approved', value: approved, type: 'string', notEmpty: true, optional: true },
            { name: 'repaired', value: repaired, type: 'string', notEmpty: true, optional: true },
            { name: 'delivered', value: delivered, type: 'string', notEmpty: true, optional: true },
            { name: 'toCollect', value: toCollect, type: 'string', notEmpty: true, optional: true },
            { name: 'collected', value: collected, type: 'string', notEmpty: true, optional: true },
        ])
        validate.idMongodb(electronicModuleId)

        let data = {}
        if(orderNumber) data.orderNumber = orderNumber
        if(brand) data.brand = brand
        if(model) data.model = model
        if(cylinders) data.cylinders = cylinders
        if(transmission) data.transmission = transmission
        if(year) data.year = year
        if(engine) data.engine = engine
        if(device) data.device = device
        if(serial) data.serial = serial
        if(fail) data.fail = fail
        if(owner) {
            validate.idMongodb(owner)
            data.owner = owner
        }
        if(status) {
            validate.status(status)
            data.status = status
        }
        if(received) {
            validate.date(received)
            data.received = received
        }
        if(reviewed) {
            validate.date(reviewed)
            data.reviewed = reviewed
        }
        if(budgeted) {
            validate.date(budgeted)
            data.budgeted = budgeted
        }
        if(approved) {
            validate.date(approved)
            data.approved = approved
        }
        if(repaired) {
            validate.date(repaired)
            data.repaired = repaired
        }
        if(delivered) {
            validate.date(delivered)
            data.delivered = delivered
        }
        if(toCollect) {
            validate.date(toCollect)
            data.toCollect = toCollect
        }
        if(collected) {
            validate.date(collected)
            data.collected = collected
        }
        
        return (async() => {
            const res = await mceApi.updateElectronicModule(this.__userToken__, electronicModuleId, data)
            if (res.message === 'Ok, electronic module updated.') return
            throw new LogicError(res.error);
        })();
    },

    addElectronicModuleNote(electronicModuleId, text) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true },
        ])
        validate.idMongodb(electronicModuleId)
		return (async() => {
            const res = await mceApi.addElectronicModuleNote(this.__userToken__, electronicModuleId, text)
            if (res.message === 'Ok, a note has been added') return;
            throw new LogicError(res.error);
        })();
	},

	listElectronicModuleNotes(electronicModuleId) {
        validate.arguments([
			{ name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true }
			
        ])
        validate.idMongodb(electronicModuleId)

		return (async() => {
            const res = await mceApi.listElectronicModuleNotes(this.__userToken__, electronicModuleId)
            const { error } = res
            if (error) throw new LogicError(error)
            return res
        })();
	},
	
	deleteElectronicModuleNotes(electronicModuleId, noteId) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'noteId', value: noteId, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(electronicModuleId)
        if (noteId != null) validate.idMongodb(noteId)

		return (async() => {
            const res = await mceApi.deleteElectronicModuleNotes(this.__userToken__, electronicModuleId, noteId)
            if (res.message === 'Ok, note is deleted.') return;
            if (res.message === 'Ok, notes are deleted.') return;
            throw new LogicError(res.error);
        })();
	},

	addElectronicModuleBudget(electronicModuleId, description, price) {
        validate.arguments([
            { name: 'description', value: description, type: 'string', notEmpty: true, optional: true },
            { name: 'price', value: price, type: 'number', notEmpty: true }
        ])
        validate.idMongodb(electronicModuleId)
        if(description) validate.description(description)
		return (async() => {
            const res = await mceApi.addElectronicModuleBudget(this.__userToken__, electronicModuleId, description, price)
            if (res.message === 'Ok, a product has been added') return;
            throw new LogicError(res.error);
        })();
	},

	listElectronicModuleBudgets(electronicModuleId) {
        validate.arguments([
			{ name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true }
			
        ])
        validate.idMongodb(electronicModuleId)

        return (async() => {
            const res = await mceApi.listElectronicModuleBudgets(this.__userToken__, electronicModuleId)
            const { error } = res
            if (error) throw new LogicError(error)
            return res
        })();
	},
	
	deleteElectronicModuleBudgets(electronicModuleId, productId) {
        validate.arguments([
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'productId', value: productId, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(electronicModuleId)
        if (productId != null) validate.idMongodb(productId)

        return (async() => {
            const res = await mceApi.deleteElectronicModuleNotes(this.__userToken__, electronicModuleId, productId)
            if (res.message === 'Ok, product is deleted.') return;
            if (res.message === 'Ok, products are deleted.') return;
            throw new LogicError(res.error);
        })();
	},
  };
  
  export default logic;