const mongoose = require('mongoose')
const { Schema } = mongoose
const prompts = require('prompts');

(async () => {
    try {
        // init

        await mongoose.connect('mongodb://localhost/mongoose-test', { useNewUrlParser: true })

        console.log('connected to database')

        const userSchema = new Schema({
            name: String,
            surname: String,
            email: String,
            password: String,
            age: Number
        })

        userSchema.methods.wtfholic = function () {
            return this.age > 17 ? 'alcoholic' : 'milkaholic'
        }

        const User = mongoose.model('User', userSchema)

        // use

        await User.deleteMany()

        const sho = new User({ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', age: 25 })

        await sho.save()

        // const daniela = await User.create({ name: 'Daniela', surname: 'Aguilera', email: 'dg@gmail.com', age: 17 })

        const daniela = await new User({ name: 'Daniela', surname: 'Aguilera', email: 'dg@gmail.com', age: 17 }).save()

        const { value } = await prompts({
            type: 'number',
            name: 'value',
            message: 'How old are you?',
            // validate: value => value < 18 ? `Nightclub is 18+ only` : true
        })

        daniela.age = value

        await daniela.save()

        //delete daniela.age

        // daniela.height = 210 // ?

        // daniela.name = 123 // ?
        
        // daniela.age = 'kk' // ?

        // await daniela.save()

        console.log(daniela.wtfholic())

        await mongoose.disconnect()
    } catch (error) {
        console.error(error)
    }
})()