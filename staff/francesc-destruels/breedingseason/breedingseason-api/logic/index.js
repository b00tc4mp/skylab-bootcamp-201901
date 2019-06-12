const { LogicError } = require('../common/errors')
const { ObjectId } = require('mongodb')
const { alivePrivateGames, alivePublicGames, Game } = require("./game/game")
const ow = require('ow')
const bcrypt = require('bcrypt')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const { env: { PLACEHOLDERURL } } = process
const { models: { User, GameRecord } } = require("breedingseason-data")

const logic = {

    /**
     * It registers the user on the database
     * 
     * @param {String} nickname 
     * @param {Number} age 
     * @param {String} email 
     * @param {Hash} password 
     * 
     */

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

    /**
     * Checks the user and it's password on the data base
     * 
     * @param {String} nicknameOEmail 
     * @param {String} password 
     * 
     * @returns {String} returns the user ID to create the token
     */
    authenticateUser(nicknameOEmail, password) { //OK
        ow(nicknameOEmail, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        return (async () => {
            let user = ""

            if (re.test(String(nicknameOEmail))) {
                user = await User.findOne({ email: nicknameOEmail })

                if (user && bcrypt.compare(password, user.password)) {
                    const { _id: id } = user
                    return id
                } else throw new LogicError(`Email and Password do not match`)

            } else {
                user = await User.findOne({ nickname: nicknameOEmail })

                if (user && bcrypt.compare(password, user.password)) {
                    const { _id: id } = user
                    return id
                } else throw new LogicError(`Nickname and Password do not match`)
            }
        })()
    },

    /**
     * Uses the user id to look on the db for the user
     * 
     * @param {String} id 
     * 
     * @returns {Object} Users nickname, age, email and avatar
     */
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

    /**
     * Uses the user id to find it on the db and bring back the user game historic
     * 
     * @param {String} id 
     * 
     * @returns {Object} 5 user game records
     */
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

    /**
     * To create an instance of the game
     * 
     * @param {String} id  creatorId That will have the control over the instance on multiplayer games
     * @param {String} gameId gameId Id for the game instance
     * @param {Object} style with the information required to start the game: mode == Solo or Multiplayer, playersNumber: the number of allowed participants.
     * @param {Boolean} privateGame volean to know if the game is private or not
     */
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


    /**
    * This function will be call once everybody is start === true
    * 
    * @param {String} id
    * @param {String} playerId `
    * 
    * @returns {Object} initial package with all the games needs to start on the server side 
    */
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

    /**
    * This method starts the game when all player are ok with it
    * 
    * @param {String} playerId Id`
    * @param {String} gameId The id of the game to join
    * 
    * @returns For One player function __sendInitialPackage, for Multiplayer depens if everybody is ready
    * 
    */

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

    /**
    * This method will actualice the user puntuation and sends the next round when all player are ok whit it
    * 
    * @param {String} playerId `
    * @param {String} gameId The find it
    * @param {Object} with the actions of the turn
    * @param {Object} with data from the game map
    * 
    * @returns for ONE player the function __sendNextRound__ if not finished and for multiplayer depends on the state of the group
    * 
    */

    continueGame(id, gameId, choice, updatedAmount) {
        ow(id, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)
        ow(choice, ow.object)
        ow(updatedAmount, ow.object)

        return (async () => {

            const response = await User.findById(ObjectId(id))

            if (response._id.toString() === id) {

                let playing = alivePrivateGames.find(game => game.id === gameId)

                if (!playing) playing = alivePublicGames.find(game => game.id === gameId)
                else { }

                if (!playing) throw Error('That Game Id is not an active game one')

                const response = await playing.nextFunction(id, choice, updatedAmount)

                return response

            } else throw new LogicError("No User for that id")

        })()
    },

    /**
    * This function looks for status updates 
    * 
    * @param {String} playerId `
    * @param {String} gameId The find it
    * 
    * @returns for Multiplayer Only depending on the state the next action to do
    * 
    */

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