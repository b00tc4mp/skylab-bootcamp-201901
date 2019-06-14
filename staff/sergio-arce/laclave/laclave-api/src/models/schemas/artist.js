const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Artist = new Schema({

    name: {
        type: String,
        required: true,
        minlength: [2, 'nombre del artista muy corto'],
        maxlength: [50, 'nombre del artista muy largo']
    },

    year: {
        type: Number,
        required: true,
        min: [16, 'no se admiten artistas menores de 16 años'],
        max: [5000, 'no se admiten artistas mayores de 100 años']
    },

    country: {
        type: String,
        required: true,
        minlength: [2, 'nombre de la nacionalidad muy corto'],
        maxlength: [50, 'nombre de la nacionalidad muy largo']
 
    },

    category: {
        type: [String],
        required: true,
        enum: ['salsa', 'bachata', 'mambo']
    },

    image: {
        type: String,
        required: true,
        default: 'https://goandance-images.imgix.net/artists/images/1321-adolfo-indacochea-20180612202916.jpg'
    },
    owner: { 
        type: ObjectId, 
        ref: 'User' 
    },

    resultsType: {
        type: String,
        required: true,
        default: 'artist'
    }
})

module.exports = Artist