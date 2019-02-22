'use strict'

const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://localhost:27017/skylab'

MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
        const db = client.db()

        // const cars = db.collection('cars')

        // cars.insertOne({ brand: 'Ferrari', model: 'FXX', year: 2004, hp: 651 })
        //     .then(() =>
        //         cars.insertOne({ brand: 'Rimac', model: 'Concept One', year: 2018, hp: 593 })
        //     )
        //     .then(() => console.log('inserted!'))

        // cars.find({ year: { $gte: 2010 }}).toArray()
        //     .then(cars => cars.forEach(car => console.log(car.brand, car.model)))

        // cars.findOne({ brand: 'Nissan', model: 'Micra', year: 2006 })
        //     .then(car => {
        //         debugger

        //         car.year = 2005

        //         return cars.updateOne({ _id: ObjectId(car._id.toString()) }, { $set: car })
        //     })
        //     .catch(console.error)

        // cars.findOneAndUpdate({ brand: 'Nissan', model: 'Micra', year: 2005 }, { $set: { year: 2002 } })
        //     .then(console.log)

        // cars.deleteOne({ model: 'Micra' })

        const users = db.collection('users')

        users.deleteMany()
            .then(() => client.close())
    })