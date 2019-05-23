const mongoose = require('mongoose')
const User = require('./models/User');

(async () => {
    try {
        await mongoose.connect('mongodb://localhost/Users', { useNewUrlParser: true })
        console.log('Connected')

        await User.create({ name: "LLorence", surname: "sadasd", age: "99", email: "Viejochoco@msn.com" }) // if use other

        await User.find({})
            .exec(function (err, users) {
                if (err) console.log(err)
                else console.log(users)
            })

        await User.deleteMany()

        mongoose.disconnect()
        console.log("Disconected")

    } catch (error) {
        console.log(error.message)
        mongoose.connection.close()
        console.log("Disconected")
    }
})()