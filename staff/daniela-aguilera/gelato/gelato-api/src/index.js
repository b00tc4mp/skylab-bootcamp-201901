const { PORT } = require('./config')

const express = require('express')
const cors = require('cors')

const routes = require('./routes')
const connectToDatabase = require('./db-connection')

const { ENV } = require('./config')

;(async () => {
  try {
    await connectToDatabase({ isTest: ENV === 'test' })

    const app = express()

    app.use(cors())

    app.use('/api', routes)

    app.use((req, res) => {
      res.status(404).json({ error: 'Route not found' })
    })

    app.listen(PORT, () => {
      if (ENV === 'test') {
        console.log('👀 ⚠️  API RUNNING ON TEST MODE!')
      }
      console.log(`🚀 API ready on port ${PORT}`)
    })
  } catch (error) {
    console.log(error.name, error.message)
  }
})()
