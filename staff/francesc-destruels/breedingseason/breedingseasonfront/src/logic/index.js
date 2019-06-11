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

    set __ActualGame__(gameId) {
        sessionStorage.userActualGame = gameId
    },

    get __ActualGame__() {
        return normalize.undefinedOrNull(sessionStorage.userActualGame)
    },

    get isUserLoggedIn() {
        return !!(this.__userToken__)
    },

    async registerUser(nickname, age, email, password) {
        try { ow(nickname, ow.string.not.empty) } catch (err) { throw Error("Nickname can not be empty") }
        try { ow(age, ow.number.is(x => x > 13)) } catch (err) { throw Error("You have to be older than 13") }
        try { ow(password, ow.string.not.empty) } catch (err) { throw Error("Password can't be empty") }
        try { ow(email, ow.string.is(x => re.test(String(x))).not.empty) } catch (err) { throw Error("That is not a proper e-mail") }

        const { error, message } = await restApi.create(nickname, age, email, password)

        if (error) {
            throw new LogicError(error)
        }
    },

    loginUser(nicknameOEmail, password) {
        try { ow(nicknameOEmail, ow.string.not.empty) } catch (err) { throw Error("Nickname or Email required") }
        try { ow(password, ow.string.not.empty) } catch (err) { throw Error("Password can not be empty") }

        return (async () => {
            const { error, token } = await restApi.authenticate(nicknameOEmail, password)

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

    //gameLogic

    async newGame(style, privateGame) {

        const { gameId } = await restApi.newGame(this.__userToken__, style, privateGame)

        if (gameId) {

            this.__ActualGame__ = gameId
            return

        } else throw new LogicError("Bad Way")
    },

    // async joinGame(gameId) {
    //     const response = await restApi.joinGame(this.__userToken__, gameId ? gameId : "searching")

    //     if (response.status === 200) {
    //         response.json()

    //         this.__ActualGame__ = response

    //     } else throw new LogicError("Bad Way")
    // },


    async startGame() {
        const initialGameData = await restApi.startGame(this.__userToken__, this.__ActualGame__)

        const { player } = initialGameData

        if (player) {
            const { mapStatus, missionCards, round, turnCards, userPuntuation } = initialGameData

            return { mapStatus, missionCards, round, turnCards, userPuntuation }

        } else throw new LogicError("Bad Way")
    },

    // async updateGame() {
    //     const response = await restApi.updateGame(this.__userToken__, this.__ActualGame__)

    //     if (response.status === 200) {
    //         response.json()

    //         if (typeof response === Object) return response // if length finishedGame()

    //     } else throw new LogicError("Bad Way")
    // },

    async nextGame(gamePlay, updatedAmount) {
        ow(gamePlay, ow.object)
        ow(updatedAmount, ow.object)

        const response = await restApi.gameAction(this.__userToken__, this.__ActualGame__, gamePlay, updatedAmount)

        if (!response.error) {

            if (response.turnCards) return { ...response, continue: true }
            else return response

        } else throw new LogicError("Not response from the server")

    },

    __updatedValues__(Map) {
        ow(Map, ow.object)

        let One = 0, Two = 0, Three = 0, Four = 0

        for (let j = 1; j <= 3; j++) {
            for (let i = 0; i < Map[j].length; i++) {
                switch (Map[j][i][0]) {
                    case 0:
                        break
                    case 1:
                        One++
                        break
                    case 2:
                        Two++
                        break
                    case 3:
                        Three++
                        break
                    case 4:
                        Four++
                        break
                    default:
                        break
                }
            }
        }

        return { One, Two, Three, Four }
    },


    __isBreedable__(map, position, rocks) {
        ow(map, ow.object)
        ow(position, ow.object)
        ow(rocks, ow.number)

        const toCheck = map[position[0]][position[1]][1]

        if (toCheck !== 0 || !rocks) return false

        let can = true

        for (let i = 0; i < map[position[0]].length; i++) {
            if (i < position[1] && map[position[0]][i][1] >= rocks) can = false
            else if (i > position[1] && (map[position[0]][i][1] <= rocks && map[position[0]][i][1] !== 0)) can = false
        }

        return can
    },

    __isUsable__(map, position, resource) {
        ow(map, ow.object)
        ow(position, ow.object)
        ow(resource, ow.string)

        const toCheck = map[position[0]][position[1]]
        const toCompare = map[position[0]][position[1]][1]

        if (toCheck[0] !== 0) {
            let can = true

            switch (resource) {
                case "love":
                    return ((toCheck[0] < 4) && (toCheck[2] === false)) ? true : false

                case "glue":

                    if (toCompare === 1 || toCompare === 0) return false
                    else {

                        for (let i = 0; i < map[position[0]].length; i++) {
                            if (i < position[1] && map[position[0]][i][1] === toCompare - 1) return false
                            else if (i >= position[1]) break
                            else continue
                        }

                        return can
                    }

                case "pick":

                    for (let i = 0; i < map[position[0]].length; i++) {
                        if (i > position[1] && map[position[0]][i][1] === toCompare + 1) return false
                        else continue
                    }
                    return can

                default:
                    return false
            }
        } else return false

    },

    __isCompleted__(map, puntuation, mission) {
        ow(map, ow.object)
        ow(puntuation, ow.object)
        ow(mission, ow.object)

        let ohNo = { toComplete: false }
        let toHatch = []

        switch (mission[0][0]) {
            case "tools":
                if (puntuation.ToolsUsed >= mission[0][1]) return { toComplete: true, type: "tools" }
                else return ohNo
            case "Security[1]":
                if (puntuation.SecurityLvL[1] >= mission[0][1]) return { toComplete: true, type: "security" }
                else return ohNo
            case "Security[2]":
                if (puntuation.SecurityLvL[2] >= mission[0][1]) return { toComplete: true, type: "security" }
                else return ohNo
            case "Security[3]":
                if (puntuation.SecurityLvL[3] >= mission[0][1]) return { toComplete: true, type: "security" }
                else return ohNo

            case "1EGG":
                if (puntuation.OneEggNestAmount >= mission[0][1]) {
                    for (let j = 1; j <= 3 && toHatch.length < mission[0][1]; j++) {
                        for (let i = 0; i < map[j].length && toHatch.length < mission[0][1]; i++) {
                            if (map[j][i][0] === 1 && map[j][i][2] === false) {
                                toHatch.push({ row: j, column: i })
                            }
                        }
                    }
                    if (toHatch.length === mission[0][1]) return { toComplete: true, toHatch, type: "love" }
                    else return ohNo

                } else return ohNo

            case "2EGG":
                if (puntuation.TwoEggNestAmount >= mission[0][1]) {
                    for (let j = 1; j <= 3 && toHatch.length < mission[0][1]; j++) {
                        for (let i = 0; i < map[j].length && toHatch.length < mission[0][1]; i++) {
                            if (map[j][i][0] === 2 && map[j][i][2] === false) {
                                toHatch.push({ row: j, column: i })
                            }
                        }
                    }
                    if (toHatch.length === mission[0][1]) return { toComplete: true, toHatch, type: "love" }
                    else return ohNo

                } else return ohNo

            case "3EGG":
                if (puntuation.ThreeEggNestAmount >= mission[0][1]) {
                    for (let j = 1; j <= 3 && toHatch.length < mission[0][1]; j++) {
                        for (let i = 0; i < map[j].length && toHatch.length < mission[0][1]; i++) {
                            if (map[j][i][0] === 3 && map[j][i][2] === false) {
                                toHatch.push({ row: j, column: i })
                            }
                        }
                    }
                    if (toHatch.length === mission[0][1]) return { toComplete: true, toHatch, type: "love" }
                    else return ohNo

                } else return ohNo

            case "4EGG":
                if (puntuation.FourEggNestAmount >= mission[0][1]) {
                    for (let j = 1; j <= 3 && toHatch.length < mission[0][1]; j++) {
                        for (let i = 0; i < map[j].length && toHatch.length < mission[0][1]; i++) {
                            if (map[j][i][0] === 4) {
                                toHatch.push({ row: j, column: i })
                            }
                        }
                    }
                    if (toHatch.length === mission[0][1]) return { toComplete: true, toHatch, type: "love" }
                    else return ohNo

                } else return ohNo
        }
    },

    __isSecurityAvailable__(number, toCompare, maximum) {
        ow(toCompare, ow.object)
        ow(number, ow.number)
        ow(maximum, ow.object)

        return toCompare[number] < maximum[number].length - 1 ? true : false
    },

    __isUpgradeAvailable__(toCompare, maximum) {
        ow(toCompare, ow.number)
        ow(maximum, ow.object)

        return toCompare < maximum.length - 1 ? true : false

    },

    finishedGame() { // hacer a con la data para poder pintarlo :D

        localStorage.removeItem("userActualGame")
    },

    logoutUser() {
        sessionStorage.clear()
    },

}

export default logic