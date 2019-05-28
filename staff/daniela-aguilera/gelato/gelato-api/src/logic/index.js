const { User, Order } = require('gelato-data')
const LogicError = require('./logic-error')
const validate = require('../../../gelato-validation/validate/index')

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
        await User.create({ name, surname, email, password })
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
      if (user.password === password && email === user.email) return user.id
      else throw new LogicError('wrong credentials')
    })()
  },

  retrieveUserBy (id) {
    validate.arguments([
      { name: 'id', value: id, type: 'string', notEmpty: true }
    ])

    return (async () => {
      return User.findById(id).select('name surname email -_id').lean()
    })()
  },

  removeUser (userId) {
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

  addOrder ({ client, type, size, flavors }) {
    validate.arguments([
      { name: 'client', value: client, type: 'string', notEmpty: true },
      { name: 'type', value: type, type: 'string', notEmpty: true },
      { name: 'size', value: size, type: 'string', notEmpty: true },
      { name: 'flavors', value: flavors, type: 'object', notEmpty: true }
    ])

    return (async () => {
      await Order.create({ client, type, size, flavors })
    })()
  },

  removeOneOrder (orderId) {
    validate.arguments([
      { name: 'orderId', value: orderId, type: 'string', notEmpty: true }
    ])
    return (async () => {
      const isHereTheOrder = await Order.find({ _id: orderId })
      if (!isHereTheOrder.length) {
        throw new LogicError('Order not found')
      } else {
        await Order.deleteOne({ _id: orderId })
      }
    })()
  },
  // removeAllUserOrders (userId) {
  //   validate.arguments([
  //     { name: 'userId', value: userId, type: 'string', notEmpty: true }
  //   ])

  //   return (async () => {
  //     await Order.deleteMany({ client: userId })
  //   })()
  // },

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

  retrieveAllOrders () {
    return (async () => {
      const allOrders = await Order.find().populate('client', 'name').lean()

      allOrders.forEach(order => {
        order.id = order._id.toString()
        delete order._id

        const { client } = order

        if (!client.id) {
          client.id = client._id.toString()
          delete client._id
        }
      })
      return allOrders
    })()
  },

  retrieveOneOrderByOrderId (orderId) {
    validate.arguments([
      { name: 'orderId', value: orderId, type: 'string', notEmpty: true }
    ])
    return (async () => {
      const order = await Order.find({ _id: orderId })
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
  }
}

module.exports = logic
