'use strict'

require('dotenv').config()

const { mongoose, models: { User, Category, Product, Order } } = require('..')

const { env: { DB_URL } } = process

// WARN run this script from root folder: $ node demos/

mongoose.connect(DB_URL)
    .then(() => mongoose.connection.dropDatabase())
    .then(() => {
        // TODO insertions

        //Categories
        let beginnerCourseCategoryData = { name: 'Beginner Course', description: 'Beginner Course desc', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529448146/all-products/Screen_Shot_2018-06-20_at_00.37.04.png' }
        let IntermediateCourseCategoryData = { name: 'Intermediate Course', description: 'Intermediate Course desc', image: 'https://firebasestorage.googleapis.com/v0/b/ninja-firebase-tut-72a5c.appspot.com/o/bruno-mars.png?alt=media&token=9b5bcb33-af87-4f84-a92f-78ab1bc8a13b' }
        let advancedCourseCategoryData = { name: 'Advanced Course', description: 'Advanced Course desc', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529526355/categories/Screen_Shot_2018-06-20_at_22.18.39.png' }
        let improvCourseCategoryData = { name: 'Musical Improv Course', description: 'Musical Improv desc', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529526355/categories/Screen_Shot_2018-06-20_at_22.20.35.png' }
        let theoryCourseCategoryData = { name: 'Musical Theory Course', description: 'Musical Theory desc', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529526354/categories/Screen_Shot_2018-06-20_at_22.21.43.png' }
        let compositionCourseCategoryData = { name: 'Composition Course', description: 'Composition desc', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529526355/categories/Screen_Shot_2018-06-20_at_22.23.30.png' }

        //Products
        let beginnerCourseData = { name: 'Beginner Course I', price: 50, discount: 20, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529526468/all-products/Screen_Shot_2018-06-20_at_22.17.06.png', stock: 123 }
        let beginnerCourseData2 = { name: 'Beginner Course II', price: 60, discount: 15, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529448146/all-products/Screen_Shot_2018-06-20_at_00.39.15.png', stock: 11 }
        let beginnerCourseData3 = { name: 'Beginner Course III', price: 60, discount: 15, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529448145/all-products/Screen_Shot_2018-06-20_at_00.40.50.png', stock: 11 }
        let intermediateCourseData = { name: 'Intermediate Course I', price: 80, discount: 20, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529448145/all-products/Screen_Shot_2018-06-20_at_00.37.50.png', stock: 60 }
        let intermediateCourseData2 = { name: 'Intermediate Course II', price: 80, discount: 20, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529448145/all-products/Screen_Shot_2018-06-20_at_00.37.39.png', stock: 60 }
        let advancedCourseData = { name: 'Advanced Course I', price: 100, discount: 10, description: 'ALorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529448146/all-products/Screen_Shot_2018-06-20_at_00.39.35.png', stock: 20 }
        let improvCourseData = { name: 'Improv Course I', price: 50, discount: 10, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529448145/all-products/Screen_Shot_2018-06-20_at_00.39.43.png', stock: 40 }
        let theoryCourseData = { name: 'Musical Theory Course I', price: 70, discount: 10, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://res.cloudinary.com/duuegw4uf/image/upload/v1529448144/all-products/Screen_Shot_2018-06-20_at_00.38.21.png', stock: 33 }
        let compositionCourseData = { name: 'Composition Course I', price: 40, discount: 0, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim reiciendis corporis dignissimos, blanditiis a iste sed esse delectus unde dolores, nulla iusto quia, animi doloribus distinctio soluta. Aut, et expedita.', image: 'https://firebasestorage.googleapis.com/v0/b/ninja-firebase-tut-72a5c.appspot.com/o/bruno-mars.png?alt=media&token=9b5bcb33-af87-4f84-a92f-78ab1bc8a13b', stock: 49 }

        return Promise.all([
            Category.create(beginnerCourseCategoryData),
            Category.create(IntermediateCourseCategoryData),
            Category.create(advancedCourseCategoryData),
            Category.create(improvCourseCategoryData),
            Category.create(theoryCourseCategoryData),
            Category.create(compositionCourseCategoryData)
        ])
            .then(res => {
                beginnerCourseData.category = res[0]._id
                beginnerCourseData2.category = res[0]._id
                beginnerCourseData3.category = res[0]._id
                intermediateCourseData.category = res[1]._id
                intermediateCourseData2.category = res[1]._id
                advancedCourseData.category = res[2]._id
                improvCourseData.category = res[3]._id
                theoryCourseData.category = res[4]._id
                compositionCourseData.category = res[5]._id

                return Promise.all([
                    Product.create(beginnerCourseData),
                    Product.create(beginnerCourseData2),
                    Product.create(beginnerCourseData3),
                    Product.create(intermediateCourseData),
                    Product.create(intermediateCourseData2),
                    Product.create(advancedCourseData),
                    Product.create(improvCourseData),
                    Product.create(theoryCourseData),
                    Product.create(compositionCourseData),
                ])
            })
    })
    .then(() => User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', address: 'Roc Boronat 35', password: '123' }))
    .then(() => mongoose.disconnect())
    .then(() => console.log('done'))