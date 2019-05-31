const { Schema, ObjectId } = require('mongoose')

const city = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    cinemas: [{ type: ObjectId, ref: 'cinema'}]
})

module.exports = city


// {
//     name: 'Barcelona',
//     link: 'https://www.ecartelera.com/cines/0,9,23.html',
//     cinemas: [{}]
// }