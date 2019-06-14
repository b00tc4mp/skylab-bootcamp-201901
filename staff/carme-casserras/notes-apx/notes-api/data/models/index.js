import mongoose from 'mongoose'
import schemas from './schemas'

const { user, note } = schemas

const model = mongoose.model.bind(mongoose)


export default { 
    User: model('User', user),
    Note: model('Note', note)
}