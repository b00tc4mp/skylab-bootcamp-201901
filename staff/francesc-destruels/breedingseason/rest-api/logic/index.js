const { LogicError } = require('../common/errors')
const { ObjectId } = require('mongodb')
const { alivePrivateGames, alivePublicGames, Game } = require("./game/game")
const ow = require('ow')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const { env: { PLACEHOLDERURL } } = process
const { models: { User, GameRecord } } = require("breedingseason-data")

const logic = {
    registerUser(nickname, age, email, password) { //OK

        ow(nickname, ow.string.not.empty)
        ow(age, ow.number.is(x => x > 13))
        ow(email, ow.string.is(x => re.test(String(x))))
        ow(password, ow.string.not.empty)

        return (async () => {
            const results = await User.findOne({ email })
            const results2 = await User.findOne({ nickname })

            if (!results && !results2) await User.create({ nickname, age, email, password, avatar: `${PLACEHOLDERURL}` })
            else if (results) throw new LogicError(`User with ${email} already exist`)
            else throw new LogicError(`User with ${nickname} already exist`)
        })()
    },

    authenticateUser(nicknameOEmail, password) { //OK
        ow(nicknameOEmail, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        let user = ""

        return (async () => {

            if (re.test(String(nicknameOEmail))) {
                user = await User.findOne({ email: nicknameOEmail, password })
            } else {
                user = await User.findOne({ nickname: nicknameOEmail, password })
            }

            if (user) {
                const { _id: id } = user
                return id
            } else if (re.test(String(nicknameOEmail))) throw new LogicError(`Email and Password do not match`)
            else throw new LogicError(`Nickname and Password do not match`)
        })()
    },

    retrieveUser(id) { //OK
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

            const response = await User.findById(ObjectId(id)).populate('gameHistory', 'players gameId gameHistory date -_id').lean()

            if (response._id.toString() === id) {
                const { gameHistory } = response

                let userGameHistory = []

                if (gameHistory.length > 5) {
                    for (let i = 0; i < 5; i++) userGameHistory.push(gameHistory[i])
                } else return gameHistory

                return userGameHistory
            } else throw new LogicError("No User for that id")

        })()
    },

    newGame(id, gameId, style, privateGame) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)
        ow(style, ow.object.exactShape({
            mode: ow.string,
            playersNumber: ow.number,
        }))
        ow(privateGame, ow.boolean)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                const game = new Game(id, gameId, style)

                if (privateGame) alivePrivateGames.push(game)
                else alivePublicGames.push(game)

                return gameId

            } else throw new LogicError("No User for that id")

        })()
    },

    startGame(id, gameId) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                let playing = alivePrivateGames.find(game => game.id === gameId)

                if (!playing) playing = alivePublicGames.find(game => game.id === gameId)
                else { }

                if (!playing) throw Error('That Game Id is not an active game one')

                const initialPackage = await playing.startFunction(id)

                return initialPackage

            } else throw new LogicError("No User for that id")

        })()
    },

    joinGame(id, gameId) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                if (gameId !== "searching") playing = alivePrivateGames.find(game => game.id === gameId)
                else playing = alivePublicGames.find(game => game.players.length < game.maxPlayer)

                try {
                    let joinId = await playing.addPlayer(id)

                    return joinId
                } catch (err) {
                    return err.message
                }

            } else throw new LogicError("No User for that id")

        })()
    },

    continueGame(id, gameId, choice) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)
        ow(choice, ow.object)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                let playing = alivePrivateGames.find(game => game.id === gameId)

                if (!playing) playing = alivePublicGames.find(game => game.id === gameId)
                else { }

                if (!playing) throw Error('That Game Id is not an active game one')

                const response = await playing.nextFunction(id, choice)

                return response

            } else throw new LogicError("No User for that id")

        })()
    },

    updateGame(id, gameId) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                let playing = alivePrivateGames.find(game => game.id === gameId)

                if (!playing) playing = alivePublicGames.find(game => game.id === gameId)
                else { }

                if (!playing) throw Error('That Game Id is not an active game one')

                const response = await playing.update(id)

                return response

            } else throw new LogicError("No User for that id")

        })()
    },

}

module.exports = logic