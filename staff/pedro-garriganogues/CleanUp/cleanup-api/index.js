'use strict'

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const router = require('./src/routes/index')
const cors = require('cors')
const { Product } = require('./src/model')

const { env: { PORT, DB_URL } } = process

mongoose.connect(DB_URL)
    .then(() => Product.deleteMany())
    .then(() => {

        let product1 = { name: 'Gorilla Daddy', price: 1, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwqmKZ27FtPXuXiptGNsxtXlvA8_Ugp5cHA_mhNCXyWeTVIsph', stock: 123 }
        let product2 = { name: 'Discount batman', price: 2, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://i.pinimg.com/originals/2a/ed/3a/2aed3acfb1d24d547128b57928bc6506.jpg', stock: 11 }
        let product3 = { name: 'Waste of potential', price: 3, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://i0.wp.com/culturageek.com.ar/wp-content/uploads/2018/12/The-Umbrella-Academy-5.jpg', stock: 11 }
        let product4 = { name: 'Moron', price: 4, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://m.media-amazon.com/images/M/MV5BODc2MTExMzUwOV5BMl5BanBnXkFtZTgwNzA0NDg0NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg', stock: 60 }
        let product5 = { name: 'Pretty fly', price: 5, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://elcomercio.pe/files/listing_ec_flujo_xx/uploads/2019/02/13/5c647b7aef200.jpeg', stock: 60 }

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
