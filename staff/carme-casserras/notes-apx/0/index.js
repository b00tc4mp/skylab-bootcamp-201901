import mongoose from 'mongoose'
import models from './models'

const {User, Note} = models;

(async () => {

    await mongoose.connect('mongodb://localhost/notes-apx', { UseNewUrlParser: true })

    console.log('conectec to database')
    








})