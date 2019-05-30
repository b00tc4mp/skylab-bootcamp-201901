import mongoose from 'mongoose'
import schemas from './schemas'

const { user, presentation , slide, element } = schemas

export default { 
    User: mongoose.model('User', user),
    Presentation: mongoose.model('Presentation', presentation),
    Slide: mongoose.model('Slide', slide),
    Element: mongoose.model('Element', element)
}