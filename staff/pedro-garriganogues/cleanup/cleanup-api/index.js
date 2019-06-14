'use strict'

require('dotenv').config()

const express = require('express')
const router = require('./src/routes/index')
const cors = require('cors')
const { models: { Product }, mongoose } = require('cleanup-data')

const { env: { PORT, DB_URL } } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => Product.deleteMany())
    .then(() => {

        let product1 = { name: 'Limpiado estándar', price: 29.99, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://i.gyazo.com/ed28358bd5f6674ee7cc8f0f27f5e349.png', stock: 999 }

        let product2 = { name: 'Limpiado intensivo', price: 39.99, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://i.gyazo.com/9ca3170984d2653c518231ebfee46e39.png', stock: 999 }

        let product3 = { name: 'Mes de servicios semanales', price: 109.99, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://i.gyazo.com/6fe351cfd678c286f220a16328a844ae.png', stock: 999 }

        let product4 = { name: 'Limpieza de equipo electronico', price: 49.99, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'http://markmentzer.com/wordpress/wp-content/uploads/2013/07/jetsons-color-61.jpg', stock: 999 }

        let product5 = { name: 'Otros servicios de limpieza', price: 68.99, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://i.gyazo.com/1fa4aa9a3ca5d1c1aefb1588af5e5426.jpg', stock: 999 }


        return Promise.all([
            Product.create(product1),
            Product.create(product2),
            Product.create(product3),
            Product.create(product4),
            Product.create(product5),

        ])
    })
    .then(() => {
        const port = PORT || process.argv[2] || 3000

        const app = express()

        app.use(cors())

        app.use('/', router)

        app.listen(port, () => console.log(`server running on port ${port}`))

        process.on('SIGINT', () => {
            mongoose.disconnect()
                .then(() => {
                    console.log('\nserver stopped')

                    process.exit(0)
                })
        })
    })
    .catch(console.error)
