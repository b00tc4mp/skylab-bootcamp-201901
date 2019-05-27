
import freendiesApi from '../api'

const logic = {


    registerUser(username, email, password, passwordConfirmation) {
        debugger
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(`${passwordConfirmation} is not a string`)

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return freendiesApi.registerUser(username, email, password, passwordConfirmation)
    },



    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!password.trim().length) throw Error('password cannot be empty')
    
        return freendiesApi.authenticateUser(email, password)
    },


    uploadGame(title, genre, description, images, gameFile){
        if(typeof title !=='string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw Error('title cannot be empty')
        if(typeof genre !=='string') throw TypeError(`${genre} is not a string`)
        if (!genre.trim().length) throw Error('genre cannot be empty')
        if(typeof description !=='string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error('description cannot be empty')
        if(typeof images !=='object') throw TypeError(`${images} is not an array`)
        if (!images.length) throw Error('images cannot be empty')
        images.forEach(image =>{
            if(typeof image !=='string') throw TypeError('image must be a string')
        })
        if(typeof gameFile !=='string') throw TypeError(`${gameFile} is not a string`)
        if (!gameFile.trim().length) throw Error('gameFile cannot be empty')

        return freendiesApi.uploadGame(title, genre, description, images, gameFile)
    }
}

export default logic