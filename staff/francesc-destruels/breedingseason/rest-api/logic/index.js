const { LogicError } = require('../common/errors')
const { ObjectId } = require('mongodb')
const { aliveGames, Game } = require("./game/game")
const ow = require('ow')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const { env: { PLACEHOLDERURL } } = process
const { models: { User, MissionDeck, GameDeck } } = require("breedingseason-data")

const logic = {
    registerUser(nickname, age, email, password) { //OK

        ow(nickname, ow.string.not.empty)
        ow(age, ow.number.is(x => x > 13))
        ow(email, ow.string.is(x => re.test(String(x))))
        ow(password, ow.string.not.empty)

        return (async () => {
            const results = await User.findOne({ email })

            if (!results) await User.create({ nickname, age, email, password, avatar: `${PLACEHOLDERURL}` })
            else throw new LogicError(`User with ${email} already exist`)
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

            } else throw new LogicError(`user with username \"${email}\" does not exist`)
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
        ow(style, ow.object.exactShape({
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

                aliveGames.push(game)

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

                const initialPackage = await playing.startFunction(id)

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

                if (gameId) playing = gamesAlive.find(game => game.id === gameId)
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

    updateGame(id, gameId) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                return await game.update()

            } else throw new LogicError("No User for that id")

        })()
    },

    // async createMissionCartCollection() {
    //     console.log("Await")

    //     const cards = [
    //         { 1: "HAVE:3EGGS:2", 2: "HAVE:2EGGS:3", 3: "HAVE:1EGGS:2", first: 6, second: 3 },
    //         { 1: "USE:TOOLS:4", 2: "HAVE:1SECURITY:2", first: 7, second: 4 },
    //         { 1: "HAVE:4EGGS:2", 2: "HAVE:1EGGS:3", 3: "HAVE:2EGGS:2", first: 6, second: 4 },
    //         { 1: "HAVE:1EGGS:2", 2: "HAVE:3EGGS:1", 3: "HAVE:2EGGS:3", first: 8, second: 5 },
    //         { 1: "HAVE:2SECURITY:3", 2: "USE:TOOLS:3", first: 4, second: 2 },

    //         { 1: "HAVE:2SECURITY:3", 2: "USE:TOOLS:3", first: 7, second: 4 },
    //         { 1: "HAVE:2EGGS:4", 2: "HAVE:4EGGS:3", first: 6, second: 3 },
    //         { 1: "HAVE:3EGGS:2", 2: "HAVE:2EGGS:1", 3: "HAVE:1EGGS:4", first: 7, second: 4 },
    //         { 1: "HAVE:3SECURITY:4", 2: "USE:TOOLS:4", first: 5, second: 3 },
    //         { 1: "HAVE:3EGGS:1", 2: "HAVE:2EGGS:5", first: 8, second: 5 },

    //         { 1: "HAVE:4SECURITY:4", 2: "USE:TOOLS:3", first: 5, second: 2 },
    //         { 1: "HAVE:3EGGS:2", 2: "HAVE:2EGGS:3", 3: "HAVE:1EGGS:2", first: 4, second: 3 },
    //         { 1: "HAVE:4EGGS:1", 2: "HAVE:2EGGS:2", first: 7, second: 5 },
    //         { 1: "HAVE:3EGGS:2", 2: "HAVE:1EGGS:2", first: 5, second: 3 },
    //         { 1: "HAVE:4EGGS:1", 2: "HAVE:2EGGS:2", first: 8, second: 4 }
    //     ]

    //     for(let i = 0; i < cards.length; i++ ) await MissionDeck.create(cards[i])
    // }

    // async createPenguinCartCollection() {
    //     console.log("Await")

    //     const cards = [
    //         // { A: 1, B: "fishing" },
    //         // { A: 2, B: "fishing" },
    //         // { A: 3, B: "fishing" },
    //         // { A: 4, B: "fishing" },
    //         // { A: 5, B: "fishing" },
    //         // { A: 6, B: "fishing" },
    //         // { A: 7, B: "fishing" },

    //         // { A: 1, B: "love" },
    //         // { A: 2, B: "love" },
    //         // { A: 3, B: "love" },
    //         // { A: 4, B: "love" },
    //         // { A: 5, B: "love" },
    //         // { A: 6, B: "love" },
    //         // { A: 7, B: "love" },

    //         // { A: 1, B: "love" },
    //         // { A: 2, B: "love" },
    //         // { A: 3, B: "love" },
    //         // { A: 4, B: "love" },
    //         // { A: 5, B: "love" },
    //         // { A: 6, B: "love" },
    //         // { A: 7, B: "love" },

    //         // { A: 1, B: "security" },
    //         // { A: 2, B: "security" },
    //         // { A: 3, B: "security" },
    //         // { A: 4, B: "security" },
    //         // { A: 5, B: "security" },
    //         // { A: 6, B: "security" },
    //         // { A: 7, B: "security" },

    //         // { A: 1, B: "glue" },
    //         // { A: 2, B: "glue" },
    //         // { A: 3, B: "glue" },
    //         // { A: 4, B: "pick" },
    //         // { A: 5, B: "pick" },
    //         // { A: 6, B: "pick" },
    //         // { A: 7, B: "pick" },
            
    //         // { A: 1, B: "upgrade" },
    //         // { A: 2, B: "upgrade" },
    //         // { A: 3, B: "upgrade" },
    //         // { A: 4, B: "upgrade" },
    //         // { A: 5, B: "upgrade" },
    //         // { A: 6, B: "upgrade" },
    //         // { A: 7, B: "upgrade" },

    //         { A: 1, B: "security" },
    //         { A: 2, B: "pick" },
    //         { A: 3, B: "love" },
    //         { A: 4, B: "pick" },
    //         { A: 5, B: "glue" },
    //         { A: 6, B: "security" },
    //         { A: 7, B: "upgrade"},

    //         { A: 1, B: "pick" },
    //         { A: 2, B: "security" },
    //         { A: 3, B: "pick" },
    //         { A: 4, B: "love" },
    //         { A: 5, B: "pick" },
    //         { A: 6, B: "upgrade" },
    //         { A: 7, B: "glue"},
    //     ]

    //     for (let i = 0; i < cards.length; i++) await GameDeck.create(cards[i])
    // }

}

module.exports = logic