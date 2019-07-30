const mongoose = require ('mongoose')
const userSchema = require ('./user')
const {deviceSchema, inputSchema, outputSchema} = require ('./device')

const model = mongoose.model.bind(mongoose)

module.exports = {
    Users: model('Users', userSchema ),
    Devices: model('Devices', deviceSchema),
    Inputs: model('Inputs', inputSchema),
    Outputs: model('Outputs', outputSchema)
}