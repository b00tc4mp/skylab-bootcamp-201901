const { User, Order, Event } = require('gelato-data')
const { LogicError, UnauthorizedError } = require('gelato-errors')
const validate = require('gelato-validation')
const bcrypt = require('bcrypt')

const logic = {
  registerUser (name, surname, email, password) {
    validate.arguments([
      { name: 'name', value: name, type: 'string', notEmpty: true },
      { name: 'surname', value: surname, type: 'string', notEmpty: true },
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true }
    ])

    validate.email(email)

    return (async () => {
      try {
        const hash = await bcrypt.hash(password, 10)
        await User.create({ name, surname, email, password: hash })
      } catch (error) {
        throw new LogicError(error.message)
      }
    })()
  },

  authenticateUser (email, password) {
    validate.arguments([
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true }
    ])

    return (async () => {
      const user = await User.findOne({ email })
      if (!user) throw new LogicError('wrong credentials')

      const match = await bcrypt.compare(password, user.password)

      if (match) {
        return { id: user.id, superUser: user.superUser }
      } else throw new LogicError('wrong credentials')
    })()
  },

  retrieveUserBy (id) {
    validate.arguments([
      { name: 'id', value: id, type: 'string', notEmpty: true }
    ])

    return (async () => {
      const user = await User.findById(id).lean()
      delete user.password
      return user
    })()
  },

  updateUser (id, data) {
    validate.arguments([
      { name: 'id', value: id, type: 'string', notEmpty: true },
      { name: 'data', value: data, type: 'object', notEmpty: true, optional: true }
    ])

    const { name, surname, email, password } = data

    if (email) {
      validate.email(email)
    }

    return (async () => {
      const user = await User.findById(id)
      if (!user) throw new LogicError(`user with id "${id}" does not exist`)

      // const existingEmail = await User.findOne({ email: email })
      // if (existingEmail) throw new LogicError(`email "${email}" already exist`)

      const data = {
        name: name || user.name,
        surname: surname || user.surname,
        email: email || user.email,
        password: password || user.password
      }

      await User.findByIdAndUpdate(id, data)
    })()
  },

  removeUser (userId, email) {
    validate.arguments([
      { name: 'userId', value: userId, type: 'string', notEmpty: true }
    ])

    return (async () => {
      const isHereTheUser = await User.find({ _id: userId })
      if (!isHereTheUser.length) {
        throw new LogicError('User not found')
      } else {
        await User.deleteOne({ _id: userId })
        await Order.deleteMany({ client: userId })
      }
    })()
  },

  addOrder ({ client, type, size, flavors, totalPrice }) {
    validate.arguments([
      { name: 'client', value: client, type: 'string', notEmpty: true },
      { name: 'type', value: type, type: 'string', notEmpty: true },
      { name: 'size', value: size, type: 'string', notEmpty: true },
      { name: 'flavors', value: flavors, type: 'object', notEmpty: true },
      { name: 'totalPrice', value: totalPrice, type: 'number', notEmpty: true }
    ])

    return (async () => {
      await Order.create({ client, type, size, flavors, totalPrice })
    })()
  },

  removeOneOrder ({ orderId, isAdmin, userId }) {
    validate.arguments([
      { name: 'userId', value: userId, type: 'string', notEmpty: true },
      { name: 'orderId', value: orderId, type: 'string', notEmpty: true }
    ])

    return (async () => {
      const isHereTheOrder = await Order.find({ _id: orderId }).lean()
      if (!isHereTheOrder.length) {
        throw new LogicError('Order not found')
      } else {
        const order = isHereTheOrder[0]
        if (isAdmin || userId === order.client.toString()) {
          await Order.deleteOne({ _id: orderId })
        } else {
          throw new UnauthorizedError("You're not authorized to do this")
        }
      }
    })()
  },

  retrieveOrdersByUserId (userId) {
    validate.arguments([
      { name: 'userId', value: userId, type: 'string', notEmpty: true }
    ])
    return (async () => {
      const orders = await Order.find({ client: userId }).populate('client', 'name').lean()
      if (orders.length) {
        const [{ client }] = orders
        client.id = client._id.toString()
        delete client._id

        orders.forEach(order => {
          order.id = order._id.toString()
          delete order._id
        })
      }

      return orders
    })()
  },

  retrieveAllOrders ({ isAdmin }) {
    validate.arguments([
      { name: 'isAdmin', value: isAdmin, type: 'boolean' }
    ])

    return (async () => {
      if (!isAdmin) throw new UnauthorizedError('You do not have permission to do this')

      let allOrders = await Order.find().populate('client', 'name').lean()

      if (allOrders.length >= 1) {
        allOrders.forEach(order => {
          order.id = order._id.toString()
          delete order._id
          const { client } = order

          if (!client.id) {
            client.id = client._id.toString()
            delete client._id
          }
        })
      } else {
        throw new LogicError("Sorry, you don't have any order")
      }

      return allOrders
    })()
  },

  retrieveOneOrderByOrderId ({ orderId, userId }) {
    validate.arguments([
      { name: 'orderId', value: orderId, type: 'string', notEmpty: true }
    ])
    return (async () => {
      const order = await Order.find({ _id: orderId, client: userId })
      if (order.length >= 1) {
        const [{ client }] = order
        client.id = client._id.toString()
        delete client._id

        order.forEach(order => {
          order.id = order._id.toString()
          delete order._id
        })
      } else {
        throw new LogicError('order Id not found')
      }
      return order
    })()
  },

  createEvent (type, description, image, isAdmin) {
    validate.arguments([
      { name: 'type', value: type, type: 'string', notEmpty: true },
      { name: 'description', value: description, type: 'string', notEmpty: true },
      { name: 'image', value: image, type: 'string', notEmpty: true },
      { name: 'isAdmin', value: isAdmin, type: 'boolean' }
    ])

    return (async () => {
      if (isAdmin) {
        try {
          await Event.create({ type, description, image })
        } catch (error) {
          throw new LogicError(error.message)
        }
      } else {
        throw new UnauthorizedError('You do not have permission to do this')
      }
    })()
  }
}

module.exports = logic
