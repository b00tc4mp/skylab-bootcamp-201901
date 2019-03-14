'use strict'

const mongoose = require('mongoose')

const { SchemaTypes: { ObjectId }, Schema } = mongoose

// const Cat = mongoose.model('Cat', { name: String, age: Number })

mongoose.connect('mongodb://localhost/skylab', { useNewUrlParser: true })

// CRUD

// create

// const symba = new Cat({ name: 'Symba', age: 33 })

// symba.save()
//     .then(() => console.log('saved', symba.id))

// Cat.create({ name: 'Symba', age: 33 })
//     .then(symba => console.log('created', symba))

// retrieve

// Cat.findOne({ name: 'Symba'})
//     .then(console.log)

// update

// Cat.findOneAndUpdate({ name: 'Symba'}, { age: 23 })
//     .then(console.log)

// Cat.findOne({ name: 'Symba'})
//     .then(symba => {
//         symba.age = 33

//         return symba.save()
//     })
//     .then(() => console.log('updated'))

// delete

// Cat.findOneAndDelete({ name: 'Symba'})
//     .then(console.log)

// Cat.find({ name: 'Symba'})
//     .then(symbas => Promise.all(symbas.map(symba => Cat.findByIdAndDelete(symba.id))))
//     .then(() => console.log('all symbas deleted'))

// Linked models

// // const Pet = mongoose.model('Pet', { name: String, age: Number, brand: String, model: String, owners: [ObjectId] })
// const Pet = mongoose.model('Pet', { name: String, age: Number, brand: String, model: String, owners: [{ type: ObjectId, ref: 'Owner' }] })
// // const Owner = mongoose.model('Owner', { name: String, surname: String, pets: [ObjectId] })
// const Owner = mongoose.model('Owner', { name: String, surname: String, pets: [{ type: ObjectId, ref: 'Pet' }] })

// Promise.all([
//     Pet.deleteMany(),
//     Owner.deleteMany()
// ])
//     .then(() =>
//         Promise.all([
//             Pet.create({ name: 'Salsito', age: 15, brand: 'cat', model: 'egyptian' }),
//             Pet.create({ name: 'Rumba', age: 5, brand: 'cat', model: 'mixed' }),
//             Pet.create({ name: 'Clave', age: 7, brand: 'cat', model: 'siamese' }),
//             Owner.create({ name: 'Nico', surname: 'Papito' }),
//             Owner.create({ name: 'Tachi', surname: 'Mamito' })
//         ])
//     )
//     .then(([salsito, rumba, clave, nico, tachi]) => {
//         salsito.owners = [nico.id, tachi.id]
//         clave.owners = salsito.owners
//         rumba.owners = [tachi.id]

//         nico.pets = [salsito.id, clave.id]
//         tachi.pets = [salsito.id, clave.id, rumba.id]

//         return Promise.all([salsito.save(), clave.save(), rumba.save(), nico.save(), tachi.save()])
//     })
//     .then(([salsito, clave, rumba, nico, tachi]) =>
//         Pet.find({ owners: { $elemMatch: { $eq: nico.id } } })
//             // .then(console.log)
//             .then(() => Owner.find({ pets: { $elemMatch: { $eq: rumba.id } } }))
//             // .then(console.log)
//             // .then(() => console.log(salsito.owners))
//             // .then(() => salsito.populate('owners'))
//             .then(() => Pet.findById(salsito.id).populate('owners'))
//             .then(console.log)
//     )


const Student = new Schema({ name: String })
const Course = new Schema({ name: String, students: [Student] })

const models = {
    Student: mongoose.model('Student', Student),
    Course: mongoose.model('Course', Course)
}

{
    const { Student, Course } = models

    const tachi = new Student({ name: 'Tachi' })
    const nico = new Student({ name: 'Nico' })

    const bootcamp = new Course({ name: 'Skylab Bootcamp 201901', students: [tachi, nico] })

    bootcamp.save()
        .then(console.log)
}


