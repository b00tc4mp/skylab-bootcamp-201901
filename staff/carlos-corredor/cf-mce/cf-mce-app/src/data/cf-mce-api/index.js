import { errors, validate, call } from 'cf-mce-common';
const {ValueError} = errors

const mceApi = {
//   __url__: 'http://localhost:8080/api',

  __url__: 'https://evening-shelf-98053.herokuapp.com/api',

	registerUser(name, surname, email, password, category) {
		validate.arguments([
			{ name: 'name', value: name, type: 'string', notEmpty: true },
			{ name: 'surname', value: surname, type: 'string', notEmpty: true },
			{ name: 'email', value: email, type: 'string', notEmpty: true },
			{ name: 'password', value: password, type: 'string', notEmpty: true },
			{ name: 'category', value: category, type: 'string', notEmpty: true }
		]);
		validate.email(email)
		validate.category(category)

		return (async() => {
			const res = await call(`${this.__url__}/users`, {
				method: 'POST',
				body: {name, surname, email, password, category},
				headers: {
				'Content-Type': 'application/json',
				},
			})
			return res
		})()
	},

	authenticateUser(email, password) {
		validate.arguments([
			{ name: 'email', value: email, type: 'string', notEmpty: true },
			{ name: 'password', value: password, type: 'string', notEmpty: true }
		])
		validate.email(email)

		return (async() => {
			const res = await call(`${this.__url__}/users/auth`, {
				method: 'POST',
				body: { email, password },
				headers: {
					'Content-Type': 'application/json',
				},
			})
			return res
		})()
	},

	retrieveUser(token) {
		validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
		])

		return (async() => {
			const res = await call(`${this.__url__}/users`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		return res
	})()


	},

	registerCustomer(token, name, surname, phone, address, nid, email) {
		validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true, optional: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true, optional: true },
            { name: 'address', value: address, type: 'string', notEmpty: true, optional: true },
            { name: 'nid', value: nid, type: 'string', notEmpty: true },
			{ name: 'email', value: email, type: 'string', notEmpty: true, optional: true },
		])
		if(email) validate.email(email)
		
		return (async() => {
			const res = await call(`${this.__url__}/customers`, {
				method: 'POST',
				body: {name, surname, phone, address, nid, email},
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
		return res
		})()
	},

	findCustomers(token, query) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
			{ name: 'query', value: query, type: 'object', optional: true },
        ])
		let criteria = ""
		for (let key in query) {
			criteria = criteria + key + "=" + query[key] + "&"
		}
		criteria = criteria.slice(0,criteria.length-1)
		let urlFind = `${this.__url__}/customers` 
		if(criteria) urlFind += `?${criteria}`
        return (async() => {
			const res = await call(urlFind, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		return res
		})()
    },

	addCustomerNote(token, customerId, text) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'customerId', value: customerId, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true },
        ])
        validate.idMongodb(customerId)
		return (async() => {
			const res = await call(`${this.__url__}/customers/notes/${customerId}`, {
				method: 'POST',
				body: { text },
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			return res
		})()
	},
	
	listCustomerNotes(token, customerId) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
			{ name: 'customerId', value: customerId, type: 'string', notEmpty: true }
			
        ])
        validate.idMongodb(customerId)

		return (async() => {
			const res = await call(`${this.__url__}/customers/notes/${customerId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return res
		})()
	},
	
	deleteCustomerNotes(token, customerId, noteId) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'customerId', value: customerId, type: 'string', notEmpty: true },
            { name: 'noteId', value: noteId, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(customerId)
        if (noteId != null) validate.idMongodb(noteId)

		return (async() => {
			const res = await call(`${this.__url__}/customers/notes/${customerId}`, {
				method: 'DELETE',
				body: { noteId },
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			return res
		})()
	},
	
	registerElectronicModule(
		token,
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
			{ name: 'token', value: token, type: 'string', notEmpty: true },
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
            { name: 'status', value: status, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(owner)
        if (status != null)  validate.status(status)
        if (status == null) status = undefined
        if (device == null) device = undefined


        return (async() => {
			const res = await call(`${this.__url__}/electronicmodules`, {
				method: 'POST',
				body: {orderNumber,
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
					status},
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
		return res
		})()
	},

	updateElectronicModule(token, electronicModuleId, data) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', optional: true },
        ])
        validate.idMongodb(electronicModuleId)
		return (async() => {
			const res = await call(`${this.__url__}/electronicmodules/${electronicModuleId}`, {
				method: 'PUT',
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			return res
		})()
    },
	
	findElectronicModules(token, query) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
			{ name: 'query', value: query, type: 'object', optional: true },
        ])

		let criteria = ""
		for (let key in query) {
			criteria = criteria + key + "=" + query[key] + "&"
		}
		criteria = criteria.slice(0,criteria.length-1)
		let urlFind = `${this.__url__}/electronicmodules` 
		if(criteria) urlFind += `?${criteria}`
        return (async() => {
			const res = await call(urlFind, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		return res
		})()
	},

	addElectronicModuleNote(token, electronicModuleId, text) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true },
        ])
        validate.idMongodb(electronicModuleId)
		return (async() => {
			const res = await call(`${this.__url__}/electronicmodules/notes/${electronicModuleId}`, {
				method: 'POST',
				body: { text },
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			return res
		})()
	},

	listElectronicModuleNotes(token, electronicModuleId) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
			{ name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true }
			
        ])
        validate.idMongodb(electronicModuleId)

		return (async() => {
			const res = await call(`${this.__url__}/electronicmodules/notes/${electronicModuleId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return res
		})()
	},
	
	deleteElectronicModuleNotes(token, electronicModuleId, noteId) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'noteId', value: noteId, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(electronicModuleId)
        if (noteId != null) validate.idMongodb(noteId)

		return (async() => {
			const res = await call(`${this.__url__}/electronicmodules/notes/${electronicModuleId}`, {
				method: 'DELETE',
				body: { noteId },
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			return res
		})()
	},

	addElectronicModuleBudget(token, electronicModuleId, description, price) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true, optional: true },
            { name: 'price', value: price, type: 'number', notEmpty: true }
        ])
		validate.idMongodb(electronicModuleId)
		if(description) validate.description(description)
		return (async() => {
			const res = await call(`${this.__url__}/electronicmodules/budget/${electronicModuleId}`, {
				method: 'POST',
				body: { description, price },
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			return res
		})()
	},

	listElectronicModuleBudgets(token, electronicModuleId) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
			{ name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true }
			
        ])
        validate.idMongodb(electronicModuleId)

		return (async() => {
			const res = await call(`${this.__url__}/electronicmodules/budget/${electronicModuleId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return res
		})()
	},
	
	deleteElectronicModuleBudgets(token, electronicModuleId, productId) {
        validate.arguments([
			{ name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'electronicModuleId', value: electronicModuleId, type: 'string', notEmpty: true },
            { name: 'productId', value: productId, type: 'string', notEmpty: true, optional: true }
        ])
        validate.idMongodb(electronicModuleId)
        if (productId != null) validate.idMongodb(productId)

		return (async() => {
			const res = await call(`${this.__url__}/electronicmodules/budget/${electronicModuleId}`, {
				method: 'DELETE',
				body: { productId },
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			return res
		})()
	},
};

export default mceApi;
