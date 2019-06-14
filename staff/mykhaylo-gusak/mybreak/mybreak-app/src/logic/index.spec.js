import logic from './index.js'
import dataApi from '../data/dataApi/index.js'
const { mongoose, models: { User, Product, Order } } = require('mybreak-data');

const url = 'mongodb://heroku_lqxck8fs:48ol3o2o55vd9dgiinld0h6p0a@ds335957.mlab.com:35957/heroku_lqxck8fs';

describe('logic', () => {
    let userData, name, surname, email, password, age

    beforeAll(async () => {
        mongoose.connect(url, { useNewUrlParser: true })
        await Product.deleteMany()
    })

    it('should create oproducts !!', async () => {

        // Coffee
        await Product.create({ title: 'Coffee', price: '1.5', category: 'Drink', subCategory: 'Coffee', image: 'https://image.flaticon.com/icons/svg/1153/1153111.svg' })
        await Product.create({ title: 'Capuccino', price: '1.75', category: 'Drink', subCategory: 'Coffee', image: 'https://image.flaticon.com/icons/svg/1732/1732215.svg' })
        await Product.create({ title: 'Mocca', price: '1.5', category: 'Drink', subCategory: 'Coffee', image: 'https://image.flaticon.com/icons/svg/1816/1816279.svg' })
        await Product.create({ title: 'Solo', price: '1.75', category: 'Drink', subCategory: 'Coffee', image: 'https://image.flaticon.com/icons/svg/924/924514.svg' })

        // Refreshing drink


        // Juice
        await Product.create({ title: 'Strawberry', price: '2.5', category: 'Drink', subCategory: 'Juice', image: 'https://image.flaticon.com/icons/svg/167/167254.svg' })
        await Product.create({ title: 'Watermelon', price: '2.5', category: 'Drink', subCategory: 'Juice', image: 'https://image.flaticon.com/icons/svg/167/167248.svg' })
        await Product.create({ title: 'Lemon', price: '2.75', category: 'Drink', subCategory: 'Juice', image: 'https://image.flaticon.com/icons/svg/167/167252.svg' })
        await Product.create({ title: 'Cherry', price: '2.5', category: 'Drink', subCategory: 'Juice', image: 'https://image.flaticon.com/icons/svg/167/167250.svg' })
        await Product.create({ title: 'Pineapple ', price: '2.5', category: 'Drink', subCategory: 'Juice', image: 'https://image.flaticon.com/icons/svg/167/167258.svg' })
        await Product.create({ title: 'Banana', price: '2.5', category: 'Drink', subCategory: 'Juice', image: 'https://image.flaticon.com/icons/svg/167/167257.svg' })
        await Product.create({ title: 'Kiwi', price: '2.75', category: 'Drink', subCategory: 'Juice', image: 'https://image.flaticon.com/icons/svg/167/167253.svg' })
        await Product.create({ title: 'Carrot', price: '2.60', category: 'Drink', subCategory: 'Juice', image: 'https://image.flaticon.com/icons/svg/167/167256.svg' })

        // Burger
        await Product.create({ title: 'Cheeseburger', price: '1.1', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046784.svg' })
        await Product.create({ title: 'Big burger', price: '0.6', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046787.svg' })
        await Product.create({ title: 'Kebab', price: '1.1', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046764.svg' })
        await Product.create({ title: 'Pizza', price: '1.2', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046771.svg' })
        await Product.create({ title: 'Taco', price: '1.1', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046759.svg' })
        await Product.create({ title: 'Hot dog', price: '1.2', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046779.svg' })
        await Product.create({ title: 'Noodles ', price: '1.1', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046748.svg' })
        await Product.create({ title: 'Fried potatoes ', price: '1.0', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046786.svg' })
        await Product.create({ title: 'Fried potatoes ', price: '1.1', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046786.svg' })
        await Product.create({ title: 'Salade ', price: '1.5', category: 'Food', subCategory: 'Fast food', image: 'https://image.flaticon.com/icons/svg/1046/1046786.svg' })

        // Fruits
        await Product.create({ title: 'Apple', price: '1.5', category: 'Food', subCategory: 'Fruits', image: 'https://image.flaticon.com/icons/svg/415/415733.svg' })
        await Product.create({ title: 'Pineapple', price: '1.75', category: 'Food', subCategory: 'Fruits', image: 'https://image.flaticon.com/icons/svg/135/135598.svg' })
        await Product.create({ title: 'Cherries ', price: '1', category: 'Food', subCategory: 'Fruits', image: 'https://image.flaticon.com/icons/svg/135/135695.svg' })
        await Product.create({ title: 'Watermelon', price: '1.25', category: 'Food', subCategory: 'Salade', image: 'https://image.flaticon.com/icons/svg/1809/1809230.svg' })
        await Product.create({ title: 'Banana', price: '1', category: 'Food', subCategory: 'Salade', image: 'https://image.flaticon.com/icons/svg/1808/1808744.svg' })
        await Product.create({ title: 'Grape  ', price: '2', category: 'Food', subCategory: 'Fruits', image: 'https://image.flaticon.com/icons/svg/1514/1514997.svg' })
        await Product.create({ title: 'Pear  ', price: '1', category: 'Food', subCategory: 'Fruits', image: 'https://image.flaticon.com/icons/svg/135/135576.svg' })

        // Boleria
        await Product.create({ title: 'Croissant ', price: '1.1', category: 'Bakery', subCategory: 'Bakery', image: 'https://image.flaticon.com/icons/svg/1888/1888782.svg' })
        await Product.create({ title: 'Cookie', price: '2.4', category: 'Bakery', subCategory: 'Bakery', image: 'https://image.flaticon.com/icons/svg/541/541732.svg' })
        await Product.create({ title: 'Cookie', price: '1.1', category: 'Bakery', subCategory: 'Bakery', image: 'https://image.flaticon.com/icons/svg/541/541803.svg' })
        await Product.create({ title: 'Donut', price: '2', category: 'Bakery', subCategory: 'Bakery', image: 'https://image.flaticon.com/icons/svg/1725/1725630.svg' })
        await Product.create({ title: 'Cupcake', price: '1.1', category: 'Bakery', subCategory: 'Bakery', image: 'https://image.flaticon.com/icons/svg/1725/1725660.svg' })
        await Product.create({ title: 'Cupcake ', price: '1.75', category: 'Bakery', subCategory: 'Bakery', image: 'https://image.flaticon.com/icons/svg/1824/1824449.svg' })
        await Product.create({ title: 'Cake', price: '1.1', category: 'Bakery', subCategory: 'Bakery', image: 'https://image.flaticon.com/icons/svg/992/992754.svg' })
        await Product.create({ title: 'Macaron ', price: '1.5', category: 'Bakery', subCategory: 'Bakery', image: 'https://image.flaticon.com/icons/svg/1725/1725653.svg' })


    })


    afterAll(async () => {
        mongoose.disconnect()
    })




})