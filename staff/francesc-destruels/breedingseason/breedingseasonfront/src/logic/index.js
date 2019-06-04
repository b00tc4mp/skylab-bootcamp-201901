import normalize from '../common/normalize'
import restApi from '../data/rest-api'
const { LogicError } = require('../common/errors')
const ow = require('ow')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const logic = {

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    // set __ActualGame__(gameId) {
    //     sessionStorage.userActualGame = gameId
    // },

    // get __ActualGame__() {
    //     return normalize.undefinedOrNull(sessionStorage.userActualGame)
    // },

    get isUserLoggedIn() {
        return !!(this.__userToken__)
    },

    async registerUser(nickname, age, email, password) {
        ow(nickname, ow.string.not.empty)
        ow(age, ow.number.is(x => x > 13))
        ow(password, ow.string.not.empty)
        ow(email, ow.string.is(x => re.test(String(x))))

        const {error, message} = await restApi.create(nickname, age, email, password)

        if (error) {
            throw new LogicError(error)
        }
    },

    loginUser(nicknameOEmail, password) {
        ow(nicknameOEmail, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        return (async () => {
            const {error, token} = await restApi.authenticate(nicknameOEmail, password)

            if (error) throw new LogicError(error)

            this.__userToken__ = token

        })()
    },

    async retrieveUser() {
        const { error, nickname, age, email, avatar } = await restApi.retrieveUser(this.__userToken__)

        if (!error) {

            return { nickname, age, email, avatar }

        } else throw new LogicError("Bad Way")
    },

    async retrieveUserGameHistory() {
        const response = await restApi.retrieveUserGameHistory(this.__userToken__)

        if (response.ok) {
            const gameData = await response.json()
            return gameData

        } else throw new LogicError("Bad Way")
    },

    // //gameLogic

    // async newGame(style, privateGame) {
    //     const response = await restApi.newGame(this.__userToken__, style, privateGame)

    //     if (response.status === 200) {
    //         response.json()

    //         this.__ActualGame__ = response

    //     } else throw new LogicError("Bad Way")
    // },

    // async joinGame(gameId) {
    //     const response = await restApi.joinGame(this.__userToken__, gameId ? gameId : "searching")

    //     if (response.status === 200) {
    //         response.json()

    //         this.__ActualGame__ = response

    //     } else throw new LogicError("Bad Way")
    // },


    // async startGame() {
    //     const response = await restApi.startGame(this.__userToken__, this.__ActualGame__)

    //     if (response.status === 200) {
    //         response.json()

    //         if (typeof response === Object) return response

    //     } else throw new LogicError("Bad Way")
    // },

    // async updateGame() {
    //     const response = await restApi.updateGame(this.__userToken__, this.__ActualGame__)

    //     if (response.status === 200) {
    //         response.json()

    //         if (typeof response === Object) return response // if length finishedGame()

    //     } else throw new LogicError("Bad Way")
    // },

    // async nextGame(gamePlay) {
    //     ow(gamePlay, ow.object)

    //     const response = await restApi.gameAction(this.__userToken__, this.__ActualGame__, gamePlay)

    //     if (response.status === 200) {
    //         response.json()

    //         if (response.length) return //logic.finishedGame(response)// if length finishedGame()
    //         else return response

    //     } else throw new LogicError("Bad Way")
    // },

    // finishedGame(finishedGameData) { // hacer a con la data para poder pintarlo :D

    //     localStorage.removeItem("userActualGame")

    //     return
    // },

    logoutUser() {
        sessionStorage.clear()
    },

}

export default logic