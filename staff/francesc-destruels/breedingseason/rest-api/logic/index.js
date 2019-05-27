const { LogicError } = require('../common/errors')
const { ObjectId } = require('mongodb')
const { User } = require('../data/models')
const ow = require('ow')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const { env: { PLACEHOLDERURL } } = process
const Game = require('./game')

const gamesAlive = []

const logic = {
    registerUser(nickname, age, email, password) {

        ow(nickname, ow.string.not.empty)
        ow(age, ow.number.is(x => x > 13))
        ow(email, ow.string.is(x => re.test(String(x))))
        ow(password, ow.string.not.empty)

        return (async () => {
            const results = await User.findOne({ email })

            if (!results) await User.create({ nickname, age, email, password, avatar: PLACEHOLDERURL })
            else throw new LogicError(`User with ${email} already exist`)
        })()
    },

    authenticateUser(nicknameOEmail, password) {
        ow(nicknameOEmail, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        return (async () => {

            if (re.test(String(x))) {
                const user = await User.findOne({ email: nicknameOEmail, password })
            } else {
                const user = await User.findOne({ nickname: nicknameOEmail, password })
            }

            if (user) {
                const { _id: id } = user
                return id

            } else throw new LogicError(`user with username \"${email}\" does not exist`)
        })()
    },

    retrieveUser(id) {
        ow(id, ow.string.not.empty)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {
                const { nickname, age, email, avatar } = response

                const user = { nickname, age, email, avatar }

                return user
            } else throw new LogicError("No User for that id")

        })()
    },

    retrieveUserGameData(id) {
        ow(id, ow.string.not.empty)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {
                const { gameHistory } = response

                let userGameHistory = []

                if (gameHistory.length) {
                    for (let i = 0; i < gameHistory.length || i < 5; i++) gameHistory.push(gameHistory[i])
                }

                return userGameHistory
            } else throw new LogicError("No User for that id")

        })()
    },

    newGame(id, gameId, style) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)
        ow(style, ow.is.object.exactShape({
            mode: ow.string,
            conditions: {
                players: ow.number,
                private: ow.boolean
            }
        }))

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                const game = new Game(gameId, id, style)

                gamesAlive.push(game)

            } else throw new LogicError("No User for that id")

        })()
    },

    startGame(id, gameId) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                const playing = gamesAlive.find(game => game.id === gameId && game.player.includes(id))

                const initialPackage = await playing.start(id)

                return initialPackage
            } else throw new LogicError("No User for that id")

        })()
    },

    joinGame(id, gameId) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                const playing

                if(gameId) playing = gamesAlive.find(game => game.id === gameId)
                else playing = gamesAlive.find(game => game.players.length < game.maxPlayer.length)

                const confirm = await playing.addPlayer(id)

                return confirm

            } else throw new LogicError("No User for that id")

        })()
    },

    continueGame(id, gameId, update) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)
        // ow(update, ow.is.object.exactShape({
        //     mode: ow.string,
        //     conditions: {
        //         players: ow.number,
        //         private: ow.boolean
        //     }
        // }))

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {


            } else throw new LogicError("No User for that id")

        })()
    },

   update(id, gameId) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

            await logic.update()

            } else throw new LogicError("No User for that id")

        })()
    },

}

module.exports = logic