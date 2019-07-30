'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
  if(err) {
    return console.log(`Error "${err}" while trying to connect to database, please check if your database is running`)
  }
  console.log('Conection to database stablished')

  app.listen(config.port, () => {
    console.log(`api rest running on http://localhost:${config.port}`)
  })
})
