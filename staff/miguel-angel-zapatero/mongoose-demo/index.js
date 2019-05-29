require('dotenv').config()
const mongoose = require('mongoose')
const { Hero, Villians } = require('./models')

const { env: { URL_MONGOOSE_TEST: url } } = process;

(async () => {
    try {
        await mongoose.connect(url, {useNewUrlParser: true})
        console.log('Connection to mongo database')

        await Hero.deleteMany()
        await Villians.deleteMany()

        const spiderman = new Hero({
            name: 'Spiderman', 
            realName: 'Peter Park', 
            age: 20, 
            powers: ['Telaraña', 'Sentido aracnido']
        })
        await spiderman.save()

        await Villians.create({
            name: 'Magneto', 
            realName: 'Bruce', 
            age: 53, 
            powers: ['Control Magnetism']
        })

        await mongoose.disconnect()
    } catch (error) {
        console.log(error.message)
    }
})()