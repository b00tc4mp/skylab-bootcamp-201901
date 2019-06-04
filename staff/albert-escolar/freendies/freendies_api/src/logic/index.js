'use strict'

const { User, Game, mongoose, ObjectId } = require('freendies_data')
const bcrypt = require('bcrypt')


var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountkey/index.json");


const streamifier = require('streamifier')


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "freendies.appspot.com"
})

const logic = {

    async registerUser(username, email, password, passwordConfirmation) {

        if (typeof username !== 'string') throw TypeError(`username is not a string`)

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(`email is not a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`password is not a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(`passwordConfirm is not a string`)

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')


        let user = await User.findOne({ email })

        if (user) throw Error(`user with email ${email} already exists`)

        user = await User.findOne({ username })

        if (user) throw Error(`user with username ${username} already exists`)

        const hash = await bcrypt.hash(password, 10)

        const newUser = await User.create({ username, email, password: hash })

        return newUser.id
    },

    async authenticateUser(email, password) {

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error(`${email} cannot be empty`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw TypeError(`${password} is not a string`)


        let user = await User.findOne({ email })
        if (!user) throw Error(`User with ${email} does not exist`)

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw Error('wrong password')

        return user.id

    },


    async retrieveUser(userId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error(`${userId} cannot be empty`)

        const user = await User.findById(userId).select('-password -__v').lean()
        if (!user) throw Error(`user with Id:${userId} not found`)

        user.id = user._id.toString()

        delete user._id

        return user
    },


    async updateUser(userId, data) {
        if (typeof userId !== 'string') throw TypeError(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId cannot be empty`)
        if (typeof data !== 'string') throw TypeError('data is not a string')
        if (!data.trim().length) throw Error('data cannot be empty')

        const user = await User.findByIdAndUpdate(userId, data, { runValidators: true, new: true }).select('-password -__v').lean()

        if (!user) throw Error(`user with id ${userId} was not found`)

        user.id = user._id.toString()

        delete user._id

        return user
    },


    async uploadGame(ownerId, title, genre, description, images, gameFile) {
        if (typeof ownerId !== 'string') throw TypeError(`${ownerId} is not a string`)
        if (!ownerId.trim().length) throw Error(`${ownerId} cannot be empty`)
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw Error(`${title} cannot be empty`)
        if (typeof genre !== 'string') throw TypeError(`${genre} is not a string`)
        if (!genre.trim().length) throw Error(`${genre}cannot be empty`)
        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error(`${description} cannot be empty`)
        // if (typeof images !== 'string') throw TypeError(`${images} is not a string`)
        // if (!images.trim().length) throw Error(`${images} cannot be empty`)
        // if (typeof gameFile !== 'string') throw TypeError(`${gameFile} is not a string`)
        // if (!gameFile.trim().length) throw Error(`${gameFile} cannot be empty`)


        const ownerUser = await User.findById(ownerId)

        const bucket = admin.storage().bucket()

        const imageTitle = `image-${title}-${Date.now()}`
        const gameTitle = `game-${title}-${Date.now()}`

        const gameUpload = await bucket.file(gameTitle)

        const imageUpload = await bucket.file(imageTitle)

        const gameBlobStream = gameUpload.createWriteStream({
            metadata: {
                contentType: 'image/jpeg'
            }
        })

        const imageBlobStream = imageUpload.createWriteStream({
            metadata: {
                contentType: 'image/jpeg'
            }
        })

        await streamifier.createReadStream(gameFile.buffer).pipe(gameBlobStream)

        let game = await bucket.file(gameTitle)
        let gameFileUploaded = await game.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        })

        await streamifier.createReadStream(images.buffer).pipe(imageBlobStream)

        let img = await bucket.file(imageTitle)
        let imageFileUploaded = await img.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        })

        const newGame = await Game.create({ ownerId, title, genre, description, images: imageFileUploaded[0], gameFile: gameFileUploaded[0] })

        ownerUser.uploads.push(newGame.id)

        ownerUser.save()

        return newGame
    },


    async retrieveGameByQuery(genre, query) {
        if (typeof genre !== 'string') throw TypeError('genre is not a string')
        if (!genre.trim().length) throw Error('genre cannot be empty')
        if (typeof query !== 'string') throw TypeError('query is not a string')
        if (!query.trim().length) throw Error('genre cannot be empty')

        if (genre == 'any') {
            return Game.find({ "title": { "$regex": query, "$options": "i" } }).select('-__v').lean()
                .then(games => {
                    games.forEach(game => {
                        game.id = game._id.toString()
                        delete game._id
                    })
                    return games

                })
        } else {
            return Game.find({ $and: [{ "title": { "$regex": query, "$options": "i" } }, { "genre": genre }] }).select('-__v').lean()
                .then(games => {
                    games.forEach(game => {
                        game.id = game._id.toString()
                        delete game._id
                    })
                    return games
                })
        }

    },

    async retrieveGameByGenre(genre) {
        if (typeof genre !== 'string') throw TypeError('genre is not a string')
        if (!genre.trim().length) throw Error('genre cannot be empty')

        const games = await Game.find({ "genre": genre }).select('-__V').lean()
        games.forEach(game => {
            game.id = game._id.toString()
            delete game._id
        })
        return games

    },

    async retrieveGameById(id) {
        if (typeof id !== 'string') throw TypeError('id is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        const game = await Game.findById(id).select('-__v').lean()
        game.id = game._id.toString()
        delete game._id
        return game
    }


}



module.exports = logic