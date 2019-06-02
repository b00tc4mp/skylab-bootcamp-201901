'use strict'

const User = require('./models/user')
const Order = require('./models/order')
const mongoose = require('mongoose')

const inventory = {
  FLAVORS: {
    0: { literal: 'Blackberry Rosé' },
    1: { literal: 'Chocolate Caramel' },
    2: { literal: 'Avocado with Lemon' },
    3: { literal: 'Exotic Mango' },
    4: { literal: 'Special Mint' },
    5: { literal: 'Watermelon' }
  },

  SIZES: {
    0: { literal: 'small', multiplierPrice: 1 },
    1: { literal: 'medium', multiplierPrice: 2 },
    2: { literal: 'big', multiplierPrice: 3 }
  },

  LIMIT_FLAVORS: {
    0: 2, // small
    1: 3, // medium
    2: 4 // big
  },

  TYPES: {
    0: { literal: 'cone', price: 4 },
    1: { literal: 'tub', price: 3 }
  }
}

module.exports = {
  inventory,
  mongoose,
  User: mongoose.model('User', User),
  Order: mongoose.model('Order', Order)
}
