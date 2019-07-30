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


    /**
     * Creates a User and encrypts the password before storing the User in DB
     * @param {String} username the name of the user to be stored in the DB
     * @param {String} email the email of the user to be stored in the DB
     * @param {String} password the password of the user to be stored in the DB
     * @param {String} passwordConfirmation the password confirmation to check that the password matches the confirmation
     */
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

    /**
     * Authenticates the user if the email and password match the information stored in the DB
     * @param {String} email the email received to check and do the authentication
     * @param {String} password the password received to check and the authentication
     */
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

    /**
     * Retrieves the user information on correct ID
     * @param {String} userId the User ID to retrieve the user info
     */
    async retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error(`${userId} cannot be empty`)

        const user = await User.findById(userId).select('-password -__v').lean()
        if (!user) throw Error(`user with Id:${userId} not found`)

        user.id = user._id.toString()

        delete user._id

        return user
    },


    /**
     * Updates the user information 
     * @param {String} userId the userId to find the User which information has been changed
     * @param {String} data the data to be changed about User in the DB
     */
    async updateUser(userId, data) {
        if (typeof userId !== 'string') throw TypeError(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId cannot be empty`)

        const user = await User.findByIdAndUpdate(userId, data, { runValidators: true, new: true }).select('-password -__v').lean()

        if (!user) throw Error(`user with id ${userId} was not found`)

        user.id = user._id.toString()

        delete user._id

        return user
    },

    /**
     * Uploads the gameFile and images to firebase.
     * Once is has been uploaded it saves the information and the gameFile and images firebase url's to the DB
     * 
     * @param {String} ownerId Id of the User who is uploading the game to be stored in the DB
     * @param {String} title Title of the game being uploaded to be stored in the DB
     * @param {String} genre Genre of the game being uploaded to be stored in the DB
     * @param {String} description Description of the game being uploaded to be stored in the DB
     * @param {String} images Images URL's of the game being uploaded to be stored in the DB
     * @param {String} gameFile File URL of the game being uploaded to be stored in the DB
     */
    async uploadGame(ownerId, title, genre, description, images, gameFile) {
        if (typeof ownerId !== 'string') throw TypeError(`${ownerId} is not a string`)
        if (!ownerId.trim().length) throw Error(`${ownerId} cannot be empty`)
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw Error(`${title} cannot be empty`)
        if (typeof genre !== 'string') throw TypeError(`${genre} is not a string`)
        if (!genre.trim().length) throw Error(`${genre}cannot be empty`)
        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error(`${description} cannot be empty`)


        const ownerUser = await User.findById(ownerId) //Retrieves the User who is uploading the game

        const bucket = admin.storage().bucket() //Sets the storage to upload the files

        const imageTitle = `image-${title}-${Date.now()}` //adds the title of the game and a date to the name of the file
        const gameTitle = `game-${title}-${Date.now()}`

        const gameUpload = await bucket.file(gameTitle) //File name to upload

        const imageUpload = await bucket.file(imageTitle)

        const gameBlobStream = gameUpload.createWriteStream({  //Sets headers for each file so firebase know how to process them
            metadata: {
                contentType: 'application/zip'
            }
        })

        const imageBlobStream = imageUpload.createWriteStream({
            metadata: {
                contentType: 'image/jpeg'
            }
        })

        //Uploads the files and once uploaded looks for the files in firebase and returns its urls
        await streamifier.createReadStream(gameFile.buffer).pipe(gameBlobStream)
        let game = await bucket.file(gameTitle)
        //Makes urls readable so app and users can acces it to see images and download a game
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

        //Creates a game with the game info and the urls of the uploaded files
        const newGame = await Game.create({ ownerId, title, genre, description, images: imageFileUploaded[0], gameFile: gameFileUploaded[0] })

        //Adds the user Id that created the game as ownerId of the game
        ownerUser.uploads.push(newGame.id)

        ownerUser.save()
        //returns the uploaded game info
        return newGame
    },

    /**
     * Retrieves a game by title.
     * Genre can be used to focus the search for the title on specific genres
     * If genre is "any"then it searches for the title in all genres.
     * @param {String} genre Genre used to search for the game
     * @param {String} query Title of the game used to search for the game
     */
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

    /**
     * Retrieves all games whith a specific genre
     * @param {String} genre used to search for the games that match the genre
     */
    async retrieveGameByGenre(genre) {
        if (typeof genre !== 'string') throw TypeError('genre is not a string')
        if (!genre.trim().length) throw Error('genre cannot be empty')

        if (genre == 'any') {
            const games = await Game.find().select('-__v').lean()
            games.forEach(game => {
                game.id = game._id.toString()
                delete game._id
            })
            return games
        } else {

            const games = await Game.find({ "genre": genre }).select('-__v').lean()
            games.forEach(game => {
                game.id = game._id.toString()
                delete game._id
            })
            return games
        }

    },

    /**
     * Retrieves a specific game and returns all its information
     * @param {String} id used to search for the specific game.
     */
    async retrieveGameById(id) {
        if (typeof id !== 'string') throw TypeError('id is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        const game = await Game.findById(id).select('-__v').lean()
        game.id = game._id.toString()
        delete game._id
        return game
    },

    /**
     * Adds or removes the game from the user favoriteGames list.
     * @param {String} userId used to  find the User to add or remove the id of the game.
     * @param {String} id is added or removed of the User favoriteGames list.
     */
    async toggleFavs(userId, id) {
        if (typeof userId !== 'string') throw TypeError('userId is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')
        if (typeof id !== 'string') throw TypeError('id is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        const user = await User.findById(userId)
        let index = user.favoriteGames.indexOf(id)
        if (index < 0) user.favoriteGames.push(id)
        else user.favoriteGames.splice(index, 1)

        await user.save()
    },

    /**
     * Retrieves the favoriteGames list of the User
     * 
     * @param {String} userId used to look for the User
     */
    async retrieveFavs(userId) {
        if (typeof userId !== 'string') throw TypeError('userId is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        const { favoriteGames } = await User.findById(userId).populate({
            path: 'favoriteGames',
            select: '-__v'
        }).lean()

        favoriteGames.forEach(favorite => {
            favorite.id = favorite._id.toString()
            delete favorite._id
        })

        return favoriteGames

    },

    /**
     * Retrieves the uploads list of the User
     * 
     * @param {String} userId used to search for the User
     */
    async retrieveUploads(userId) {
        if (typeof userId !== 'string') throw TypeError('userId is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        const { uploads } = await User.findById(userId).populate({
            path: 'uploads',
            select: '-__v'
        }).lean()

        uploads.forEach(upload => {
            upload.id = upload._id.toString()
            delete upload._id
        })
        return uploads
    },

    /**
     * Retrieves all games found in the DB
     */
    async retrieveAllGames() {
        const games = await Game.find().select('-__v').lean()
        games.forEach(game => {
            game.id = game._id.toString()
            delete game._id
        })
        return games
    }

}



module.exports = logic