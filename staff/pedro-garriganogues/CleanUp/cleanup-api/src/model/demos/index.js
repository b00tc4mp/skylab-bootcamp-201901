'use strict'
// V1 with no product
// require('dotenv').config()

// const mongoose = require('mongoose')
// const { User } = require('../')

// const { env: { DB_URL } } = process

// mongoose.connect(DB_URL, { useNewUrlParser: true })
//     .then(() => Promise.all([User.deleteMany()]))
//     .then(() => User.create({ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123' }))
//     .then(() => mongoose.disconnect())
//     .then(() => console.log('demo ended'))


require('dotenv').config()

const { mongoose, models: { User, Product } } = require('..')

const { env: { DB_URL } } = process



mongoose.connect(DB_URL)
    .then(() => mongoose.connection.dropDatabase())
    .then(() => {

        let product1 = { name: 'Gorilla Daddy', price: 1, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwqmKZ27FtPXuXiptGNsxtXlvA8_Ugp5cHA_mhNCXyWeTVIsph', stock: 123 }
        let product2 = { name: 'Discount batman', price: 2, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://i.pinimg.com/originals/2a/ed/3a/2aed3acfb1d24d547128b57928bc6506.jpg', stock: 11 }
        let product3 = { name: 'Waste of potential', price: 3, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://i0.wp.com/culturageek.com.ar/wp-content/uploads/2018/12/The-Umbrella-Academy-5.jpg', stock: 11 }
        let product4 = { name: 'Moron', price: 4, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://m.media-amazon.com/images/M/MV5BODc2MTExMzUwOV5BMl5BanBnXkFtZTgwNzA0NDg0NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg', stock: 60 }
        let product5 = { name: 'Pretty fly', price: 5, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://elcomercio.pe/files/listing_ec_flujo_xx/uploads/2019/02/13/5c647b7aef200.jpeg', stock: 60 }
        let product6 = { name: '#blameLorgar', price: 7, description: 'ALorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'http://es.web.img3.acsta.net/r_1280_720/pictures/18/10/09/16/15/1407937.jpg', stock: 20 }

            .then(res => {
                product1.category = res[1]._id
                product2.category = res[2]._id
                product3.category = res[3]._id
                product4.category = res[4]._id
                product5.category = res[5]._id
                product6.category = res[7]._id


                return Promise.all([
                    Product.create(product1),
                    Product.create(product2),
                    Product.create(product3),
                    Product.create(product4),
                    Product.create(product5),
                    Product.create(product6),

                ])
            })
    })
    .then(() => User.create({ name: 'demoCreated', surname: 'demoCreated', email: 's@s.com', address: 'Server Side', password: 's' }))
    .then(() => mongoose.disconnect())
    .then(() => console.log('demo ended'))

